import CustomDesign from "../models/CustomDesign.js";
import { mapFrontendPayloadToSchema, sendSuccess, sendError } from "../utils/helpers.js";

// @desc    Create/store a new custom design submission
// @route   POST /api/designs
// @access  Public
export const createCustomDesign = async (req, res, next) => {
  try {
    const payload = mapFrontendPayloadToSchema(req.body);
    const design = await CustomDesign.create(payload);
    return sendSuccess(res, 201, design, "Design saved successfully");
  } catch (error) {
    next(error);
  }
};

// @desc    Get all custom design submissions (with basic filtering + pagination)
// @route   GET /api/designs?orderStatus=Pending&page=1&limit=20
// @access  Public (lock this down with auth in production)
export const getAllCustomDesigns = async (req, res, next) => {
  try {
    const { orderStatus, paymentStatus, email, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (orderStatus) filter.orderStatus = orderStatus;
    if (paymentStatus) filter["payment.paymentStatus"] = paymentStatus;
    if (email) filter["customer.email"] = email.toLowerCase();

    const skip = (Number(page) - 1) * Number(limit);

    const [designs, total] = await Promise.all([
      CustomDesign.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      CustomDesign.countDocuments(filter),
    ]);

    return sendSuccess(res, 200, {
      designs,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single custom design by id
// @route   GET /api/designs/:id
// @access  Public
export const getCustomDesignById = async (req, res, next) => {
  try {
    const design = await CustomDesign.findById(req.params.id);
    if (!design) return sendError(res, 404, "Design not found");
    return sendSuccess(res, 200, design);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a custom design (e.g. admin edits, estimation updates)
// @route   PUT /api/designs/:id
// @access  Private (admin)
export const updateCustomDesign = async (req, res, next) => {
  try {
    const design = await CustomDesign.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!design) return sendError(res, 404, "Design not found");
    return sendSuccess(res, 200, design, "Design updated successfully");
  } catch (error) {
    next(error);
  }
};

// @desc    Update only the order status of a design
// @route   PATCH /api/designs/:id/status
// @access  Private (admin)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    if (!orderStatus) return sendError(res, 400, "orderStatus is required");

    const design = await CustomDesign.findByIdAndUpdate(
      req.params.id,
      { $set: { orderStatus } },
      { new: true, runValidators: true }
    );
    if (!design) return sendError(res, 404, "Design not found");
    return sendSuccess(res, 200, design, "Order status updated");
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a custom design
// @route   DELETE /api/designs/:id
// @access  Private (admin)
export const deleteCustomDesign = async (req, res, next) => {
  try {
    const design = await CustomDesign.findByIdAndDelete(req.params.id);
    if (!design) return sendError(res, 404, "Design not found");
    return sendSuccess(res, 200, { id: req.params.id }, "Design deleted successfully");
  } catch (error) {
    next(error);
  }
};
