// "use client";
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// const TestimonialCarousel = () => {
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);

//   const testimonials = [
//     {
//       text: "We were extremely excited, but everything was even more than we hoped for!",
//       author: "Kelly & Brandon Walsh, CA",
//       image:
//         "https://storage.googleapis.com/a1aa/image/c7f943b3-0b7f-4e40-27a1-f10c8b47caa4.jpg",
//     },
//     {
//       text: "An unforgettable experience that truly exceeded our expectations!",
//       author: "Sarah & John, NY",
//       image: "https://placehold.co/600x200/ffffff/ffffff",
//     },
//     {
//       text: "The best service we could ever ask for, we highly recommend them!",
//       author: "Emily & Mike, TX",
//       image: "https://placehold.co/600x200/ffffff/ffffff",
//     },
//   ];

//   const goToPreviousTestimonial = () => {
//     setCurrentTestimonial((prevIndex) =>
//       prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNextTestimonial = () => {
//     setCurrentTestimonial((prevIndex) =>
//       prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[50vh] bg-[#FAF9F8] py-4">
//       <div className="relative max-w-4xl w-full bg-[#FAF9F8] bg-[url('https://placehold.co/600x200/FAF9F8/FAF9F8')] bg-no-repeat bg-center bg-[length:100%_100%] rounded-md shadow-md px-8 py-6 flex flex-col items-center justify-center space-y-4">
//         {/* Responsive Testimonial Image */}
//         <img
//           alt="Testimonial"
//           src={testimonials[currentTestimonial].image}
//           className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 rounded-full 
//                      w-16 h-16 sm:w-20 sm:h-20 object-cover border-2 border-white shadow-md"
//         />

//         {/* Previous Button */}
//         <button
//           aria-label="Previous testimonial"
//           onClick={goToPreviousTestimonial}
//           className="absolute left-4 sm:left-6 bg-[#2C3E50] text-white rounded-full 
//                      w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-[#22374A] transition"
//         >
//           <FontAwesomeIcon icon={faArrowLeft} />
//         </button>

//         {/* Next Button */}
//         <button
//           aria-label="Next testimonial"
//           onClick={goToNextTestimonial}
//           className="absolute right-4 sm:right-6 bg-[#2C3E50] text-white rounded-full 
//                      w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-[#22374A] transition"
//         >
//           <FontAwesomeIcon icon={faArrowRight} />
//         </button>

//         {/* Testimonial Text */}
//         <p className="text-center text-[#2C3E50] italic font-['Great_Vibes'] text-lg sm:text-xl 
//                    leading-relaxed px-4">
//           "{testimonials[currentTestimonial].text}"
//         </p>

//         {/* Testimonial Author for Mobile */}
//         <p className="md:hidden mt-4 text-sm text-[#2C3E50] font-serif">
//           {testimonials[currentTestimonial].author}
//         </p>

//         {/* Testimonial Author for Desktop */}
//         <p className="hidden md:block absolute bottom-4 right-8 text-sm text-[#2C3E50] font-serif">
//           {testimonials[currentTestimonial].author}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TestimonialCarousel;
  

"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const TestimonialCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  const goToPreviousTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  if (testimonials.length === 0) return <p>Loading testimonials...</p>;

  return (
    <div className="flex justify-center items-center min-h-[50vh] bg-[#FAF9F8] py-4">
      <div className="relative max-w-4xl w-full rounded-md shadow-md px-8 py-6 flex flex-col items-center justify-center space-y-4 bg-white">
        <img
          alt="Testimonial"
          src={testimonials[currentTestimonial].image}
          className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 rounded-full w-16 h-16 sm:w-20 sm:h-20 object-cover border-2 border-white shadow-md"
        />
        <button
          onClick={goToPreviousTestimonial}
          className="absolute left-4 sm:left-6 bg-[#2C3E50] text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-[#22374A]"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          onClick={goToNextTestimonial}
          className="absolute right-4 sm:right-6 bg-[#2C3E50] text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-[#22374A]"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <p className="text-center text-[#2C3E50] italic text-lg sm:text-xl leading-relaxed px-4">
          "{testimonials[currentTestimonial].text}"
        </p>
        <p className="md:hidden mt-4 text-sm text-[#2C3E50] font-serif">
          {testimonials[currentTestimonial].author}
        </p>
        <p className="hidden md:block absolute bottom-4 right-8 text-sm text-[#2C3E50] font-serif">
          {testimonials[currentTestimonial].author}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
