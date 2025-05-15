"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { createEvent } from "../../../lib/api/eventApi.js";
import {
  FaTags,
  FaList,
  FaCalendarAlt,
  FaRegStickyNote,
  FaImage,
} from "react-icons/fa";
import { toast, Toaster } from "sonner"; // Import Sonner for toast notifications

const EventForm = () => {
  const [form, setForm] = useState({
    title: "",
    type: "",
    date: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update form state on input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Update form state when image is dropped/uploaded
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setForm((prevState) => ({ ...prevState, image: acceptedFiles[0] }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.type || !form.description || !form.date) {
      setError("Please fill in all required fields.");
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("type", form.type);
      // Sending the date as a "YYYY-MM-DD" string; the backend will merge with current time.
      formData.append("date", form.date);
      formData.append("description", form.description);
      if (form.image) {
        formData.append("image", form.image);
      }

      await createEvent(formData);
      toast.success("Event created successfully!");
      setForm({ title: "", type: "", date: "", description: "", image: null });
    } catch (err) {
      console.error(err);
      setError("Failed to create event. Please try again.");
      toast.error("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md mt-20">
      <Toaster position="top-center" richColors /> {/* Toast notifications container */}
      
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Share an Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Title and Type Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200 mb-1">
              <FaTags />
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200 mb-1">
              <FaList />
              Event Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
            >
              <option value="">Select Event Type</option>
              <option value="wedding event">Wedding Event</option>
              <option value="birthday event">Birthday Event</option>
              <option value="corporate event">Corporate Event</option>
            </select>
          </div>
        </div>

        {/* Row 2: Event Date and Image Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Date */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200 mb-1">
              <FaCalendarAlt />
              Event Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
            />
          </div>
          {/* Event Image */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200 mb-1">
              <FaImage />
              Event Image
            </label>
            <div
              {...getRootProps()}
              className="w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer dark:border-gray-600 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900"
            >
              <input {...getInputProps()} />
              <p className="text-center">
                {isDragActive
                  ? "Drop the image here..."
                  : form.image
                  ? form.image.name
                  : "Drag & drop image or click to select"}
              </p>
            </div>
          </div>
        </div>

        {/* Row 3: Event Description full-width */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200 mb-1">
            <FaRegStickyNote />
            Event Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the event..."
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
          ></textarea>
        </div>

        {/* Error Message (if any) */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Row 4: Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EventForm;
