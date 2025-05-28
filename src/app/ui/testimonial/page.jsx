"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const TestimonialCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/testimonials");
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        setError("Error fetching testimonials: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const goToPreviousTestimonial = () => {
    setCurrentTestimonial((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNextTestimonial = () => {
    setCurrentTestimonial((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Autoplay effect
  useEffect(() => {
    if (testimonials.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentTestimonial((prevIndex) =>
          (prevIndex + 1) % testimonials.length
        );
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [testimonials]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-[#2C3E50] text-base">Loading testimonials...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-[#2C3E50] text-base">{error}</p>
      </div>
    );
  }

  // No testimonials state
  if (!loading && testimonials.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-[#2C3E50] text-base">No testimonials found.</p>
      </div>
    );
  }

  const testimonial = testimonials[currentTestimonial];

  if (!testimonial) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-[#2C3E50] text-base">Invalid testimonial data.</p>
      </div>
    );
  }

  const { text, author, image } = testimonial;

  return (
    <div className="flex justify-center items-center min-h-[50vh] bg-gradient-to-br from-[#FAF9F8] to-[#E0E4E8] py-4">
      <div className="max-w-7xl w-full p-1 bg-gradient-to-br from-[#F0F4F8] to-[#FAF9F8] rounded-md shadow-2xl">
        <div className="relative bg-[#FAF9F8] rounded-md px-4 sm:px-8 py-6 flex flex-col items-center justify-center space-y-4 overflow">
          
          {/* Profile Image */}
          <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 rounded-full w-16 h-16 sm:w-20 sm:h-20 border-2 border-white shadow-xl bg-white overflow-hidden">
            <Image
              alt="Testimonial"
              src={
                image
                  ? `http://localhost:5000/images/testimonial/${image}`
                  : "/frontend/images/fallback.jpg"
              }
              width={80}
              height={80}
              className="rounded-full object-cover w-full h-full"
              onError={(e) => {
                e.target.src = "/frontend/images.jpg";
              }}
              unoptimized // Remove if you want Next.js to optimize remote images and you have set up domains in next.config.js
            />
          </div>

          {/* Previous Button */}
          <button
            aria-label="Previous testimonial"
            onClick={goToPreviousTestimonial}
            className="absolute left-4 sm:left-6 bg-[#2C3E50] text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-[#22374A] transition"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          {/* Next Button */}
          <button
            aria-label="Next testimonial"
            onClick={goToNextTestimonial}
            className="absolute right-4 sm:right-6 bg-[#2C3E50] text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-[#22374A] transition"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>

          {/* Testimonial Text */}
          <p className="text-center text-[#2C3E50] italic font-['Great_Vibes'] text-lg sm:text-xl leading-relaxed px-4 py-6">
            "{text}"
          </p>

          {/* Author for Mobile */}
          <p className="md:hidden mt-4 text-sm text-[#2C3E50] font-serif">{author}</p>

          {/* Author for Desktop */}
          <p className="hidden md:block absolute bottom-4 right-8 text-sm text-[#2C3E50] font-serif">
            {author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
