import express from "express";
import {
  createCustomDesign,
  getAllCustomDesigns,
  getCustomDesignById,
  updateCustomDesign,
  updateOrderStatus,
  deleteCustomDesign,
} from "../controllers/customDesignController.js";
import { validateCustomDesign, validateObjectId } from "../middleware/validation.js";

const router = express.Router();

router.route("/").post(validateCustomDesign, createCustomDesign).get(getAllCustomDesigns);

router
  .route("/:id")
  .get(validateObjectId, getCustomDesignById)
  .put(validateObjectId, updateCustomDesign)
  .delete(validateObjectId, deleteCustomDesign);

router.patch("/:id/status", validateObjectId, updateOrderStatus);

export default router;
