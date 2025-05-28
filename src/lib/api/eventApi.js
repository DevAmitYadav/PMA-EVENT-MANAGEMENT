import axios from 'axios';

// Base URL only up to the host, no resource path included
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Full API endpoint for events
const EVENTS_API = `${BASE_URL}/api/events`;

// Create a new event
export const createEvent = async (eventData) => {
  const response = await axios.post(EVENTS_API, eventData);
  return response.data;
};

// Fetch all events
export const fetchEvents = async () => {
  const response = await axios.get(EVENTS_API);
  return response.data;
};
