import React from "react";

const WorkingProcess = () => {
  return (
    <section className="bg-[#f7f9fa] text-[#0f1f3d] py-16 text-center w-full">
      <div className="px-6">
        <p className="text-[14px] font-semibold text-[#c48b6a] tracking-widest mb-2">
          OUR PROCESS
        </p>
        <h1 className="text-4xl font-bold mb-2 leading-tight font-['Merriweather']">
          How It Works
        </h1>
        <p className="text-base max-w-xl mx-auto mb-14">
          A simple yet comprehensive approach to bringing your vision to life.
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-12 sm:gap-0 w-full px-6">
          {[
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
          ].map(({ step, title, description }) => (
            <div
              key={step}
              className="flex flex-col items-center sm:items-center w-full sm:w-1/4"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full border border-[#f7d9b9] text-[#c48b6a] font-semibold shadow-[0_4px_8px_rgba(196,139,106,0.2)] mb-4 select-none font-['Merriweather']">
                {step}
              </div>
              <div className="border-t border-[#f7d9b9] w-full pt-2">
                <h3 className="font-semibold text-[#0f1f3d] mb-1 font-['Merriweather']">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-12 bg-[#0f1f3d] text-white font-semibold rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-shadow duration-300 font-['Open_Sans']">
          Start Your Journey
        </button>
      </div>
    </section>
  );
};

export default WorkingProcess;
