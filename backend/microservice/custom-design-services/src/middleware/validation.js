import { sendError } from "../utils/helpers.js";

/**
 * Validates the body of a "create custom design" request.
 * Works whether the payload arrives already in the nested schema
 * shape, or in the flatter shape the current frontend sends
 * (mapFrontendPayloadToSchema runs before this in the controller,
 * so by the time it matters we just check the raw required fields
 * are present in one form or another).
 */
export const validateCustomDesign = (req, res, next) => {
  const body = req.body || {};

  const customer = body.customer || {};
  const fullName = customer.fullName || customer.name;
  const email = customer.email;
  const phone = customer.phone;

  const jewelleryType = body.jewellery?.type || body.jewellery;
  const material = body.jewellery?.material || body.material;
  const purity = body.jewellery?.purity || body.purity;
  const budgetMax = body.budget?.max ?? body.budget;

  const errors = [];

  if (!fullName) errors.push("customer full name is required");
  if (!email) errors.push("customer email is required");
  if (!phone) errors.push("customer phone is required");
  if (!jewelleryType) errors.push("jewellery type is required");
  if (!material) errors.push("jewellery material is required");
  if (!purity) errors.push("jewellery purity is required");
  if (budgetMax === undefined || budgetMax === null || budgetMax === "") {
    errors.push("budget is required");
  }

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("customer email is invalid");
  }

  if (errors.length > 0) {
    return sendError(res, 400, `Validation failed: ${errors.join(", ")}`);
  }

  next();
};

export const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return sendError(res, 400, "Invalid design id");
  }
  next();
};
