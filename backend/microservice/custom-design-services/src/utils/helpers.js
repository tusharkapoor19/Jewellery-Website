import crypto from "crypto";
import { MATERIAL_LABELS, JEWELLERY_LABELS, GEMSTONE_LABELS, CUSTOM_ORDER_ID_PREFIX, CUSTOM_ORDER_ID_PAD_LENGTH } from "./constants.js";

/**
 * The current frontend (src/services/api/designs.ts) posts a fairly flat
 * "SubmittedDesign" object:
 * {
 *   id, createdAt, userId?,
 *   customer: { name, email, phone, city, notes },
 *   jewellery, material, purity, gemstones: [{ id, quantity }], style, budget,
 *   referenceImage, weight,
 *   estimate: { metalCost, makingCharges, gemstoneCost, styleMarkup, gst, total, low, high, breakdown }
 * }
 *
 * (Older clients may still send a single `gemstone` id + `carat` instead of
 * the `gemstones` array — both shapes are supported below.)
 *
 * The MongoDB schema (CustomDesign model) expects a nested shape instead.
 * This helper converts the flat frontend payload into that nested shape.
 * If the request body is already sent in the nested schema shape
 * (customer.fullName, jewellery.type, etc.), it is used as-is.
 *
 * Note: `orderStatus` / `adminNotes` are intentionally NOT read from the
 * incoming body here — this mapper feeds the public, unauthenticated
 * "create" endpoint, and a submitter should never be able to set their own
 * order status or leave themselves an "admin" note. Those fields are only
 * ever changed through the admin-only update routes.
 */
export const mapFrontendPayloadToSchema = (body = {}) => {
  // Already in the nested schema shape -> pass through untouched (still
  // strip orderStatus/adminNotes for the same reason as above).
  if (body.customer?.fullName || body.jewellery?.type) {
    const { orderStatus, adminNotes, ...rest } = body;
    return rest;
  }

  const {
    userId,
    customer = {},
    jewellery,
    material,
    purity,
    gemstones,
    gemstone,
    carat,
    gemstonePurity,
    style,
    budget,
    referenceImage,
    estimate = {},
  } = body;

  // Multi-gemstone shape: [{ id: 'diamond', quantity: 4 }, { id: 'pearl', quantity: 5 }]
  let gemstoneList = [];
  if (Array.isArray(gemstones) && gemstones.length > 0) {
    gemstoneList = gemstones
      .filter((g) => g && g.id && g.id !== "none" && Number(g.quantity) > 0)
      .map((g) => ({
        name: GEMSTONE_LABELS[g.id] || g.id,
        quantity: Number(g.quantity) || 1,
      }));
  } else if (gemstone && gemstone !== "none") {
    // Legacy single-gemstone shape
    gemstoneList = [{ name: GEMSTONE_LABELS[gemstone] || gemstone, quantity: carat || 1 }];
  }

  return {
    userId: userId || undefined,
    customer: {
      fullName: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.city,
    },
    jewellery: {
      type: JEWELLERY_LABELS[jewellery] || jewellery,
      material: MATERIAL_LABELS[material] || material,
      purity: purity || undefined,
      gemstone: gemstoneList,
      gemstonePurity: typeof gemstonePurity === "number" ? gemstonePurity : undefined,
      style: style || undefined,
    },
    budget: {
      min: budget ? Math.round(budget * 0.85) : undefined,
      max: budget || undefined,
      estimatedPrice: estimate.total || undefined,
    },
    design: {
      description: customer.notes || undefined,
      referenceImages: referenceImage ? [referenceImage] : [],
    },
    estimation: {
      makingCharge: estimate.makingCharges || undefined,
      stoneCost: estimate.gemstoneCost || undefined,
      metalCost: estimate.metalCost || undefined,
      totalEstimatedCost: estimate.total || undefined,
    },
  };
};

// Stable pseudo-identifier for a guest (not-logged-in) submitter, derived
// from their email so the same guest always maps to the same userId across
// multiple submissions, without requiring an account. Used as a fallback
// when the client doesn't send a real, logged-in userId.
export const generateGuestUserId = (email = "") => {
  const hash = crypto
    .createHash("sha1")
    .update(String(email).trim().toLowerCase())
    .digest("hex")
    .slice(0, 12);
  return `guest_${hash}`;
};

// Generates the next sequential, human-friendly customOrderId (e.g.
// "CD00001", "CD00002", ...) by looking at the highest one currently
// stored. Takes the CustomDesign model as a parameter (rather than
// importing it directly) to avoid a circular import between
// models/CustomDesign.js and this file.
export const generateCustomOrderId = async (CustomDesignModel) => {
  const idPattern = new RegExp(`^${CUSTOM_ORDER_ID_PREFIX}(\\d+)$`);

  const lastDesign = await CustomDesignModel.findOne({
    customOrderId: idPattern,
  })
    .sort({ customOrderId: -1 })
    .select("customOrderId")
    .lean();

  let nextNumber = 1;
  if (lastDesign?.customOrderId) {
    const match = lastDesign.customOrderId.match(idPattern);
    if (match) nextNumber = parseInt(match[1], 10) + 1;
  }

  return `${CUSTOM_ORDER_ID_PREFIX}${String(nextNumber).padStart(CUSTOM_ORDER_ID_PAD_LENGTH, "0")}`;
};

// Standard success/error response shapes so every controller responds consistently.
export const sendSuccess = (res, statusCode, data, message = "Success") => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res, statusCode, message = "Something went wrong") => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
