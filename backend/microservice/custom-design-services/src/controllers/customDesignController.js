import CustomDesign from "../models/CustomDesign.js";
import { ORDER_STATUSES, IN_PROGRESS_STATUSES } from "../utils/constants.js";
import {
  mapFrontendPayloadToSchema,
  generateGuestUserId,
  generateCustomOrderId,
  sendSuccess,
  sendError,
  notifyCustomer,
} from "../utils/helpers.js";

// @desc    Create/store a new custom design submission
// @route   POST /custom-design-save
// @access  Public (guest checkout - no login required to submit a request)
export const createCustomDesign = async (req, res, next) => {
  try {
    const payload = mapFrontendPayloadToSchema(req.body);

    // Every request must be tied to a userId. If the submitter is logged
    // in, the frontend sends their real account id; otherwise fall back to
    // a stable, email-derived guest id so the record can still be saved.
    if (!payload.userId) {
      payload.userId = generateGuestUserId(payload.customer?.email);
    }

    // customOrderId is always generated server-side, never trusted from the
    // client, so every submission gets a unique, sequential identifier
    // (e.g. "CD00001") to tell requests apart. Retry a few times in the
    // rare case of a race with another simultaneous submission hitting the
    // unique index.
    let design;
    let attempts = 0;
    while (!design) {
      attempts += 1;
      payload.customOrderId = await generateCustomOrderId(CustomDesign);
      try {
        design = await CustomDesign.create(payload);
      } catch (error) {
        const isDuplicateOrderId =
          error.code === 11000 && error.keyPattern?.customOrderId;
        if (!isDuplicateOrderId || attempts >= 5) throw error;
      }
    }

    return sendSuccess(res, 201, design, "Design saved successfully");
  } catch (error) {
    next(error);
  }
};

// @desc    Upload a reference photo for a custom design request and get
//          back its hosted URL. Mirrors the shape the admin catalogue's
//          product image upload expects (multipart field name "image",
//          JSON response with a `url`), so the same client-side upload
//          function/pattern works for both. Public — a guest browsing the
//          Custom Design flow hasn't logged in yet when they attach a photo.
// @route   POST /custom-design-save/upload-image
// @access  Public
export const uploadDesignReferenceImage = async (req, res) => {
  if (!req.file) {
    return sendError(res, 400, "No image file was uploaded");
  }
  const url = `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`;
  return sendSuccess(res, 201, { url }, "Image uploaded successfully");
};

