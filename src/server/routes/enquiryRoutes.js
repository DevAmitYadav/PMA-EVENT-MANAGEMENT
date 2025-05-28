import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
  getEnquiryById, // Import the new controller
} from '../controllers/enquiryController.js';

const router = express.Router();

// Define routes
router.post('/enquiries', createEnquiry);
router.get('/enquiries', getEnquiries);
router.get('/enquiries/:id', getEnquiryById); // Route to get a single enquiry by ID
router.put('/enquiries/:id', updateEnquiry);   // Route to update an enquiry by ID
router.delete('/enquiries/:id', deleteEnquiry); // Route to delete an enquiry by ID

export default router;