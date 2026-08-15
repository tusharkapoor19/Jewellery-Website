import express from "express";
import {
  createCustomDesign,
  getAllCustomDesigns,
  getDesignSummary,
  getCustomDesignById,
  updateCustomDesign,
  updateOrderStatus,
  deleteCustomDesign,
  getMessages,
  addCustomerMessage,
  addAdminMessage,
  uploadDesignReferenceImage,
} from "../controllers/customDesignController.js";
import { validateCustomDesign, validateObjectId } from "../middleware/validation.js";
import { uploadReferenceImage } from "../middleware/upload.js";
import authMiddleware from "../middleware/authMidd.js";
import adminMiddleware from "../middleware/adminMidd.js";

const router = express.Router();

// Public: customer submits a design (no login required) / lists designs
// (used by the customer's "My Custom Orders" page filtered by their email,
// and by the admin dashboard's Custom Design tab, which sends its request
// with the admin's Bearer token attached - harmless here since this route
// itself doesn't require it).
router.route("/").post(validateCustomDesign, createCustomDesign).get(getAllCustomDesigns);

// Reference photo upload for the "Have a reference photo?" step. Must be
// registered before the "/:id" routes below so "upload-image" isn't
// swallowed as an :id param. Public, same as the create route above — a
// guest can attach a photo before ever creating an account.
router.post("/upload-image", uploadReferenceImage, uploadDesignReferenceImage);

// Admin-only: summary counts for the Custom Design tab's stat cards.
router.get("/stats/summary", authMiddleware, adminMiddleware, getDesignSummary);

router
  .route("/:id")
  .get(validateObjectId, getCustomDesignById)
  .put(validateObjectId, authMiddleware, adminMiddleware, updateCustomDesign)
  .patch(validateObjectId, authMiddleware, adminMiddleware, updateCustomDesign)
  .delete(validateObjectId, authMiddleware, adminMiddleware, deleteCustomDesign);

router.patch(
  "/:id/status",
  validateObjectId,
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

// Chat between customer and admin about a specific design request.
router
  .route("/:id/messages")
  .get(validateObjectId, getMessages)
  .post(validateObjectId, addCustomerMessage);

router.post(
  "/:id/messages/admin",
  validateObjectId,
  authMiddleware,
  adminMiddleware,
  addAdminMessage
);

export default router;
