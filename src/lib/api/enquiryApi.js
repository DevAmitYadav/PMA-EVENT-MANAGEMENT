// src/lib/api/enquiryApi.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/enquiries'; // Use environment variable for API URL

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred while processing your request');
  }
  return await response.json();
};

// Function to create an enquiry
export const submitEnquiry = async (enquiryData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(enquiryData),
  });
  return handleResponse(response);
};

// Function to get all enquiries
export const getEnquiries = async () => {
  const response = await fetch(API_URL);
  return handleResponse(response);
};
