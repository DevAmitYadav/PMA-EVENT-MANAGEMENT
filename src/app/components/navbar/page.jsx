"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { throttle } from "lodash";

// Define nav items in proper page order (based on layout you shared)
const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#aboutus" },
  { name: "Services", href: "#services" },
  { name: "How It Works", href: "#howitworks" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Blog", href: "#blog" },
  { name: "Calendar", href: "#calendar" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Theme: Load from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("dark-theme");
    setIsDarkTheme(savedTheme ? JSON.parse(savedTheme) : false);
  }, []);

  // Theme: Save to localStorage and toggle class
  useEffect(() => {
    localStorage.setItem("dark-theme", JSON.stringify(isDarkTheme));
    document.documentElement.classList.toggle("dark", isDarkTheme);
  }, [isDarkTheme]);

  // Scroll handling with throttle
  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 50);

      const current = navLinks.find(({ href }) => {
        const section = document.querySelector(href);
        if (!section) return false;
        const { top, height } = section.getBoundingClientRect();
        return top <= 80 && top + height > 80;
      });

      setActiveSection(current ? current.href : "");
    }, 150); // Throttle every 150ms

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  const textColor = "text-white";
  const navBg = clsx(
    "h-16 w-full px-4 md:px-8 flex justify-between items-center transition-all duration-300 backdrop-blur-md",
    {
      "bg-[#0A2342]/90 border-b border-white/10 shadow-md": isScrolled || isDarkTheme,
      "bg-white/20 border border-white/20 shadow-xl": !isScrolled && !isDarkTheme,
    }
  );

  return (
    <header className="fixed w-full top-0 left-0 z-50">
      <nav className={navBg}>
        {/* Brand Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className={`text-2xl font-bold tracking-wide ${textColor}`}>
            Elevate<span className="text-[#BD8C7D]">Events</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ name, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  textColor,
                  "transition-colors pb-1",
                  activeSection === href
                    ? "font-semibold border-b-2 border-[#FFF100]"
                    : "hover:text-[#FFF100] hover:border-b-2 hover:border-[#FFF100] border-transparent"
                )}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-full bg-white/15 border border-white/20 hover:bg-white/25 transition"
          >
            <i className={`fas ${isDarkTheme ? "fa-sun" : "fa-moon"} ${textColor}`} />
          </button>
          <Link
            href="/plan-event"
            className="bg-[#BD8C7D] text-white rounded-lg px-4 py-2 font-semibold hover:bg-[#a46f5e] transition"
          >
            Plan Your Event
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={clsx("md:hidden p-2 rounded transition-colors", textColor)}
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={clsx(
            "md:hidden w-full px-4 md:px-8 py-4 backdrop-blur-md transition-all duration-300",
            isScrolled || isDarkTheme
              ? "bg-[#0A2342]/90 border-b border-white/10 shadow-md"
              : "bg-white/20 border border-white/20 shadow-xl"
          )}
        >
          <ul className="flex flex-col space-y-3">
            {navLinks.map(({ name, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={clsx(
                    "block transition-colors pb-1",
                    activeSection === href
                      ? "font-semibold border-b-2 border-[#FF6B6B]"
                      : "hover:text-[#FF6B6B]",
                    textColor
                  )}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-10 h-10 rounded-full bg-white/15 border border-white/20 hover:bg-white/25 transition"
            >
              <i className={`fas ${isDarkTheme ? "fa-sun" : "fa-moon"} ${textColor}`} />
            </button>
            <Link
              href="/plan-event"
              className="bg-[#BD8C7D] text-white rounded-lg px-4 py-2 font-semibold hover:bg-[#a46f5e] transition"
            >
              Plan Your Event
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
