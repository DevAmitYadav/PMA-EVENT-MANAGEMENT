// src/lib/api/enquiryApi.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/enquiries';

// Function to handle API responses and throw errors
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json(); // Try to parse JSON error response
    } catch (jsonError) {
      // If JSON parsing fails, use the raw text
      errorData = await response.text();
    }
    const errorMessage = (errorData && errorData.message) ? errorData.message : `API Error: ${response.status} - ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return await response.json();
};

// Function to create an enquiry
export const submitEnquiry = async (enquiryData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enquiryData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    throw error; // Re-throw for component-level handling
  }
};

// Function to get all enquiries
export const getEnquiries = async () => {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 60 }, // Example: Revalidate every 60 seconds
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    throw error; // Re-throw for component-level handling
  }
};

// Function to get a single enquiry by ID
export const getEnquiryById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      next: { revalidate: 60 }, // Example: Revalidate every 60 seconds
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching enquiry by ID:', error);
    throw error; // Re-throw for component-level handling
  }
};

// Function to update an enquiry by ID
export const updateEnquiry = async (id, enquiryData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT', // Or PATCH if you are doing partial updates
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enquiryData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error updating enquiry:', error);
    throw error; // Re-throw for component-level handling
  }
};

// Function to delete an enquiry by ID
export const deleteEnquiry = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    throw error; // Re-throw for component-level handling
  }
};