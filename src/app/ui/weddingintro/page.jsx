"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Carousel data – ensure these assets exist or update paths accordingly.
const carouselItems = [
  {
    type: "image",
    src: "/frontend/images/saveimage23.jpg",
    alt: "Wedding arch with pink flowers",
  },
  {
    type: "video",
    src: "/frontend/videos/hall.mp4",
  },
  {
    type: "image",
    src: "/frontend/images/saveimage24.jpg",
    alt: "Decorative floral border with pastel flowers",
  },
];

// --------------------------
// Text Column Subcomponent
// --------------------------
const WeddingTextColumn = () => (
  <section className="max-w-xl z-10">
    <p className="text-xs text-[#2C3E50] font-semibold tracking-widest mb-3 uppercase">
      About Us
    </p>
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-6 text-[#2C3E50]">
      We Plan & Design Weddings
      <br />
      That Capture the Imagination
    </h1>
    <Image
      src="/frontend/images/floral.jpg"
      alt="Floral Divider"
      width={80}
      height={20}
      className="mb-6"
      priority
    />
    <p className="text-sm text-[#2C3E50] leading-relaxed mb-10">
      Weddings are significant events in people’s lives, and as such,
      couples are often willing to spend a considerable amount to ensure
      their weddings are well-organized. Wedding planners are often used by
      couples who work long hours with little spare time for sourcing and
      managing venues.
    </p>
    <button
      type="button"
      className="bg-[#2C3E50] hover:bg-[#22374A] transition text-white text-xs font-semibold tracking-widest py-4 px-10 uppercase shadow-md rounded-full"
    >
      More About Us
    </button>
  </section>
);

// --------------------------
// Carousel Subcomponent
// --------------------------
const CarouselSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const intervalRef = useRef(null);

  // Auto slide logic with fade transition
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
        setFade(false);
      }, 300);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section
      id="carousel"
      className="relative w-full max-w-md md:max-w-lg lg:max-w-xl border border-[#ECECEC] shadow-md overflow-hidden rounded-md z-10"
    >
      <div className="w-full h-[400px]">
        {carouselItems[currentIndex].type === "image" ? (
          <Image
            key={currentIndex}
            alt={carouselItems[currentIndex].alt || ""}
            src={carouselItems[currentIndex].src}
            fill
            className={`object-cover transition-opacity duration-500 ease-in-out ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <video
            key={currentIndex}
            src={carouselItems[currentIndex].src}
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
      </div>
      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {carouselItems.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// --------------------------
// Main Component
// --------------------------
const WeddingIntro = () => {
  return (
    <div className="bg-[#FAF9F8] relative min-h-screen overflow-x-hidden">
      {/* Background Decorative Image */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none h-[600px]">
        <Image
          alt="Decorative floral border"
          src="/frontend/images/byter34.jpg"
          fill
          className="object-cover"
          priority
        />
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative pt-24 pb-[360px] md:pb-[280px] flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-24">
        <WeddingTextColumn />
        <CarouselSection />
      </main>
    </div>
  );
};

export default WeddingIntro;
