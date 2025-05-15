import Enquiry from '../models/enquiry.js';

// Create a new enquiry
export const createEnquiry = async (req, res) => {
  try {
    const { fullName, email, phone, eventType, eventDetails } = req.body;

    const newEnquiry = new Enquiry({
      fullName,
      email,
      phone,
      eventType,
      eventDetails,
    });

    await newEnquiry.save();

    res.status(201).json({ message: 'Enquiry created successfully', enquiry: newEnquiry });
  } catch (error) {
    console.error('Error creating enquiry:', error.message);
    res.status(500).json({ message: 'Error creating enquiry', error: error.message });
  }
};

// Get all enquiries
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.status(200).json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error.message);
    res.status(500).json({ message: 'Error fetching enquiries', error: error.message });
  }
};