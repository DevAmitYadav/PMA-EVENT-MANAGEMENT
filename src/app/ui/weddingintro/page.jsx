"use client";
import React, { useState, useEffect, useRef } from "react";

const WeddingIntro = () => {
  const images = [
    {
      src: "https://storage.googleapis.com/a1aa/image/0da14d39-ce37-4e57-83f7-3eb05765a91a.jpg",
      alt: "Wedding arch with pink flowers",
    },
    {
      src: "https://storage.googleapis.com/a1aa/image/364d23da-e698-446c-78c0-f0e6605873ce.jpg",
      alt: "Floral divider with delicate pink and white flowers arranged horizontally",
    },
    {
      src: "https://storage.googleapis.com/a1aa/image/f197a4d8-9450-44b8-82ef-a5b3164a382d.jpg",
      alt: "Decorative floral border with soft pastel flowers and green leaves stretching horizontally",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const intervalRef = useRef(null);

  const handlePrevClick = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFade(false);
    }, 300);
    resetInterval();
  };

  const handleNextClick = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFade(false);
    }, 300);
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(false);
      }, 300);
    }, 5000);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="bg-[#FAF9F8] relative min-h-screen overflow-x-hidden">
      {/* Background Decorative Image */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none">
        <img
          alt="Decorative floral border with soft pastel flowers and green leaves stretching horizontally"
          className="w-full object-cover"
          height="600"
          src="https://storage.googleapis.com/a1aa/image/f197a4d8-9450-44b8-82ef-a5b3164a382d.jpg"
          style={{ height: "600px" }}
          width="1920"
        />
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative pt-24 pb-[360px] md:pb-[280px] flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-24">
        {/* Text Column */}
        <section className="max-w-xl z-10">
          <p className="text-xs text-[#2C3E50] font-semibold tracking-widest mb-3 uppercase">
            About Us
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-['Great_Vibes'] leading-tight mb-6 text-[#2C3E50]">
            We Plan &amp; Design Weddings
            <br />
            That Capture the Imagination
          </h1>
          <img
            src="https://storage.googleapis.com/a1aa/image/a7ab97e5-057c-4059-14e7-f5123b84c304.jpg"
            alt="Floral Divider"
            width="80"
            height="20"
            className="mb-6"
          />
          <p className="text-sm text-[#2C3E50] leading-relaxed mb-10">
            Weddings are significant events in people’s lives and as such,
            couples are often willing to spend a considerable amount of money to
            ensure that their weddings are well-organized. Wedding planners are
            often used by couples who work long hours and have little spare time
            available for sourcing and managing wedding venues.
          </p>
          <button
            className="bg-[#2C3E50] hover:bg-[#22374A] transition text-white text-xs font-semibold tracking-widest py-4 px-10 uppercase shadow-md rounded-full"
            type="button"
          >
            More About Us
          </button>
        </section>

        {/* Carousel Section */}
        <section
          className="relative w-full max-w-md md:max-w-lg lg:max-w-xl border border-[#ECECEC] shadow-md overflow-hidden rounded-md z-10"
          id="carousel"
        >
          <img
            alt={images[currentIndex].alt}
            className={`w-full h-auto transition-opacity duration-500 ease-in-out ${
              fade ? "opacity-0" : "opacity-100"
            }`}
            height="500"
            loading="lazy"
            src={images[currentIndex].src}
            width="800"
          />
          {/* Navigation Buttons */}
          <div className="absolute bottom-0 right-0 bg-[#2C3E50] flex items-center justify-center gap-6 px-6 py-4 cursor-pointer select-none">
            <button
              aria-label="Previous Image"
              className="focus:outline-none"
              type="button"
              onClick={handlePrevClick}
            >
              <i className="fas fa-chevron-left text-white text-lg"></i>
            </button>
            <button
              aria-label="Next Image"
              className="focus:outline-none"
              type="button"
              onClick={handleNextClick}
            >
              <i className="fas fa-chevron-right text-white text-lg"></i>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WeddingIntro;
