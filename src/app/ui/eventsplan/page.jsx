"use client";
import React from "react";

const plans = [
  {
    title: "Bouquets",
    image:
      "https://storage.googleapis.com/a1aa/image/b8e207bf-027e-4785-a973-3ffff2041d2d.jpg",
    features: [
      "Bridal Bouquets",
      "Bridesmaids’ Bouquets",
      "Corsages",
      "Boutonnieres",
    ],
    price: "$399.00",
  },
  {
    title: "Ceremony+ Bouquets",
    image:
      "https://storage.googleapis.com/a1aa/image/46ea395a-e07d-4b99-772e-964eed795355.jpg",
    features: [
      "Bride’s & Bridemaids’ Bouquets",
      "Corsages & Boutonnieres",
      "Ceremony Main Altar",
      "Aisle Pew Markers",
    ],
    price: "$799.00",
  },
  {
    title: "Full Package",
    image:
      "https://storage.googleapis.com/a1aa/image/966e669f-6533-4659-8983-707a2e19133a.jpg",
    features: [
      "Bride’s & Bridemaids’ Bouquets",
      "Corsages & Boutonnieres",
      "Ceremony Decoration",
      "Tables & Cake Decoration",
    ],
    price: "$999.00",
  },
];

const EventsPlans = () => {
  return (
    <div className="bg-[#FAF9F8] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="text-center">
        <h2 className="text-4xl font-semibold text-[#2C3E50] font-[Great_Vibes] italic">
          Our Events Plans
        </h2>
        <p className="text-sm text-[#B79E71] tracking-widest mt-1 mb-3 font-semibold">
          PRICES
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={plan.image}
              alt={plan.title}
              className="w-full h-40 object-cover"
            />
            <div className="text-center px-6 py-8">
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
              <p className="text-sm text-[#2C3E50] mb-6">
                from{" "}
                <span className="font-semibold text-[#2C3E50]">
                  {plan.price}
                </span>
              </p>
              <button className="bg-[#2C3E50] hover:bg-[#22374A] text-white text-xs font-bold tracking-widest py-3 px-8 uppercase rounded-full transition-colors duration-300">
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPlans;
