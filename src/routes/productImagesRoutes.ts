import { Router } from "express";
import {
  getProductImage,
  getProductImageId,
} from "../controllers/productImageController";

const router = Router();
router.get("/product-images", getProductImage);
router.get("/product-images/:id", getProductImageId);

export default router;
