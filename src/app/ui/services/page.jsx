import React from 'react';

const services = [
  {
    title: 'Event Planning',
    description:
      'Comprehensive planning services tailored to your vision, timeline, and budget with attention to every detail.',
    icon: 'far fa-calendar-alt',
  },
  {
    title: 'Venue Selection',
    description:
      "Access to exclusive venues perfectly suited to your event's style, size, and atmosphere requirements.",
    icon: 'fas fa-map-marker-alt',
  },
  {
    title: 'Catering Excellence',
    description:
      'Partnering with top chefs and caterers to create unforgettable culinary experiences for your guests.',
    icon: 'fas fa-utensils',
  },
  {
    title: 'Photography & Video',
    description:
      'Capturing every precious moment with award-winning photographers and videographers.',
    icon: 'far fa-camera',
  },
  {
    title: 'Décor & Styling',
    description:
      'Creating immersive environments with bespoke décor, floral arrangements, and atmospheric lighting.',
    icon: 'fas fa-paint-brush',
  },
  {
    title: 'Entertainment',
    description:
      'Booking exceptional performers, musicians, and activities to keep your guests enthralled.',
    icon: 'fas fa-music',
  },
];

const ServicesPage = () => {
  return (
    <section className="w-full bg-[#FAF9F8] text-gray-700 px-4 md:px-8 py-16">
      <div className="text-center max-w-xl mx-auto mb-14">
        <p className="text-xs text-[#B79E71] font-semibold tracking-widest mb-2 uppercase">
          Our Expertise
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] leading-tight font-serif">
          Premium Services
        </h2>
        <p className="mt-2 text-center text-gray-600 text-sm md:text-base">
          Every detail meticulously planned and executed to create your perfect event experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <article key={index} className="bg-white rounded-lg p-6 shadow-sm w-full">
            <div className="w-10 h-10 bg-[#f9ede3] rounded-full flex items-center justify-center mb-4 text-[#B79E71]">
              <i className={`${service.icon} text-sm`}></i>
            </div>
            <h3 className="text-[#2C3E50] font-semibold text-lg mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{service.description}</p>
            <a
              href="#"
              className="inline-flex items-center text-sm font-semibold px-6 py-3 rounded-full bg-gradient-to-r from-[#2C3E50] to-[#22374A] text-white shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              Learn More <i className="fas fa-chevron-right ml-3 text-xs"></i>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServicesPage;
