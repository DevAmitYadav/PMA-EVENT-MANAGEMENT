import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/events';

export const createEvent = async (eventData) => {
  const response = await axios.post(BASE_URL, eventData);
  return response.data;
};

export const fetchEvents = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
