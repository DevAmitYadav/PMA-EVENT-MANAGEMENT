import React from "react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-zinc-900 text-gray-300 py-12">
      <div className="w-full px-8 mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
          {[
            {
              title: "Product",
              links: ["Overview", "Features", "Solutions", "Tutorials"],
            },
            {
              title: "Company",
              links: ["About us", "Careers", "Press", "News"],
            },
            {
              title: "Resources",
              links: ["Blog", "Newsletter", "Events", "Help center"],
            },
            {
              title: "Help Center",
              links: ["Discord", "Twitter", "Github", "Contact Us"],
            },
          ].map((section, index) => (
            <div key={index}>
              <p className="mb-3 text-lg font-semibold text-white">
                {section.title}
              </p>
              <ul>
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="block py-1 text-sm text-gray-400 hover:text-white transition duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between w-full pt-10 mt-12 border-t border-gray-700 md:flex-row">
          <p className="mb-4 text-sm text-gray-500 md:mb-0 text-center">
            © 2024{" "}
            <a
              href="https://material-tailwind.com/"
              className="hover:underline text-white"
            >
              Material Tailwind
            </a>
            . All Rights Reserved.
          </p>
          <div className="flex gap-4">
            {[
              "facebook",
              "instagram",
              "github",
              "twitter",
            ].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="text-gray-400 hover:text-white transition-opacity"
              >
                <i className={`fab fa-${icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
