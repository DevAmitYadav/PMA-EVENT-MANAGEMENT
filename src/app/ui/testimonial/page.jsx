"use client";
import React, { useState, useEffect } from "react";
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
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        console.log(data);
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

  // Autoplay effect: Move to the next testimonial every 5 seconds.
  useEffect(() => {
    if (testimonials.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentTestimonial((prevIndex) =>
          (prevIndex + 1) % testimonials.length
        );
      }, 5000); // Change slide every 5 seconds.
      return () => clearInterval(intervalId);
    }
  }, [testimonials]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-[#2C3E50] text-base">Loading testimonials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-[#2C3E50] text-base">{error}</p>
      </div>
    );
  }

  const { text, author, image } = testimonials[currentTestimonial];

  return (
    <div className="flex justify-center items-center min-h-[50vh] bg-gradient-to-br from-[#FAF9F8] to-[#E0E4E8] py-4">
      {/* Wrapper with gradient border for extra 'bit depth' */}
      <div className="max-w-7xl w-full p-1 bg-gradient-to-br from-[#F0F4F8] to-[#FAF9F8] rounded-md shadow-2xl">
        <div className="relative bg-[#FAF9F8] rounded-md px-4 sm:px-8 py-6 flex flex-col items-center justify-center space-y-4 overflow">
          
          {/* Profile Image with stronger shadow */}
          <img
            alt="Testimonial"
            src={`http://localhost:5000/images/testimonial/${image}`}
            className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 rounded-full w-16 h-16 sm:w-20 sm:h-20 object-cover border-2 border-white shadow-xl"
            onError={(e) => {
              e.target.src = "/default-user.png"; // Fallback to a default image if not found
            }}
          />

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
