"use client";
import React, { useState, useCallback, memo } from "react";
import Image from "next/image";

// Static services data defined at the module level.
// Ensure the images are in the /public/images folder.
const services = [
  {
    title: "Event Planning",
    description:
      "Comprehensive planning services tailored to your vision, timeline, and budget with attention to every detail.",
    icon: "far fa-calendar-alt",
    moreDetails:
      "From conceptualization to execution, our team ensures every element of your event is meticulously planned. We offer personalized consultations, real-time updates, and a dedicated coordinator to bring your vision to life.",
    image: "/frontend/images/event-planning.jpg", // Updated path (in public folder)
    features: [
      { label: "Custom Timeline", icon: "fa fa-calendar" },
      { label: "Vendor Coordination", icon: "fa fa-handshake" },
      { label: "Budget Management", icon: "fa fa-dollar-sign" },
    ],
  },
  {
    title: "Venue Selection",
    description:
      "Access to exclusive venues perfectly suited to your event's style, size, and atmosphere requirements.",
    icon: "fas fa-map-marker-alt",
    moreDetails:
      "Benefit from our vast network of premium venues. We provide virtual tours, on-site consultations, and real-time availability checks to ensure you find the perfect location for your event.",
    image: "/frontend/images/venue-selection.jpg", // Updated path
    features: [
      { label: "Exclusive Venues", icon: "fa fa-star" },
      { label: "Location Expertise", icon: "fa fa-map" },
      { label: "Virtual Tours", icon: "fa fa-video" },
    ],
  },
  {
    title: "Catering Excellence",
    description:
      "Partnering with top chefs and caterers to create unforgettable culinary experiences for your guests.",
    icon: "fas fa-utensils",
    moreDetails:
      "Our catering services offer innovative menus and interactive tasting sessions. We source the finest ingredients to craft bespoke dishes, whether it’s an elegant plated dinner or an energetic buffet.",
    image: "/frontend/images/catering.jpg", // Updated path
    features: [
      { label: "Interactive Tasting", icon: "fa fa-mug-hot" },
      { label: "Custom Menus", icon: "fa fa-list-alt" },
      { label: "Premium Ingredients", icon: "fa fa-leaf" },
    ],
  },
  {
    title: "Photography & Video",
    description:
      "Capturing every precious moment with award-winning photographers and videographers.",
    icon: "far fa-camera",
    moreDetails:
      "Experience creative storytelling through photography and videography. Our professionals use state-of-the-art equipment to document your event with artistic flair and multiple perspectives.",
    image: "/frontend/images/photography.jpg", // Updated path
    features: [
      { label: "High-Resolution", icon: "fa fa-camera" },
      { label: "Instant Previews", icon: "fa fa-eye" },
      { label: "Creative Editing", icon: "fa fa-magic" },
    ],
  },
  {
    title: "Décor & Styling",
    description:
      "Creating immersive environments with bespoke décor, floral arrangements, and atmospheric lighting.",
    icon: "fas fa-paint-brush",
    moreDetails:
      "Transform your event space with innovative design. Our décor experts curate themes that reflect your style, using custom installations, floral artistry, and cutting-edge lighting solutions to set the perfect ambiance.",
    image: "/frontend/images/decor.jpg", // Updated path
    features: [
      { label: "Bespoke Themes", icon: "fa fa-paint-brush" },
      { label: "Floral Arrangements", icon: "fa fa-leaf" },
      { label: "Lighting Design", icon: "fa fa-lightbulb" },
    ],
  },
  {
    title: "Entertainment",
    description:
      "Booking exceptional performers, musicians, and activities to keep your guests enthralled.",
    icon: "fas fa-music",
    moreDetails:
      "Our entertainment packages include live performances, interactive shows, and curated playlists. Every act is top-rated and adaptable so that every moment remains unforgettable.",
    image: "/frontend/images/entertainment.jpg", // Updated path
    features: [
      { label: "Live Acts", icon: "fa fa-microphone" },
      { label: "Interactive Shows", icon: "fa fa-theater-masks" },
      { label: "Custom Playlists", icon: "fa fa-music" },
    ],
  },
];

// ServiceCard: Renders individual service information.
const ServiceCard = memo(({ service, onLearnMore }) => (
  <article className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="w-10 h-10 bg-[#f9ede3] rounded-full flex items-center justify-center mb-4 text-[#B79E71]">
      <i className={`${service.icon} text-sm`}></i>
    </div>
    <h3 className="text-[#2C3E50] font-semibold text-lg mb-2">{service.title}</h3>
    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onLearnMore(service);
      }}
      className="inline-flex items-center text-sm font-semibold px-6 py-3 rounded-full bg-gradient-to-r from-[#2C3E50] to-[#22374A] text-white shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
    >
      Learn More <i className="fas fa-chevron-right ml-3 text-xs"></i>
    </a>
  </article>
));

// ServiceModal: Renders a modal with additional service details.
const ServiceModal = memo(({ service, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/20 backdrop-blur-md z-50">
    <div className="bg-white/90 p-8 rounded-lg max-w-2xl mx-4 overflow-y-auto max-h-[90vh] shadow-xl custom-scrollbar">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-[#2C3E50]">{service.title}</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center bg-[#B79E71] hover:bg-[#A68C60] text-white rounded-full font-bold text-xl"
        >
          &times;
        </button>
      </div>
      <div className="mb-4">
        <Image
          src={service.image}
          alt={service.title}
          width={600}
          height={400}
          className="rounded-lg shadow-md object-cover"
          priority
        />
      </div>
      <p className="text-gray-700 mb-6">{service.moreDetails}</p>
      {service.features && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-[#2C3E50] mb-2">Key Features:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-gray-700">
                <i className={`${feature.icon} mr-2 text-[#B79E71]`}></i>
                <span>{feature.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={onClose}
        className="px-6 py-3 bg-gradient-to-r from-[#2C3E50] to-[#22374A] text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        Close
      </button>
    </div>
  </div>
));

// Main ServicesPage Component.
const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleLearnMore = useCallback((service) => {
    setSelectedService(service);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedService(null);
  }, []);

  return (
    <section className="w-full bg-[#FAF9F8] text-gray-700 px-4 md:px-8 py-16 relative">
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
          <ServiceCard key={index} service={service} onLearnMore={handleLearnMore} />
        ))}
      </div>

      {selectedService && <ServiceModal service={selectedService} onClose={closeModal} />}
    </section>
  );
};

export default ServicesPage;
