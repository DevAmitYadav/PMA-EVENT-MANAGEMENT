"use client";
import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Consultation",
    description:
      "We start with understanding your vision, preferences, and requirements through an in-depth consultation.",
  },
  {
    step: "02",
    title: "Proposal",
    description:
      "Our team crafts a detailed proposal including design concepts, timeline, and budget options.",
  },
  {
    step: "03",
    title: "Planning",
    description:
      "Upon approval, we handle all logistics, vendor coordination, and detailed planning for your event.",
  },
  {
    step: "04",
    title: "Execution",
    description:
      "Our team oversees every aspect of your event, ensuring flawless execution and unforgettable experiences.",
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const badgeColors = ["#D32F2F", "#388E3C", "#1976D2", "#FBC02D"];

const EnhancedArrow = ({ delay = 0 }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <defs>
      <linearGradient id="arrowGradient" x1="0" y1="12" x2="24" y2="12">
        <stop offset="0%" stopColor="#D32F2F" />
        <stop offset="100%" stopColor="#D32F2F" />
      </linearGradient>
    </defs>
    <motion.path
      d="M5 12h14"
      stroke="url(#arrowGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        delay: delay,
        duration: 0.5,
        ease: "easeInOut",
      }}
    />
    <motion.path
      d="M13 6l6 6-6 6"
      stroke="url(#arrowGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: delay + 0.5,
        duration: 0.3,
        ease: "easeInOut",
      }}
    />
  </motion.svg>
);

const WorkingProcess = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] py-20 px-6 sm:px-12 lg:px-20 overflow-hidden">
      {/* Decorative Blur Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[25%] left-[10%] w-72 h-72 bg-[#c48b6a] opacity-20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-64 h-64 bg-[#0f1f3d] opacity-20 rounded-full blur-[80px]" />
      </div>

      {/* Section Header */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-sm font-semibold text-[#c48b6a] uppercase mb-3 tracking-widest">
          Our Process
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-[#0f1f3d] mb-4 font-['Merriweather']">
          How It Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
          A smooth, modern process to bring your vision to life — seamlessly.
        </p>
      </motion.div>

      {/* Step Cards */}
      <div className="relative z-10 mt-16 flex flex-col sm:flex-row gap-10 sm:gap-6 justify-between items-center">
        {steps.map((step, index) => {
          const badgeColor = badgeColors[index % badgeColors.length];
          return (
            <React.Fragment key={step.step}>
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                variants={stepVariants}
                viewport={{ once: true, amount: 0.3 }}
                className="relative bg-white/40 backdrop-blur-md border border-[#f7d9b9] rounded-2xl px-6 py-8 w-full sm:w-[23%] text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{
                    backgroundColor: badgeColor,
                    color: "#ffffff",
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-14 h-14 mx-auto rounded-full border-4 flex items-center justify-center font-bold text-lg glowing-circle mb-4"
                  style={{
                    borderColor: badgeColor,
                    color: badgeColor,
                    backgroundColor: "white",
                  }}
                >
                  {step.step}
                </motion.div>
                <h3 className="mt-4 text-lg font-semibold text-[#0f1f3d] font-['Merriweather']">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Render the arrow between cards */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block">
                  <EnhancedArrow delay={index * 0.2 + 0.3} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* CTA Button */}
      <div className="relative z-10 text-center mt-16">
        <motion.button
          className="bg-[#0f1f3d] text-white font-medium rounded-full px-8 py-3 shadow-md hover:shadow-lg hover:bg-[#1a2d50] transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          Start Your Journey
        </motion.button>
      </div>

      {/* Glowing Animation */}
      <style>{`
        .glowing-circle {
          animation: glow 2s infinite ease-in-out;
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 0px rgba(196,139,106,0.3);
          }
          50% {
            box-shadow: 0 0 14px rgba(196,139,106,0.6);
          }
        }
      `}</style>
    </section>
  );
};

export default React.memo(WorkingProcess);
