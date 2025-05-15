import express from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/eventController.js';

const router = express.Router();

// POST route to create an event
router.post('/events', createEvent);

// GET route to fetch all events
router.get('/events', getEvents);

// PUT route to update an event
router.put('/events/:eventId', updateEvent);

// DELETE route to delete an event
router.delete('/events/:eventId', deleteEvent);

export default router;
