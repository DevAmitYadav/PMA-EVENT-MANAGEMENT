const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const TESTIMONIAL_API = `${BASE_URL}/api/testimonial`;

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: 'An unknown error occurred' };
    }
    throw new Error(errorData.message || 'An error occurred while processing your request');
  }
  return await response.json();
};

export const getTestimonials = async () => {
  const response = await fetch(TESTIMONIAL_API);
  console.log("Response from API:", response);
  return handleResponse(response);
};

export const addTestimonial = async (formData) => {
  const response = await fetch(TESTIMONIAL_API, {
    method: 'POST',
    body: formData,
  });
  return handleResponse(response);
};
