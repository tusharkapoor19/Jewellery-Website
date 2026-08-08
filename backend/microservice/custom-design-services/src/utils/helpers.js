import { MATERIAL_LABELS, JEWELLERY_LABELS } from "./constants.js";

/**
 * The current frontend (src/services/api/designs.ts) posts a fairly flat
 * "SubmittedDesign" object:
 * {
 *   id, createdAt,
 *   customer: { name, email, phone, city, notes },
 *   jewellery, material, purity, gemstone, carat, style, budget,
 *   referenceImage, weight,
 *   estimate: { metalCost, makingCharges, gemstoneCost, styleMarkup, gst, total, low, high, breakdown }
 * }
 *
 * The MongoDB schema (CustomDesign model) expects a nested shape instead.
 * This helper converts the flat frontend payload into that nested shape.
 * If the request body is already sent in the nested schema shape
 * (customer.fullName, jewellery.type, etc.), it is used as-is.
 */
export const mapFrontendPayloadToSchema = (body = {}) => {
  // Already in the nested schema shape -> pass through untouched.
  if (body.customer?.fullName || body.jewellery?.type) {
    return body;
  }

  const {
    customer = {},
    jewellery,
    material,
    purity,
    gemstone,
    carat,
    style,
    budget,
    referenceImage,
    weight,
    estimate = {},
    adminNotes,
    orderStatus,
  } = body;

  return {
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
      gemstone:
        gemstone && gemstone !== "none"
          ? [{ name: gemstone, quantity: carat || 1 }]
          : [],
      weight: weight || undefined,
      style: style || undefined,
    },
    budget: {
      min: budget ? Math.round(budget * 0.85) : undefined,
      max: budget || undefined,
      estimatedPrice: estimate.total || undefined,
    },
    design: {
      description: customer.notes || undefined,
      referenceImages: referenceImage
        ? [{ imageUrl: referenceImage, publicId: undefined }]
        : [],
    },
    estimation: {
      estimatedWeight: weight || undefined,
      makingCharge: estimate.makingCharges || undefined,
      stoneCost: estimate.gemstoneCost || undefined,
      metalCost: estimate.metalCost || undefined,
      totalEstimatedCost: estimate.total || undefined,
    },
    orderStatus: orderStatus || "Pending",
    adminNotes: adminNotes || undefined,
  };
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
