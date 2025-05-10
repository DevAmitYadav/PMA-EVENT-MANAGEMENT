// lib/api/testimonialApi.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/testimonial';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred while processing your request');
  }
  return await response.json();
};

export const getTestimonials = async () => {
  const response = await fetch(API_URL);
  return handleResponse(response);
};

export const addTestimonial = async (formData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData, 
  });
  return handleResponse(response);
};
