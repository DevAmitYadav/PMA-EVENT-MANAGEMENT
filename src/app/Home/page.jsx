"use client";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <img
        alt="Elegant wedding event"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2070&q=80"
        width="1920"
        height="1080"
      />

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 md:pt-[180px] pb-32 max-w-6xl mx-auto">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight max-w-5xl drop-shadow-lg">
          Crafting Moments That <br />
          <span className="text-[#C4998C]">Last a Lifetime</span>
        </h1>
        <p className="text-white text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
          Premium event planning and management for your most cherished occasions.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#contact"
            className="bg-[#C4998C] text-white font-semibold rounded-full px-8 py-3 transition hover:bg-[#a37868] transform hover:scale-105"
          >
            Plan Your Event
          </Link>
          <Link
            href="#services"
            className="border border-white text-white font-semibold rounded-full px-8 py-3 hover:bg-white/10 transition transform hover:scale-105"
          >
            Explore Services
          </Link>
        </div>
      </main>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs">
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
