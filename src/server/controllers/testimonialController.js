// controllers/testimonialController.js
import  Testimonial  from "../models/testimonial.js";

export const createTestimonial = async (req, res) => {
  try {
    const { text, author } = req.body;
    const image = req.file?.filename;

    if (!text || !author || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const testimonial = await Testimonial.create({
      text,
      author,
      image: `/uploads/${image}`,
    });

    res.status(201).json({
      message: "Testimonial created successfully",
      testimonial,
    });
  } catch (err) {
    console.error("Create Testimonial Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (err) {
    console.error("Fetch Testimonials Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
