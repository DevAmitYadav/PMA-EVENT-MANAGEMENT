import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true }, // Store the filename or URL
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
