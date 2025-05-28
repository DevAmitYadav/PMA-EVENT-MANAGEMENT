"use client";

import { useState } from "react";
import { updateEnquiry } from "@/lib/api/enquiryApi";
import { toast } from "sonner";

export default function EditModal({ enquiry, onClose, refresh }) {
  const [formData, setFormData] = useState({
    fullName: enquiry.fullName || "",
    email: enquiry.email || "",
    phone: enquiry.phone || "",
    eventDetails: enquiry.eventDetails || "" // Use eventDetails consistently
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateEnquiry(enquiry._id, formData);
      toast.success("Enquiry updated successfully!");
      onClose();
      refresh(); // Refresh data after update
    } catch (error) {
      toast.error("Failed to update enquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Enquiry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          {/* Updated field: now using eventDetails */}
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="eventDetails"
              value={formData.eventDetails}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded border border-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
