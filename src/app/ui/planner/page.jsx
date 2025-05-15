"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";

// Custom hook to encapsulate interval logic.
function useInterval(callback, delay) {
  useEffect(() => {
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
}

// Static API data.
const apiData = [
  {
    title: "Wedding Planning Essentials",
    button: "Book Your Slot",
    images: [
      "/frontend/images/we1.jpg",
      "/frontend/images/we2.jpg",
      "/frontend/images/we3.jpg",
    ],
  },
  {
    title: "Birthday Party Decorations",
    button: "Book Your Slot",
    images: [
      "/frontend/images/b1.jpg",
      "/frontend/images/b3.jpg",
      "/frontend/images/b2.jpg",
    ],
  },
  {
    title: "Reception",
    button: "Book Your Slot",
    images: [
      "/frontend/images/re1.jpg",
      "/frontend/images/re2.jpg",
      "/frontend/images/re3.jpg",
    ],
  },
  {
    title: "Navratri Celebrations",
    button: "Book Your Slot",
    images: [
      "/frontend/images/nv2.jpg",
      "/frontend/images/nv4.jpg",
      "/frontend/images/nv8.jpg",
    ],
  },
];

// Memoized component for each Planner item.
const PlannerItem = React.memo(({ item, imgIndex }) => (
  <div className="transition-all duration-700 ease-in-out">
    {/* Container with inline border to ensure the thin shadow border shows */}
    <div
      className="relative shadow-md p-1 rounded-lg h-80 overflow-hidden"
      style={{ border: "1px solid rgba(44,62,80,0.3)" }}
    >
      <Image
        src={item.images[imgIndex]}
        alt={item.title}
        fill
        className="object-cover rounded-md transition duration-500"
      />
    </div>
    <p className="mt-6 text-lg font-semibold text-[#2C3E50]">
      {item.title}
    </p>
    <button className="mt-4 bg-[#2C3E50] hover:bg-[#22374A] transition text-white text-xs font-semibold tracking-widest py-2 px-6 rounded-md shadow">
      {item.button}
    </button>
  </div>
));

const Planner = () => {
  // Initialize image indexes array (one per item).
  const [imgIndexes, setImgIndexes] = useState(() =>
    new Array(apiData.length).fill(0)
  );

  // Update image indexes every 3 seconds.
  const updateIndexes = useCallback(() => {
    setImgIndexes((prev) =>
      prev.map((index, i) => (index + 1) % apiData[i].images.length)
    );
  }, []);

  useInterval(updateIndexes, 3000);

  return (
    <div className="bg-[#FAF9F8] text-[#2C3E50] min-h-screen font-['Inter'] py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-light mb-2 font-['Great_Vibes'] text-[#2C3E50]">
          Let's Plan Your Perfect Wedding
        </h1>
        <p className="text-sm text-[#2C3E50] tracking-widest font-semibold uppercase mb-12">
          Welcome
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-15xl mx-auto">
          {apiData.map((item, i) => (
            <PlannerItem key={i} item={item} imgIndex={imgIndexes[i]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planner;
