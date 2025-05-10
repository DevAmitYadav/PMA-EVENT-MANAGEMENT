import React from 'react';

const Planner = () => {
  return (
    <div className="bg-[#FAF9F8] text-[#2C3E50] min-h-screen font-['Inter']">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-light mb-3 font-['Great_Vibes'] text-[#2C3E50]">
          Let's Plan Your Perfect Wedding
        </h1>
        <p className="text-sm text-[#2C3E50] tracking-widest font-semibold uppercase mb-3">
          Welcome
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            {
              title: 'Bouquets & Style',
              button: 'Order Now',
              img: 'https://storage.googleapis.com/a1aa/image/43f5a7de-3c6c-421a-ea9b-cf5a8b782c63.jpg',
            },
            {
              title: 'Wedding Planning',
              button: 'Shop Now',
              img: 'https://storage.googleapis.com/a1aa/image/f04c1570-59ec-486b-48f0-873feea299a3.jpg',
            },
            {
              title: 'Catering & Decoration',
              button: 'Shop Now',
              img: 'https://storage.googleapis.com/a1aa/image/07c02782-1030-41d4-99dc-577f6118b713.jpg',
            },
          ].map((item, i) => (
            <div key={i}>
              <div className="border border-[#ECECEC] shadow-md p-1 rounded-md">
                <img src={item.img} alt={item.title} className="w-full rounded-sm" />
              </div>
              <p className="mt-4 text-lg italic text-[#2C3E50]">{item.title}</p>
              <button className="mt-6 bg-[#2C3E50] hover:bg-[#22374A] transition text-white text-xs font-semibold tracking-widest py-3 px-8 rounded-md shadow">
                {item.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planner;
