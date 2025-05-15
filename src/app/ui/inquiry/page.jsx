"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { submitEnquiry } from "../../../lib/api/enquiryApi.js";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "",
    eventDetails: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      formErrors.fullName = "Full Name is required";
      isValid = false;
    }

    if (!formData.email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.phone) {
      formErrors.phone = "Phone Number is required";
      isValid = false;
    }

    if (!formData.eventType) {
      formErrors.eventType = "Event Type is required";
      isValid = false;
    }

    if (!formData.eventDetails.trim()) {
      formErrors.eventDetails = "Event Details are required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const toastId = toast.loading("Submitting your enquiry...");

    try {
      await submitEnquiry(formData);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        eventType: "",
        eventDetails: "",
      });
      toast.success("Thanks For Submitting Enquiry!", { id: toastId });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong, please try again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen font-['Open_Sans']">
      <img
        src="https://storage.googleapis.com/a1aa/image/98eef421-5e12-41ab-b30b-2b19b73f0cd6.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-center -z-10"
      />
      <div className="absolute inset-0 bg-[#0f2a4a]/90 -z-5"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12 lg:gap-24 text-white">
        {/* Left Content */}
        <div className="lg:w-1/2 max-w-lg flex flex-col justify-center gap-8">
          <p className="text-[13px] font-semibold text-[#dba38f] uppercase tracking-widest">
            GET IN TOUCH
          </p>
          <h2 className="text-4xl font-bold leading-[1.1] font-serif">
            Let's Create Something Extraordinary
          </h2>
          <p className="text-sm max-w-md leading-relaxed">
            Ready to start planning your perfect event? Contact us today for a
            complimentary consultation and let's turn your vision into reality.
          </p>
          <div className="grid grid-cols-2 gap-y-6 gap-x-12 text-sm max-w-md">
            <ContactInfo
              icon="map-marker-alt"
              title="Our Office"
              lines={["123 Luxury Avenue", "New York, NY 10001"]}
            />
            <ContactInfo
              icon="phone-alt"
              title="Call Us"
              lines={["+1 (555) 123-4567", "Mon-Fri, 9am-6pm"]}
            />
            <ContactInfo
              icon="envelope"
              title="Email Us"
              lines={["info@elevateevents.com", "support@elevateevents.com"]}
            />
            <ContactInfo
              icon="clock"
              title="Business Hours"
              lines={["Monday - Friday: 9am - 6pm", "Weekends: By appointment"]}
            />
          </div>
          <div className="flex gap-4 mt-6">
            {["facebook-f", "instagram", "linkedin-in"].map((icon) => (
              <a
                key={icon}
                href="#"
                aria-label={icon}
                className="w-9 h-9 border border-white rounded-full flex items-center justify-center text-white text-[14px] hover:bg-[#dba38f] hover:border-[#dba38f] transition"
              >
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Right Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:w-1/2 bg-white/20 backdrop-blur-xl rounded-xl p-10 shadow-2xl max-w-2xl"
        >
          <h3 className="text-white font-serif font-bold text-xl mb-6">
            Request a Consultation
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <InputField
              id="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />
            <InputField
              id="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              id="phone"
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            <div className="flex flex-col">
              <label
                htmlFor="eventType"
                className="text-white text-xs font-semibold mb-1"
              >
                Event Type
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className={`bg-white/20 text-white rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#dba38f] transition ${
                  errors.eventType ? "border-[#FFF100]" : ""
                }`}
              >
                <option className="text-black" value="" disabled>
                  Select...
                </option>
                <option className="text-black" value="Wedding">
                  Wedding
                </option>
                <option className="text-black" value="Corporate">
                  Corporate
                </option>
                <option className="text-black" value="Birthday">
                  Birthday
                </option>
                <option className="text-black" value="Private">
                  Private Event
                </option>
              </select>
              {errors.eventType && (
                <p className="text-[#FFF100] text-xs">{errors.eventType}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <label
              htmlFor="eventDetails"
              className="text-white text-xs font-semibold mb-1"
            >
              Event Details
            </label>
            <textarea
              id="eventDetails"
              name="eventDetails"
              placeholder="Tell us more about your event..."
              rows={4}
              value={formData.eventDetails}
              onChange={handleChange}
              className={`bg-white/20 placeholder-white/70 text-white rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#dba38f] transition ${
                errors.eventDetails ? "border-[#FFF100]" : ""
              }`}
            />
            {errors.eventDetails && (
              <p className="text-[#FFF100] text-xs">{errors.eventDetails}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#dba38f] hover:bg-[#0A2342] text-white font-semibold text-sm py-3 rounded-lg transition disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </section>
  );
};

const ContactInfo = ({ icon, title, lines }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2 text-[#dba38f]">
      <i className={`fas fa-${icon} text-[18px]`}></i>
      <span className="font-semibold">{title}</span>
    </div>
    {lines.map((line, i) => (
      <p key={i}>{line}</p>
    ))}
  </div>
);

const InputField = ({ id, label, type = "text", value, onChange, error }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-white text-xs font-semibold mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={`Your ${label.toLowerCase()}`}
      value={value}
      onChange={onChange}
      className={`bg-white/20 placeholder-white/70 text-white rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#dba38f] transition ${
        error ? "border-[#FFF100]" : ""
      }`}
    />
    {error && <p className="text-[#FFF100] text-xs">{error}</p>}
  </div>
);

export default EnquiryForm;
