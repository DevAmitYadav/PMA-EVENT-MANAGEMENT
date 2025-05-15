"use client";
import React from "react";
import Image from "next/image";

// Subcomponent for the Video Section
const VideoSection = () => (
  <div className="w-full md:w-1/2 flex justify-center items-center">
    <video
      src="/frontend/videos/wedding.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="rounded-lg w-full max-w-md h-auto object-cover"
      aria-label="Wedding video presentation"
    />
  </div>
);

// Subcomponent for the Content Section
const ContentSection = () => (
  <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-16 space-y-6">
    <p className="text-[10px] text-[#2C3E50] uppercase tracking-widest font-semibold mb-3">
      Inspiration
    </p>
    <h1 className="text-3xl md:text-4xl text-[#2C3E50] italic font-semibold mb-4 leading-tight">
      Exclusive Design by Best Florists
    </h1>
    <Image
      src="/frontend/images/floral.jpg"
      alt="Floral Divider"
      width={80}
      height={20}
      className="mb-6"
      priority
    />
    <p className="text-sm text-[#3A3A3A] mb-10 max-w-md leading-relaxed">
      The floristry business has a significant market in the corporate and
      social event world, as flowers play a large part in the decor of special
      events and meetings.
    </p>
    <button
      type="button"
      className="bg-[#2C3E50] hover:bg-[#22374A] text-white text-[10px] font-semibold tracking-widest uppercase py-3 px-8 rounded-full shadow-md transition-all duration-300 w-max"
    >
      Visit Gallery
    </button>
  </div>
);

// Main Exclusive Design Component
const ExclusiveDesign = () => {
  return (
    <section className="bg-[#FAF9F8] font-['Playfair_Display'] w-full">
      <div className="flex flex-col md:flex-row w-full mx-0 md:mx-auto space-y-6 md:space-y-0 md:space-x-6 bg-white p-6 rounded-lg shadow-lg relative">
        <VideoSection />
        <ContentSection />
      </div>
    </section>
  );
};

export default React.memo(ExclusiveDesign);
