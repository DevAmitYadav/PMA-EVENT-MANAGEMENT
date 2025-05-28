"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Expert Data
const expert2 = {
  name: "Yogesh Tripathi",
  role: "Hospitality & Venue Expert",
  image: "/frontend/images/Yogesh Tripathi.jpg",
  description:
    "With over 25 years of hospitality leadership across Ahmedabad and Mumbai, Yogesh Tripathi brings unmatched expertise in managing banquets, fine dining, and large-scale restaurant operations. Renowned for his time at Rajpath Club and The Grand Bhagwati, he has led high-performing service teams, optimized costs, and consistently elevated guest experiences. His sharp eye for event detail and dedication to excellence make every occasion unforgettable.",
};

// Highlight specific words
const HIGHLIGHTS = {
  "25": "text-blue-500",
  "Ahmedabad": "text-red-500",
  "rajpath": "text-green-600",
  "TGB": "text-purple-600",
  "Mumbai": "text-orange-600",
  "Yogesh Tripathi": "text-pink-600",
  "The Grand Bhagwati": "text-pink-600",
};

// Description parser
const getHighlightedDescription = (description) => {
  let result = description;
  Object.entries(HIGHLIGHTS).forEach(([word, className]) => {
    const regex = new RegExp(`\\b(${word})\\b`, "gi");
    result = result.replace(
      regex,
      `<span class="${className} font-semibold">$1</span>`
    );
  });
  return result;
};

