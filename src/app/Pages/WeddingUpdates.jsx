import React from 'react';

const WeddingUpdates = () => {
  return (
    <>
      {/* Header Section */}
      <div className="bg-[#a9b675] flex flex-col md:flex-row items-center justify-center gap-6 py-6 px-4 md:px-20">
        <h2 className="text-white font-[Pacifico] text-xl md:text-2xl font-semibold italic whitespace-nowrap">
          Stay Tuned with Updates!
        </h2>
        <form className="flex items-center gap-4 w-full max-w-md">
          <label htmlFor="email" className="text-white text-sm font-semibold whitespace-nowrap">
            Enter Your Email
          </label>
          <input
            type="email"
            id="email"
            placeholder=""
            className="flex-grow border-b border-white bg-transparent text-white text-sm placeholder:text-white focus:outline-none"
          />
          <button
            type="submit"
            className="border border-white text-white text-xs font-semibold px-4 py-2 tracking-widest hover:bg-white hover:text-[#a9b675] transition"
          >
            SUBMIT
          </button>
        </form>
      </div>

      {/* Image Gallery */}
      <div className="flex flex-wrap">
        {[
          'https://storage.googleapis.com/a1aa/image/7ead868a-862a-4bae-1762-6fcaeed46131.jpg',
          'https://storage.googleapis.com/a1aa/image/4301bdd8-a9a4-4d52-4c31-c2cd2d8d8fdf.jpg',
          'https://storage.googleapis.com/a1aa/image/d6a9272e-6b85-411c-1294-c1d1a634c08d.jpg',
          'https://storage.googleapis.com/a1aa/image/55707a93-665e-4bf1-47d3-7b61a42a0fa3.jpg',
        ].map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Wedding image ${idx + 1}`}
            className="w-1/2 md:w-1/4 object-cover h-[200px] md:h-[300px]"
          />
        ))}
      </div>
    </>
  );
};

export default WeddingUpdates;
