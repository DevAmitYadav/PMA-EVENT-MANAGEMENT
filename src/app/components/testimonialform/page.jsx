"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { addTestimonial } from "../../../lib/api/testimonialApi.js";
import { FaQuoteLeft, FaUserAlt, FaImage } from "react-icons/fa";

const TestimonialForm = () => {
  const [form, setForm] = useState({ text: "", author: "", image: null });

  // Handle text and author field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle drop event for image upload
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setForm((prevState) => ({ ...prevState, image: acceptedFiles[0] }));
    }
  }, []);

  // Initialize dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("text", form.text);
      formData.append("author", form.author);

      // Only append image if it's selected
      if (form.image) {
        formData.append("image", form.image);
      }

      // Call the API to add the testimonial
      await addTestimonial(formData);
      alert("Testimonial added successfully!");

      // Reset form state
      setForm({ text: "", author: "", image: null });
    } catch (err) {
      console.error(err);
      alert("Failed to add testimonial");
    }
  };

  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-20">
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
        Share Your Experience
      </h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {/* Testimonial Text */}
        <div className="mb-6">
          <label htmlFor="text" className="block text-gray-700 dark:text-gray-200">
            Testimonial
          </label>
          <div className="relative mt-2">
            <textarea
              id="text"
              name="text"
              rows="4"
              placeholder="Tell us about your experience..."
              value={form.text}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 pl-12 text-gray-700 bg-white border border-black rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-400 focus:border-black focus:outline-none focus:ring"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
              <FaQuoteLeft />
            </div>
          </div>
        </div>

        {/* Author & Image Uploader */}
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          {/* Author Field */}
          <div>
            <label htmlFor="author" className="block text-gray-700 dark:text-gray-200">
              Your Name
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                id="author"
                name="author"
                placeholder="Your name"
                value={form.author}
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 pl-12 text-gray-700 bg-white border border-black rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-400 focus:border-black focus:outline-none focus:ring"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                <FaUserAlt />
              </div>
            </div>
          </div>

          {/* Image Upload Field */}
          <div>
            <label htmlFor="image" className="block text-gray-700 dark:text-gray-200">
              Image Upload
            </label>
            <div
              {...getRootProps()}
              className="relative mt-2 p-3 border border-black rounded-md dark:border-gray-400 cursor-pointer bg-white dark:bg-gray-800"
            >
              <input {...getInputProps()} id="image" name="image" />
              <div className="flex items-center text-gray-700 dark:text-gray-200">
                <FaImage />
                <span className="ml-2">
                  {isDragActive
                    ? "Drop image here..."
                    : form.image
                    ? form.image.name
                    : "Drag and drop an image or click to select"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default TestimonialForm;
