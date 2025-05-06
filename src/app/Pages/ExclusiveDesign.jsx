import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faImage, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const ExclusiveDesign = () => {
  return (
    <div className="bg-[#f1f0eb] font-['Playfair_Display'] w-full">
      {/* Wrapper for content */}
      <div className="flex flex-col md:flex-row w-full mx-0 md:mx-auto space-y-6 md:space-y-0 md:space-x-6 bg-white p-6 rounded-lg shadow-lg">
        {/* Image Section - Medium size, ensuring it fits properly */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src="https://storage.googleapis.com/a1aa/image/8fde0493-e1c7-4b74-a65f-e749f933d2f5.jpg"
            alt="White flowers in glass vases with green leaves and wine glasses on a table"
            className="object-cover object-center rounded-lg w-full max-w-md h-auto"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-16 space-y-6">
          <p className="text-[10px] text-[#b9b18a] uppercase tracking-widest font-semibold mb-3">
            Inspiration
          </p>

          <h1 className="text-3xl md:text-4xl text-[#3e3e3e] italic font-semibold mb-4 leading-tight">
            Exclusive Design by Best Florists
          </h1>

          <p className="text-sm text-[#5a5a5a] mb-10 max-w-md leading-relaxed">
            The floristry business has a significant market in the corporate and
            social event world, as flowers play a large part in the decor of
            special events and meetings.
          </p>

          <button className="bg-[#a1ad6a] hover:bg-[#93a069] text-white text-[10px] font-semibold tracking-widest uppercase py-3 px-8 rounded-full shadow-md transition-all duration-300 w-max">
            Visit Gallery
          </button>

          {/* Vertical Icon Sidebar */}
          <div className="hidden md:flex flex-col space-y-4 absolute right-6 top-1/2 -translate-y-1/2">
            <button
              aria-label="Shopping cart"
              className="bg-[#a1ad6a] hover:bg-[#93a069] w-12 h-12 flex items-center justify-center text-white rounded-full transition"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
            </button>
            <button
              aria-label="Image gallery"
              className="bg-[#a1ad6a] hover:bg-[#93a069] w-12 h-12 flex items-center justify-center text-white rounded-full transition"
            >
              <FontAwesomeIcon icon={faImage} className="text-xl" />
            </button>
            <button
              aria-label="Calendar"
              className="bg-[#a1ad6a] hover:bg-[#93a069] w-12 h-12 flex items-center justify-center text-white rounded-full transition"
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveDesign;
