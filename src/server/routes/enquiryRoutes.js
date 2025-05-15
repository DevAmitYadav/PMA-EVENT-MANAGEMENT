import express from 'express';
import { createEnquiry, getEnquiries } from '../controllers/enquiryController.js';

const router = express.Router();

router.post('/enquiries', createEnquiry);
router.get('/enquiries', getEnquiries);

export default router;
        