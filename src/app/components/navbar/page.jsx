"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { throttle } from "lodash";

// Navigation links configuration
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

// Reusable Theme Toggle Button Component
const ThemeToggleButton = ({ isDarkTheme, toggleTheme, textColor }) => (
  <button
    onClick={toggleTheme}
    aria-label="Toggle theme"
    type="button"
    className="w-10 h-10 rounded-full bg-white/15 border border-white/20 hover:bg-white/25 transition"
  >
    <i className={`fas ${isDarkTheme ? "fa-sun" : "fa-moon"} ${textColor}`} />
  </button>
);

// Reusable "Plan Your Event" Button
const PlanEventButton = () => (
  <Link
    href="/plan-event"
    className="bg-[#BD8C7D] text-white rounded-lg px-4 py-2 font-semibold hover:bg-[#a46f5e] transition"
  >
    Plan Your Event
  </Link>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("dark-theme");
    setIsDarkTheme(savedTheme ? JSON.parse(savedTheme) : false);
  }, []);

  // Update theme and save preference
  useEffect(() => {
    localStorage.setItem("dark-theme", JSON.stringify(isDarkTheme));
    document.documentElement.classList.toggle("dark", isDarkTheme);
  }, [isDarkTheme]);

  // Handle scroll event: updates navbar style and section highlighter
  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 50);

      // Determine which section is active using its bounding rectangle
      const currentSection = navLinks.find(({ href }) => {
        const section = document.querySelector(href);
        if (!section) return false;
        const { top, height } = section.getBoundingClientRect();
        return top <= 80 && top + height > 80;
      });

      setActiveSection(currentSection ? currentSection.href : "");
    }, 150);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle function for dark theme
  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  // Common text color class
  const textColor = "text-white";

  // Compute desktop nav background classes based on scroll and theme
  const desktopNavClasses = clsx(
    "h-16 w-full px-4 md:px-8 flex justify-between items-center transition-all duration-300 backdrop-blur-md",
    {
      "bg-[#0A2342]/90 border-b border-white/10 shadow-md": isScrolled || isDarkTheme,
      "bg-white/20 border border-white/20 shadow-xl": !isScrolled && !isDarkTheme,
    }
  );

  // Compute mobile menu background classes (similar style rules as desktop)
  const mobileNavClasses = clsx(
    "md:hidden w-full px-4 md:px-8 py-4 backdrop-blur-md transition-all duration-300",
    {
      "bg-[#0A2342]/90 border-b border-white/10 shadow-md": isScrolled || isDarkTheme,
      "bg-white/20 border border-white/20 shadow-xl": !isScrolled && !isDarkTheme,
    }
  );

  return (
    <header className="fixed w-full top-0 left-0 z-50">
      {/* Desktop Navbar */}
      <nav className={desktopNavClasses}>
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className={`text-2xl font-bold tracking-wide ${textColor}`}>
            Elevate<span className="text-[#BD8C7D]">Events</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
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

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggleButton isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} textColor={textColor} />
          <PlanEventButton />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className={clsx("md:hidden p-2 rounded transition-colors", textColor)}
          aria-label="Toggle mobile menu"
          type="button"
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

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className={mobileNavClasses}>
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
            <ThemeToggleButton isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} textColor={textColor} />
            <PlanEventButton />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
