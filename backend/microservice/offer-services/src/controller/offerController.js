import Offer from "../models/Offer.js";

const sendSuccess = (res, statusCode, data, message = "Success") => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// @desc    Create a new offer/coupon
// @route   POST /offers
// @access  Private (admin)
export const createOffer = async (req, res, next) => {
  try {
    const { code, description, discountType, discountValue, minCartValue, isActive } =
      req.body;

    if (!code || !description || !discountType || discountValue === undefined) {
      const error = new Error(
        "code, description, discountType and discountValue are required"
      );
      error.statusCode = 400;
      throw error;
    }

    const offer = await Offer.create({
      code: String(code).trim(),
      description: String(description).trim(),
      discountType,
      discountValue: Number(discountValue),
      minCartValue: minCartValue !== undefined ? Number(minCartValue) : 0,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    return sendSuccess(res, 201, offer, "Offer created successfully");
  } catch (error) {
    next(error);
  }
};

// @desc    Get every offer (active + inactive) — used by the admin dashboard
// @route   GET /offers
// @access  Private (admin)
export const getAllOffers = async (req, res, next) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    return sendSuccess(res, 200, offers);
  } catch (error) {
    next(error);
  }
};

// @desc    Get only active offers — used by the storefront (Offers page, Cart)
// @route   GET /offers/active
// @access  Public
export const getActiveOffers = async (req, res, next) => {
  try {
    const offers = await Offer.find({ isActive: true }).sort({ createdAt: -1 });
    return sendSuccess(res, 200, offers);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an offer (any subset of fields, including toggling isActive)
// @route   PATCH /offers/:id
// @access  Private (admin)
export const updateOffer = async (req, res, next) => {
  try {
    const { code, description, discountType, discountValue, minCartValue, isActive } =
      req.body;

    const update = {};
    if (code !== undefined) update.code = String(code).trim();
    if (description !== undefined) update.description = String(description).trim();
    if (discountType !== undefined) update.discountType = discountType;
    if (discountValue !== undefined) update.discountValue = Number(discountValue);
    if (minCartValue !== undefined) update.minCartValue = Number(minCartValue);
    if (isActive !== undefined) update.isActive = Boolean(isActive);

    const offer = await Offer.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!offer) {
      const error = new Error("Offer not found");
      error.statusCode = 404;
      throw error;
    }

    return sendSuccess(res, 200, offer, "Offer updated successfully");
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an offer
// @route   DELETE /offers/:id
// @access  Private (admin)
export const deleteOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);

    if (!offer) {
      const error = new Error("Offer not found");
      error.statusCode = 404;
      throw error;
    }

    return sendSuccess(res, 200, offer, "Offer deleted successfully");
  } catch (error) {
    next(error);
  }
};

// @desc    Validate a coupon code against a cart value — the authoritative
//          check used when a customer clicks "Apply" in the cart, so the
//          discount actually applied always matches what the admin has
//          configured right now (active state, min cart value, amount),
//          even if the client's cached offer list is stale.
// @route   POST /offers/validate
// @access  Public
export const validateOffer = async (req, res, next) => {
  try {
    const { code, cartValue } = req.body;

    if (!code) {
      const error = new Error("Coupon code is required");
      error.statusCode = 400;
      throw error;
    }

    const offer = await Offer.findOne({ code: String(code).trim().toUpperCase() });

    if (!offer || !offer.isActive) {
      const error = new Error("Invalid or expired coupon code");
      error.statusCode = 404;
      throw error;
    }

    const cart = Number(cartValue) || 0;
    if (cart < offer.minCartValue) {
      const error = new Error(
        `Add items worth ₹${offer.minCartValue.toLocaleString("en-IN")} or more to use this coupon`
      );
      error.statusCode = 400;
      throw error;
    }

    return sendSuccess(res, 200, offer, "Coupon applied successfully");
  } catch (error) {
    next(error);
  }
};
