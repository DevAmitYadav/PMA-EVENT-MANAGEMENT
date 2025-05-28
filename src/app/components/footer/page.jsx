'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import Link from 'next/link';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink 
} from 'lucide-react';

const SOCIAL_LINKS = [
  { 
    icon: Facebook, 
    href: 'https://facebook.com/elevatevents', 
    label: 'Facebook',
    color: 'hover:text-blue-500' 
  },
  { 
    icon: Instagram, 
    href: 'https://instagram.com/elevatevents', 
    label: 'Instagram',
    color: 'hover:text-pink-500' 
  },
  { 
    icon: Linkedin, 
    href: 'https://linkedin.com/company/elevatevents', 
    label: 'LinkedIn',
    color: 'hover:text-blue-600' 
  },
];

const QUICK_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Events', href: '#events' },
  { name: 'How It Works', href: '#howitworks' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const SERVICES = [
  { name: 'Wedding Planning', href: '#planner' },
  { name: 'Event Planning', href: '#events' },
  { name: 'Exclusive Design', href: '#exclusivedesign' },
  { name: 'About Us', href: '#aboutus' },
  { name: 'Our Experts', href: '#expert' },
  { name: 'Upcoming Events', href: '#calendar' },
];

const FOOTER_LINKS = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
  { name: 'Cookie Policy', href: '/cookie-policy' },
];

const CONTACT_INFO = [
  { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: Mail, text: 'hello@elevatevents.com', href: 'mailto:hello@elevatevents.com' },
  { icon: MapPin, text: '123 Event Street, City, State 12345', href: 'https://maps.google.com/?q=123+Event+Street' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerOffset = 80; // Adjust based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      toast.error('Please enter your email address');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/subscribe`, { 
        email: trimmedEmail 
      });
      
      if (response.status === 200) {
        toast.success('Thank you for subscribing! Check your inbox for confirmation.');
        setEmail('');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      const errorMessage = error.response?.data?.message || 'Subscription failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full bg-gradient-to-br from-[#0B2545] to-[#1E3A5F] text-[#A0AEC0]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <a 
              href="#home" 
              onClick={(e) => handleSmoothScroll(e, '#home')}
              className="inline-block mb-4"
            >
              <h2 className="text-white font-bold text-2xl font-serif hover:text-[#F97316] transition-colors">
                Elevate<span className="text-[#F97316]">Events</span>
              </h2>
            </a>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Transforming visions into extraordinary experiences, one event at a time. Creating memories that last forever.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3 mb-6">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  className={`border border-[#4A6A8A] rounded-full w-10 h-10 flex items-center justify-center hover:border-white transition-all duration-300 group ${color}`}
                >
                  <Icon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              {CONTACT_INFO.map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center space-x-2 text-xs hover:text-white transition-colors group"
                >
                  <Icon size={14} className="text-[#F97316] group-hover:scale-110 transition-transform" />
                  <span>{text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 font-serif">Quick Links</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ name, href }) => (
                <li key={name}>
                  <a 
                    href={href}
                    onClick={(e) => handleSmoothScroll(e, href)}
                    className="text-sm hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group cursor-pointer"
                  >
                    <span>{name}</span>
                    <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 font-serif">Our Services</h3>
            <ul className="space-y-3">
              {SERVICES.map(({ name, href }) => (
                <li key={name}>
                  <a 
                    href={href}
                    onClick={(e) => handleSmoothScroll(e, href)}
                    className="text-sm hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group cursor-pointer"
                  >
                    <span>{name}</span>
                    <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 font-serif">Stay Updated</h3>
            <p className="text-sm mb-6 leading-relaxed">
              Subscribe to our newsletter for the latest event trends, tips, and exclusive offers.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#1E3A5F] border border-[#4A6A8A] rounded-lg py-3 px-4 pr-12 text-white placeholder-[#718096] focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-all"
                  required
                  disabled={loading}
                />
                <Mail size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#718096]" />
              </div>
              
              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full bg-gradient-to-r from-[#F97316] to-[#FF6B6B] text-white font-semibold rounded-lg py-3 px-4 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Subscribing...
                  </span>
                ) : (
                  'Subscribe Now'
                )}
              </button>
            </form>

            {/* Quick Access to Updates */}
            <div className="mt-6 pt-4 border-t border-[#1E3A5F]">
              <a 
                href="#updates"
                onClick={(e) => handleSmoothScroll(e, '#updates')}
                className="text-sm text-[#F97316] hover:text-white transition-colors flex items-center group cursor-pointer"
              >
                <span>View Latest Updates</span>
                <ExternalLink size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1E3A5F] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <p className="text-[#718096] text-sm">
              © {new Date().getFullYear()} Elevate Events. All rights reserved.
            </p>

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              {FOOTER_LINKS.map(({ name, href }) => (
                <Link 
                  key={name} 
                  href={href} 
                  className="hover:text-white transition-colors"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;