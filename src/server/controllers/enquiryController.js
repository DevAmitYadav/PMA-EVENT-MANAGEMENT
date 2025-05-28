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

// Update an enquiry by ID
export const updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;  // Extract ID from request parameters
    const { fullName, email, phone, eventType, eventDetails } = req.body;

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { fullName, email, phone, eventType, eventDetails },
      { new: true, runValidators: true } // `new: true` returns the modified document. `runValidators: true` ensures validation rules are applied.
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.status(200).json({ message: 'Enquiry updated successfully', enquiry: updatedEnquiry });

  } catch (error) {
    console.error('Error updating enquiry:', error.message);
    res.status(500).json({ message: 'Error updating enquiry', error: error.message });
  }
};


// Delete an enquiry by ID
export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from request parameters

    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.status(200).json({ message: 'Enquiry deleted successfully' });

  } catch (error) {
    console.error('Error deleting enquiry:', error.message);
    res.status(500).json({ message: 'Error deleting enquiry', error: error.message });
  }
};

// Get a single enquiry by ID
export const getEnquiryById = async (req, res) => {
    try {
      const { id } = req.params;
      const enquiry = await Enquiry.findById(id);

      if (!enquiry) {
        return res.status(404).json({ message: 'Enquiry not found' });
      }

      res.status(200).json(enquiry);
    } catch (error) {
      console.error('Error fetching enquiry:', error.message);
      res.status(500).json({ message: 'Error fetching enquiry', error: error.message });
    }
  };