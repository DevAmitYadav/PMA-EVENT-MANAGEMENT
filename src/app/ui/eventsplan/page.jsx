"use client";
import React from "react";
import Image from "next/image";

// Data for event plans
const plans = [
  {
    title: "Birthday Celebration",
    image: "/frontend/images/birthday26.jpg",
    features: [
      "Theme-based Balloon Decor",
      "Customized Cake Table Setup",
      "Welcome Arch & Entry Decor",
      "Return Gift Arrangement",
    ],
    price: "₹4,999",
  },
  {
    title: "Reception Package",
    image: "/frontend/images/reception24.jpg",
    features: [
      "Stage Floral Decoration",
      "Photo Booth Setup",
      "Entrance Arch & Lighting",
      "Table Centerpieces",
    ],
    price: "₹14,999",
  },
  {
    title: "Navratri Setup",
    image: "/frontend/images/navratri25.jpg",
    features: [
      "Garba Stage & Decor",
      "LED Lighting & Sound",
      "Entry Gate Theming",
      "Traditional Backdrops",
    ],
    price: "₹11,999",
  },
  {
    title: "Wedding Package",
    image: "/frontend/images/wedding23.jpg",
    features: [
      "Mandap Decoration",
      "Bride & Groom Entry Setup",
      "Haldi & Mehndi Decor",
      "Reception Stage & Florals",
    ],
    price: "₹29,999",
  },
];

// Subcomponent for a single plan card
const PlanCard = ({ plan }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 flex flex-col">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={plan.image}
          alt={plan.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-grow text-center px-6 py-8 flex flex-col justify-between">
        <div>
          <h3 className="text-xl text-[#2C3E50] font-[Great_Vibes] italic mb-4">
            {plan.title}
          </h3>
          <ul className="text-sm text-[#2C3E50] space-y-2 mb-6">
            {plan.features.map((item, i) => (
              <li
                key={i}
                className="border-b border-gray-200 pb-1 last:border-none"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-[#2C3E50] mb-6">
            from{" "}
            <span className="font-semibold text-[#2C3E50]">
              {plan.price}
            </span>
          </p>
          <button
            type="button"
            className="bg-[#2C3E50] hover:bg-[#22374A] text-white text-xs font-bold tracking-widest py-3 px-8 uppercase rounded-full transition-colors duration-300"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

const EventsPlans = () => {
  return (
    <section className="bg-[#FAF9F8] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="text-center">
        <h2 className="text-4xl font-semibold text-[#2C3E50] font-[Great_Vibes] italic">
          Our Events Plans
        </h2>
        <p className="text-sm text-[#B79E71] tracking-widest mt-1 mb-3 font-semibold">
          PRICES
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {plans.map((plan, idx) => (
          <PlanCard key={idx} plan={plan} />
        ))}
      </div>
    </section>
  );
};

export default React.memo(EventsPlans);
