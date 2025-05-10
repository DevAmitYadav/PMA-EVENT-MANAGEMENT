import { createEnquiry, getEnquiries } from '../../server/controllers/enquiryController';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle creating a new enquiry
    await createEnquiry(req, res);
  } else if (req.method === 'GET') {
    // Handle getting all enquiries
    await getEnquiries(req, res);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
