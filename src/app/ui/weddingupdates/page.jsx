"use client";
import React from "react";
import Image from "next/image";

const WeddingUpdates = () => {
  const galleryImages = [
    "/frontend/images/weddingUpdates.jpg",
    "/frontend/images/weddingUpdates2.jpg",
    "/frontend/images/weddingUpdates3.jpg",
    "/frontend/images/weddingUpdates4.jpg",
  ];

  return (
    <>
      {/* Header Section (currently commented out) */}
      {/* <div className="bg-[#2C3E50] flex flex-col md:flex-row items-center justify-center gap-6 py-6 px-4 md:px-20">
        <h2 className="text-white font-[Pacifico] text-xl md:text-2xl font-semibold italic whitespace-nowrap">
          Stay Tuned with Updates!
        </h2>
        <form className="flex items-center gap-4 w-full max-w-md">
          <label
            htmlFor="email"
            className="text-white text-sm font-semibold whitespace-nowrap"
          >
            Enter Your Email
          </label>
          <input
            type="email"
            id="email"
            placeholder=""
            className="flex-grow border-b border-white bg-transparent text-white text-sm placeholder:text-white focus:outline-none"
          />
          <button
            type="submit"
            className="border border-white text-white text-xs font-semibold px-4 py-2 tracking-widest hover:bg-white hover:text-[#2C3E50] transition"
          >
            SUBMIT
          </button>
        </form>
      </div> */}

      {/* Image Gallery */}
      <div className="flex flex-wrap">
        {galleryImages.map((src, idx) => (
          <div
            key={idx}
            className="relative w-1/2 md:w-1/4 h-[200px] md:h-[300px]"
          >
            <Image
              src={src}
              alt={`Wedding image ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0} // Preload the first image if needed
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default WeddingUpdates;