// @desc    Get custom design submissions (with basic filtering + pagination).
//          Used both by customers (filtered by their own `email`, e.g. the
//          "My Custom Orders" page) and by the admin dashboard's Custom
//          Design tab (unfiltered / filtered by status + free-text search).
// @route   GET /custom-design-save?orderStatus=Pending&email=...&userId=...&search=...&page=1&limit=20
// @access  Public
export const getAllCustomDesigns = async (req, res, next) => {
  try {
    const { orderStatus, paymentStatus, email, userId, search, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (orderStatus) filter.orderStatus = orderStatus;
    if (paymentStatus) filter["payment.paymentStatus"] = paymentStatus;
    if (email) filter["customer.email"] = email.toLowerCase();
    if (userId) filter.userId = userId;

    if (search) {
      const re = new RegExp(search.trim(), "i");
      filter.$or = [
        { "customer.fullName": re },
        { "customer.email": re },
        { "customer.phone": re },
        { customOrderId: re },
      ];
    }

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

// @desc    Summary counts for the admin dashboard's Custom Design tab
// @route   GET /custom-design-save/stats/summary
// @access  Private (admin)
export const getDesignSummary = async (req, res, next) => {
  try {
    const [total, pending, inProgress, completed] = await Promise.all([
      CustomDesign.countDocuments({}),
      CustomDesign.countDocuments({ orderStatus: "Pending" }),
      CustomDesign.countDocuments({ orderStatus: { $in: IN_PROGRESS_STATUSES } }),
      CustomDesign.countDocuments({ orderStatus: "Completed" }),
    ]);

    return sendSuccess(res, 200, { total, pending, inProgress, completed });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single custom design by id
// @route   GET /custom-design-save/:id
// @access  Public (customer looks up their own request by id)
export const getCustomDesignById = async (req, res, next) => {
  try {
    const design = await CustomDesign.findById(req.params.id);
    if (!design) return sendError(res, 404, "Design not found");
    return sendSuccess(res, 200, design);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a custom design (admin edits, e.g. order status + notes)
// @route   PUT /custom-design-save/:id
// @route   PATCH /custom-design-save/:id
// @access  Private (admin)
export const updateCustomDesign = async (req, res, next) => {
  try {
    const allowed = ["orderStatus", "adminNotes", "estimation", "budget", "payment"];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    if (updates.orderStatus && !ORDER_STATUSES.includes(updates.orderStatus)) {
      return sendError(res, 400, "Invalid orderStatus");
    }

    const previousStatus = updates.orderStatus
      ? (await CustomDesign.findById(req.params.id).select("orderStatus"))?.orderStatus
      : undefined;

    const design = await CustomDesign.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!design) return sendError(res, 404, "Design not found");

    // Let the customer know their custom order moved forward (e.g.
    // Pending -> Approved), but only when the status actually changed.
    if (updates.orderStatus && updates.orderStatus !== previousStatus) {
      notifyCustomer(
        design.userId,
        "Custom Design Update",
        `Your custom design order ${design.customOrderId} status has been updated to "${design.orderStatus}".`
      );
    }

    return sendSuccess(res, 200, design, "Design updated successfully");
  } catch (error) {
    next(error);
  }
};

// @desc    Update only the order status of a design
// @route   PATCH /custom-design-save/:id/status
// @access  Private (admin)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    if (!orderStatus) return sendError(res, 400, "orderStatus is required");
    if (!ORDER_STATUSES.includes(orderStatus)) return sendError(res, 400, "Invalid orderStatus");

    const design = await CustomDesign.findByIdAndUpdate(
      req.params.id,
      { $set: { orderStatus } },
      { new: true, runValidators: true }
    );
    if (!design) return sendError(res, 404, "Design not found");

    notifyCustomer(
      design.userId,
      "Custom Design Update",
      `Your custom design order ${design.customOrderId} status has been updated to "${design.orderStatus}".`
    );

    return sendSuccess(res, 200, design, "Order status updated");
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a custom design
// @route   DELETE /custom-design-save/:id
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

// @desc    Get the chat thread for a custom design request
// @route   GET /custom-design-save/:id/messages
// @access  Public (customer views their own thread by design id; admin uses it too)
export const getMessages = async (req, res, next) => {
  try {
    const design = await CustomDesign.findById(req.params.id).select("messages");
    if (!design) return sendError(res, 404, "Design not found");
    return sendSuccess(res, 200, design.messages || []);
  } catch (error) {
    next(error);
  }
};

// @desc    Customer sends a chat message about their custom design request
// @route   POST /custom-design-save/:id/messages
// @access  Public
export const addCustomerMessage = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return sendError(res, 400, "Message text is required");

    const design = await CustomDesign.findByIdAndUpdate(
      req.params.id,
      { $push: { messages: { sender: "customer", text: text.trim() } } },
      { new: true, runValidators: true }
    ).select("messages");

    if (!design) return sendError(res, 404, "Design not found");
    return sendSuccess(res, 201, design.messages, "Message sent");
  } catch (error) {
    next(error);
  }
};

// @desc    Admin replies to a customer's custom design chat thread
// @route   POST /custom-design-save/:id/messages/admin
// @access  Private (admin)
export const addAdminMessage = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return sendError(res, 400, "Message text is required");

    const design = await CustomDesign.findByIdAndUpdate(
      req.params.id,
      { $push: { messages: { sender: "admin", text: text.trim() } } },
      { new: true, runValidators: true }
    ).select("messages userId customOrderId");

    if (!design) return sendError(res, 404, "Design not found");

    notifyCustomer(
      design.userId,
      "New Message on Your Custom Design",
      `You have a new message from our team about your custom design order ${design.customOrderId}.`
    );

    return sendSuccess(res, 201, design.messages, "Reply sent");
  } catch (error) {
    next(error);
  }
};
