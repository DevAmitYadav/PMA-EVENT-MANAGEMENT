import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0B2545] text-[#A0AEC0] px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:space-x-20">
        {/* Logo and Intro */}
        <div className="md:w-1/4 mb-10 md:mb-0">
          <h2 className="text-white font-bold text-lg mb-4 font-serif">
            Elevate<span className="text-[#F97316]">Events</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-xs">
            Transforming visions into extraordinary experiences, one event at a time.
          </p>
          <div className="flex space-x-4 mt-6">
            {["facebook-f", "instagram", "linkedin-in"].map((icon) => (
              <a
                key={icon}
                href="#"
                aria-label={icon}
                className="border border-[#A0AEC0] rounded-full w-8 h-8 flex items-center justify-center hover:text-white hover:border-white transition"
              >
                <i className={`fab fa-${icon} text-sm`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/5 mb-10 md:mb-0">
          <h3 className="text-white font-bold text-sm mb-4 font-serif">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Services", "Events", "How It Works", "Testimonials", "Contact"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="md:w-1/5 mb-10 md:mb-0">
          <h3 className="text-white font-bold text-sm mb-4 font-serif">Our Services</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Wedding Planning", "Corporate Events", "Birthday Parties",
              "Anniversary Celebrations", "Venue Selection", "Catering Services"
            ].map((service) => (
              <li key={service}>
                <a href="#" className="hover:text-white transition">{service}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:w-1/4">
          <h3 className="text-white font-bold text-sm mb-4 font-serif">Newsletter</h3>
          <p className="text-sm mb-4 max-w-xs">
            Subscribe to our newsletter for the latest event trends and tips.
          </p>
          <form className="flex flex-col space-y-3 max-w-xs">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-[#0B2545] border border-[#4A6A8A] rounded-lg py-2 px-4 text-[#718096] placeholder-[#718096] focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#F97316] to-[#FF6B6B] text-white font-semibold rounded-lg py-2 shadow-md hover:scale-105 transition-transform duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <hr className="border-t border-[#1E3A5F] mt-10" />

      {/* Footer Links */}
      <div className="flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-8 text-xs mt-6">
        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
          <a key={link} href="#" className="hover:text-white transition">{link}</a>
        ))}
      </div>

      <p className="text-[#718096] text-xs mt-6 text-center md:text-left">
        © 2025 Elevate Events. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
