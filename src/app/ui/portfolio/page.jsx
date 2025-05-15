"use client";
import React from "react";
import Image from "next/image";

// Define portfolio stories outside the component to avoid recreating on every render.
const portfolioStories = [
  {
    title: "Enchanted Garden Wedding",
    date: "June 2023",
    type: "Wedding",
    desc: "A romantic celebration with 200 guests in a transformed botanical garden setting.",
    img: "https://storage.googleapis.com/a1aa/image/fd98681d-90fb-4779-7f3b-757f20e02c4c.jpg",
  },
  {
    title: "Tech Summit 2023",
    date: "May 2023",
    type: "Corporate",
    desc: "A three-day industry conference for 500 attendees with interactive experiences.",
    img: "https://storage.googleapis.com/a1aa/image/c151bcfd-6ece-40f4-4fe7-7e98202b2752.jpg",
  },
  {
    title: "Milestone 50th Birthday",
    date: "April 2023",
    type: "Birthday",
    desc: "An elegant surprise celebration with 100 guests featuring live jazz and gourmet dining.",
    img: "https://storage.googleapis.com/a1aa/image/fb01d024-df38-4f03-390d-b96bb0374b08.jpg",
  },
];

const Portfolios = () => {
  return (
    <div className="w-full bg-[#2C3E50] text-white font-['Open_Sans']">
      <section className="px-6 sm:px-10 lg:px-20 py-16 text-center">
        <p className="text-[12px] text-[#B79E71] uppercase tracking-widest mb-3 font-semibold">
          Our Portfolio
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight font-['Merriweather']">
          Success Stories
        </h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base mb-16 text-gray-300">
          Explore our collection of meticulously crafted events that have created
          <br className="hidden sm:block" />
          lasting memories.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {portfolioStories.map((story, index) => (
            <article
              key={index}
              className="bg-[#32475B] rounded-xl shadow-xl overflow-hidden text-left transition-transform hover:scale-[1.02] duration-300"
            >
              {/* Use Next.js Image component within a relative container */}
              <div className="relative w-full h-52">
                <Image
                  src={story.img}
                  alt={story.title}
                  fill
                  className="object-cover rounded-t-xl"
                  loading="lazy"
                />
              </div>
              <div className="p-6 sm:p-7 md:p-8 space-y-4">
                <p className="text-xs text-[#B79E71] font-semibold uppercase">
                  {story.type}
                </p>
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-semibold text-lg leading-snug max-w-[70%]">
                    {story.title}
                  </h3>
                  <span className="text-xs text-white font-normal">
                    {story.date}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{story.desc}</p>
                <a
                  href="#"
                  className="text-[#B79E71] text-sm font-semibold inline-flex items-center hover:underline"
                >
                  View Gallery
                  <i className="fas fa-chevron-right ml-1 text-xs"></i>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Call-to-Action Button */}
        <div className="mt-16">
          <button
            type="button"
            className="text-[#B79E71] border border-[#B79E71] rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-[#B79E71] hover:text-[#2C3E50] transition-colors"
          >
            View All Events
          </button>
        </div>
      </section>
    </div>
  );
};

export default React.memo(Portfolios);
