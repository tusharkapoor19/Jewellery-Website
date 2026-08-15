import express from "express";
import {
  createOffer,
  getAllOffers,
  getActiveOffers,
  updateOffer,
  deleteOffer,
  validateOffer,
} from "../controller/offerController.js";
import authMiddleware from "../middleware/authMidd.js";
import adminMiddleware from "../middleware/adminMidd.js";

const router = express.Router();

// Public: storefront (Offers page, Cart page) reads only active offers.
router.get("/active", getActiveOffers);

// Public: authoritative check when a customer applies a coupon code.
router.post("/validate", validateOffer);

// Admin-only: full CRUD for managing offers from the dashboard.
router.route("/").get(authMiddleware, adminMiddleware, getAllOffers).post(
  authMiddleware,
  adminMiddleware,
  createOffer
);

router
  .route("/:id")
  .patch(authMiddleware, adminMiddleware, updateOffer)
  .delete(authMiddleware, adminMiddleware, deleteOffer);

export default router;
