"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  const navItems = [
    "HOME",
    "ABOUT",
    "FEATURES",
    "SHOP",
    "TEAM",
    "SERVICES",
    "BLOG",
    "CONTACTS",
  ];

  return (
    <div className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#121212] text-white text-sm flex justify-between items-center px-4 sm:px-6 md:px-10 h-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <i className="fas fa-phone-alt text-[#f9a825]"></i>
            <span>(123) 456-7890</span>
          </div>
          <div className="flex items-center space-x-1">
            <i className="fas fa-envelope text-[#f9a825]"></i>
            <span>info@company.com</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-xs sm:text-sm">
          {["facebook-f", "twitter", "instagram", "linkedin-in"].map((icon, i) => (
            <a key={i} className="hover:text-[#f9a825]" href="#">
              <i className={`fab fa-${icon}`} aria-hidden="true"></i>
            </a>
          ))}
          <a className="hover:text-[#f9a825] flex items-center" href="#">
            <i className="fas fa-user mr-1" aria-hidden="true"></i> Account
          </a>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-[#f7941d] px-4 sm:px-6 md:px-10 shadow-md">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a className="flex items-center space-x-2" href="#">
            <img
              src="https://placehold.co/32x32/orange/white?text=%E2%9A%A1"
              alt="Company logo"
              className="w-8 h-8"
            />
            <span className="text-white font-extrabold text-lg">COMPANY</span>
          </a>

          {/* Nav Links */}
          <ul className="hidden md:flex space-x-8 text-white font-semibold text-sm relative">
            {navItems.map((item) => (
              <li
                key={item}
                className="relative"
                onMouseEnter={() => item === "ABOUT" && setIsAboutHovered(true)}
                onMouseLeave={() => item === "ABOUT" && setIsAboutHovered(false)}
              >
                <button
                  className="uppercase flex items-center space-x-1 focus:outline-none"
                  aria-haspopup={item === "ABOUT" ? "true" : undefined}
                  aria-expanded={item === "ABOUT" && isAboutHovered ? "true" : "false"}
                >
                  <span>{item}</span>
                  {item === "ABOUT" && (
                    <i className="fas fa-chevron-down text-xs" aria-hidden="true"></i>
                  )}
                </button>

                {/* Dropdown */}
                {item === "ABOUT" && isAboutHovered && (
                  <ul className="absolute top-full left-0 w-44 bg-[#121212] rounded-md shadow-lg mt-2 z-40">
                    {["Company", "Team", "Careers"].map((subItem, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 hover:bg-[#f97316] cursor-pointer text-white"
                      >
                        {subItem}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-[#f9a825]">
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
            <button className="relative text-white hover:text-[#f9a825]">
              <i className="fas fa-shopping-cart" aria-hidden="true"></i>
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
