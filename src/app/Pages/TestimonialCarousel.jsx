"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const TestimonialCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "We were extremely excited, but everything was even more than we hoped for!",
      author: "Kelly & Brandon Walsh, CA",
      image: "https://storage.googleapis.com/a1aa/image/c7f943b3-0b7f-4e40-27a1-f10c8b47caa4.jpg"
    },
    {
      text: "An unforgettable experience that truly exceeded our expectations!",
      author: "Sarah & John, NY",
      image: "https://placehold.co/600x200/ffffff/ffffff"
    },
    {
      text: "The best service we could ever ask for, we highly recommend them!",
      author: "Emily & Mike, TX",
      image: "https://placehold.co/600x200/ffffff/ffffff"
    }
  ];

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

  return (
    <div className="flex justify-center items-center min-h-[50vh] bg-[#f5f3f0] py-4">
      <div className="relative max-w-4xl w-full bg-[#f5f3f0] bg-[url('https://placehold.co/600x200/ffffff/ffffff')] bg-no-repeat bg-center bg-[length:100%_100%] rounded-md shadow-md px-8 py-6 flex flex-col items-center justify-center space-y-4">
        {/* Testimonial Image */}
        <img
          alt="Testimonial"
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 rounded-full w-20 h-20 object-cover border-2 border-white shadow-md"
          height="80"
          width="80"
          src={testimonials[currentTestimonial].image}
        />
        {/* Previous Button */}
        <button
          aria-label="Previous testimonial"
          onClick={goToPreviousTestimonial}
          className="absolute left-6 bg-[#cbb89a] text-white rounded-full w-10 h-10 flex items-center justify-center hover:opacity-90"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {/* Next Button */}
        <button
          aria-label="Next testimonial"
          onClick={goToNextTestimonial}
          className="absolute right-6 bg-[#cbb89a] text-white rounded-full w-10 h-10 flex items-center justify-center hover:opacity-90"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        {/* Testimonial Text */}
        <p className="text-center text-gray-700 italic font-[\'Great Vibes\'] text-lg leading-relaxed px-4 flex-wrap">
          "{testimonials[currentTestimonial].text}"
        </p>
        {/* Testimonial Author */}
        <p className="absolute bottom-4 right-8 text-sm text-[#7a6f5f] font-serif">
          {testimonials[currentTestimonial].author}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
