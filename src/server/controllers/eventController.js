import Event from '../models/event.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the directory for event images exists
const uploadDir = 'public/images/eventImages';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'event-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage }).single('image');

// Helper function to combine selected date with current time
const combineDateAndCurrentTime = (dateStr) => {
  // Create a date object from the provided date (assumed format "YYYY-MM-DD")
  // We force the time to midnight on that date.
  const selectedDate = new Date(dateStr + "T00:00:00");
  // Get the current time
  const now = new Date();
  // Combine the current time with the selected date:
  selectedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
  return selectedDate;
};

// CREATE an event
export const createEvent = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Image upload error:", err);
      return res.status(400).json({ error: 'Image upload failed.' });
    }

    // Extract required fields. We're using "type" to match the schema.
    const { title, description, type, date } = req.body;
    console.log("Received UI date:", date);

    // Combine the UI-selected date with the current time.
    const eventDate = combineDateAndCurrentTime(date);
    console.log("Combined event date:", eventDate);

    // Validate that all required fields are provided
    if (!title || !description || !type || !date || isNaN(eventDate)) {
      return res.status(400).json({ error: 'Missing required fields or invalid date' });
    }

    const imageUrl = req.file ? `/images/eventImages/${req.file.filename}` : null;

    try {
      const newEvent = new Event({
        title,
        description,
        type,
        date: eventDate, // The full date-time (with current time) is stored in the database
        image: imageUrl,
      });

      await newEvent.save();
      res.status(201).json({ success: true, event: newEvent });
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: 'Error creating event' });
    }
  });
};

// GET all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events' });
  }
};

// UPDATE an event
export const updateEvent = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Image upload failed.' });
    }

    const { title, description, type, date } = req.body;
    // Combine the incoming date with current time
    const eventDate = combineDateAndCurrentTime(date);
    const updateData = { title, description, type, date: eventDate };

    if (req.file) {
      updateData.image = `/images/eventImages/${req.file.filename}`;
    }

    try {
      const event = await Event.findByIdAndUpdate(req.params.eventId, updateData, { new: true });
      res.json({ success: true, event });
    } catch (error) {
      res.status(500).json({ error: 'Error updating event' });
    }
  });
};

// DELETE an event
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    // Delete the image file from filesystem if it exists
    if (event && event.image) {
      const imagePath = path.join('public', event.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Event.findByIdAndDelete(eventId);
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting event' });
  }
};
