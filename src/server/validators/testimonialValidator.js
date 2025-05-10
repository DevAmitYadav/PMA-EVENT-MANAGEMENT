// validators/testimonialValidator.js
import { body } from 'express-validator';

export const validateTestimonial = [
  body('text').notEmpty().withMessage('Text is required'),
  body('author').notEmpty().withMessage('Author is required'),
];
