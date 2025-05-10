// routes/testimonialRoutes.js
import express from "express";
import { createTestimonial, getTestimonials } from "../controllers/testimonialController.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/testimonial", upload.single("image"), createTestimonial);
router.get("/testimonials", getTestimonials);

export default router;