const ExpertCard = ({ expert, imagePosition = "left" }) => {
  const [visibleChars, setVisibleChars] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const highlightedHTML = useMemo(
    () => getHighlightedDescription(expert.description),
    [expert.description]
  );

  useEffect(() => {
    setVisibleChars(0);
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev < expert.description.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 15);

    return () => clearInterval(timer);
  }, [expert.description]);

  useEffect(() => {
    if (visibleChars === expert.description.length) {
      setIsTypingComplete(true);
    }
  }, [visibleChars, expert.description.length]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="group relative bg-gray-100/50 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-8 overflow-hidden">
        <div
          className={`relative z-10 flex flex-col items-center gap-10 lg:flex-row ${
            imagePosition === "right" ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Expert Image */}
          <div className="lg:w-2/5 flex-shrink-0 flex justify-center">
            <motion.div
              className="relative w-60 h-60 md:w-72 md:h-72 rounded-full p-[3px] bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-500 shadow-lg hover:shadow-2xl transition-shadow duration-500"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Image
                src={expert.image}
                alt={expert.name}
                fill
                quality={100}
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover rounded-full border-4 border-gray-200"
              />
            </motion.div>
          </div>

          {/* Expert Info */}
          <div className="lg:w-3/5 text-center lg:text-left">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {expert.name}
            </h3>
            <span className="inline-block bg-orange-100/50 border border-orange-300 text-orange-600 rounded-full px-5 py-1 text-sm font-medium mb-6">
              {expert.role}
            </span>

            {isTypingComplete ? (
              <p
                className="text-gray-600 text-lg leading-relaxed min-h-[14rem] whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: highlightedHTML }}
              />
            ) : (
              <p className="text-gray-600 text-lg leading-relaxed min-h-[14rem] whitespace-pre-wrap">
                {expert.description.slice(0, visibleChars)}
                {visibleChars < expert.description.length && (
                  <span className="ml-1 text-yellow-400 animate-pulse">▋</span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OurExpertShowcase = () => {
  return (
    <section className="w-full bg-gray-100 py-24 px-4 font-sans">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          Meet Our Experts
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Learn from the industry's finest – expertise backed by decades of experience.
        </p>
      </div>

      <div className="space-y-16">
        <ExpertCard expert={expert2} imagePosition="left" />
      </div>
    </section>
  );
};

export default OurExpertShowcase;


// import React, { useState, useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import nlp from "compromise"; // using compromise for NLP processing

// const expert2 = {
//   name: "Yogesh Tripathi",
//   role: "Hospitality & Venue Expert",
//   image: "/frontend/images/Yogesh Tripathi.jpg",
//   description:
//     "With over 25 years of hospitality leadership across Ahmedabad and Mumbai, Yogesh Tripathi brings unmatched expertise in managing banquets, fine dining, and large-scale restaurant operations. Renowned for his time at Rajpath Club and The Grand Bhagwati, he has led high-performing service teams, optimized costs, and consistently elevated guest experiences. His sharp eye for event detail and dedication to excellence make every occasion unforgettable.",
// };

// // A helper function to return the description HTML with highlighted nouns.
// // This function uses compromise to identify all nouns, then wraps each in a span
// // that applies a modern text color.
// const getHighlightedDescription = (description) => {
//   const doc = nlp(description);
//   doc.nouns().replaceWith((match) => `<span class="text-sky-500">${match.text()}</span>`);
//   return doc.out("html");
// };

// const ExpertCard = ({ expert, imagePosition = "right" }) => {
//   const [visibleChars, setVisibleChars] = useState(0);
//   const [isTypingComplete, setIsTypingComplete] = useState(false);

//   // Memoize the processed description with highlighted nouns for performance.
//   const highlightedHTML = useMemo(
//     () => getHighlightedDescription(expert.description),
//     [expert.description]
//   );

//   useEffect(() => {
//     setVisibleChars(0);
//     setIsTypingComplete(false);
//     const timer = setInterval(() => {
//       setVisibleChars((prev) => {
//         if (prev < expert.description.length) return prev + 1;
//         clearInterval(timer);
//         return prev;
//       });
//     }, 15); // Typing effect speed
//     return () => clearInterval(timer);
//   }, [expert.description]);

//   useEffect(() => {
//     if (visibleChars === expert.description.length) {
//       setIsTypingComplete(true);
//     }
//   }, [visibleChars, expert.description.length]);

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { duration: 0.7, ease: "easeOut" },
//     },
//   };

//   return (
//     <motion.div
//       className="w-full max-w-6xl mx-auto"
//       variants={cardVariants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.3 }}
//     >
//       <div className="group relative bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-8 overflow-hidden">
//         <div
//           className={`relative z-10 flex flex-col items-center gap-10 lg:flex-row ${
//             imagePosition === "right" ? "lg:flex-row-reverse" : ""
//           }`}
//         >
//           {/* Image */}
//           <div className="lg:w-2/5 flex-shrink-0 flex justify-center">
//             <motion.div
//               className="relative w-60 h-60 md:w-72 md:h-72 rounded-full p-[3px] bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 shadow-lg hover:shadow-2xl transition-shadow duration-500"
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 200, damping: 20 }}
//             >
//               <img
//                 src={expert.image}
//                 alt={expert.name}
//                 className="w-full h-full object-cover rounded-full border-4 border-slate-800"
//               />
//             </motion.div>
//           </div>

//           {/* Text */}
//           <div className="lg:w-3/5 text-center lg:text-left">
//             <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
//               {expert.name}
//             </h3>
//             <span className="inline-block bg-green-400/10 border border-green-400/30 text-green-300 rounded-full px-5 py-1 text-sm font-medium mb-6">
//               {expert.role}
//             </span>

//             {isTypingComplete ? (
//               <p
//                 className="text-slate-300 text-lg leading-relaxed min-h-[14rem] whitespace-pre-wrap"
//                 dangerouslySetInnerHTML={{ __html: highlightedHTML }}
//               />
//             ) : (
//               <p className="text-slate-300 text-lg leading-relaxed min-h-[14rem] whitespace-pre-wrap">
//                 {expert.description.slice(0, visibleChars)}
//                 {visibleChars < expert.description.length && (
//                   <span className="ml-1 text-sky-500 animate-pulse">▋</span>
//                 )}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const OurExpertShowcase = () => {
//   return (
//     <section className="w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black py-24 px-4 font-sans">
//       <div className="text-center mb-16">
//         <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
//           Meet Our Experts
//         </h2>
//         <p className="text-lg text-slate-400 mt-4 max-w-2xl mx-auto">
//           Learn from the industry's finest – expertise backed by decades of experience.
//         </p>
//       </div>

//       <div className="space-y-16">
//         <ExpertCard expert={expert2} imagePosition="right" />
//       </div>
//     </section>
//   );
// };

// export default OurExpertShowcase;
