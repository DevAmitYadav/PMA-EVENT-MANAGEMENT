"use client";
import Link from "next/link";
import Image from "next/image";

// Component to render the full-screen background image
const BackgroundImage = () => (
  <div className="absolute inset-0">
    <Image
      src="/frontend/images/home.jpg"
      alt="Elegant wedding event"
      fill
      className="object-cover brightness-50"
      priority
    />
  </div>
);

// Component for the scroll down indicator
const ScrollDownIndicator = () => (
  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs">
    <svg
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={3}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);

// Main HeroSection component
const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <BackgroundImage />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 md:pt-40 pb-32 max-w-6xl mx-auto">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight max-w-5xl drop-shadow-lg">
          Crafting Moments That <br />
          <span className="text-[#C4998C]">Last a Lifetime</span>
        </h1>
        <p className="text-white text-sm sm:text-base mt-6 max-w-xl mx-auto leading-relaxed">
          Premium event planning and management for your most cherished occasions.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#contact"
            className="bg-[#C4998C] text-white font-semibold rounded-full px-8 py-3 transition transform hover:bg-[#a37868] hover:scale-105"
          >
            Plan Your Event
          </Link>
          <Link
            href="#services"
            className="border border-white text-white font-semibold rounded-full px-8 py-3 transition transform hover:bg-white/10 hover:scale-105"
          >
            Explore Services
          </Link>
        </div>
      </main>

      {/* Scroll Down Indicator */}
      <ScrollDownIndicator />
    </section>
  );
};

export default HeroSection;
