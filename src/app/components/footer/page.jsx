'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const SOCIAL_ICONS = ['facebook-f', 'instagram', 'linkedin-in'];
const QUICK_LINKS = ['Home', 'Services', 'Events', 'How It Works', 'Testimonials', 'Contact'];
const SERVICES = [
  'Wedding Planning',
  'Corporate Events',
  'Birthday Parties',
  'Anniversary Celebrations',
  'Venue Selection',
  'Catering Services',
];
const FOOTER_LINKS = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Use NEXT_PUBLIC_API_URL for flexibility
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setMessage('');

    try {
      // Use absolute URL pointing to your Express backend
      const response = await axios.post(`${API_URL}/api/subscribe`, { email: email.trim() });
      if (response.status === 200) {
        setMessage('✅ Thank you for subscribing! Please check your inbox for confirmation.');
        setEmail('');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage('❌ There was an error subscribing. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full bg-[#0B2545] text-[#A0AEC0] px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:space-x-20">
        {/* Logo & Intro */}
        <div className="md:w-1/4 mb-10 md:mb-0">
          <h2 className="text-white font-bold text-lg mb-4 font-serif">
            Elevate<span className="text-[#F97316]">Events</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-xs">
            Transforming visions into extraordinary experiences, one event at a time.
          </p>
          <div className="flex space-x-4 mt-6">
            {SOCIAL_ICONS.map((icon) => (
              <a
                key={icon}
                href="#"
                aria-label={`Follow us on ${icon}`}
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
            {QUICK_LINKS.map((item) => (
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
            {SERVICES.map((service) => (
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
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3 max-w-xs" aria-live="polite">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="bg-[#0B2545] border border-[#4A6A8A] rounded-lg py-2 px-4 text-[#718096] placeholder-[#718096] focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#F97316] to-[#FF6B6B] text-white font-semibold rounded-lg py-2 shadow-md hover:scale-105 transition-transform duration-300 disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
            {message && (
              <p
                className={`text-sm mt-2 ${
                  message.includes('error') || message.includes('❌') ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      <hr className="border-t border-[#1E3A5F] mt-10" />

      {/* Footer Bottom Links */}
      <div className="flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-8 text-xs mt-6">
        {FOOTER_LINKS.map((link) => (
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
