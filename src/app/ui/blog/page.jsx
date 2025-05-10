import React from 'react';

const BlogArticles = () => {
  const articles = [
    {
      img: 'https://storage.googleapis.com/a1aa/image/1bf6beda-f240-4cad-d23b-c35327bdc4cb.jpg',
      date: 'JUL 27, 2016',
      title: 'An occasion that joins two hearts in a symphony',
      comments: '3 comments',
    },
    {
      img: 'https://storage.googleapis.com/a1aa/image/c4a4c6bb-9346-430e-4017-b3f4417afcd2.jpg',
      date: 'JUL 18, 2016',
      title: 'The role of your bouquette in wedding compositions',
      comments: '1 comment',
    },
    {
      img: 'https://storage.googleapis.com/a1aa/image/db17137d-105f-4cbe-91a8-291373d9f0ef.jpg',
      date: 'JUL 9, 2016',
      title: '10 reasons why you should hire a wedding planner',
      comments: '2 comments',
    },
  ];

  return (
    <div className="bg-[#FAF9F8] font-['Playfair_Display'] text-[#2C3E50]">
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="italic text-2xl text-[#2C3E50]">
          Articles from the Blog
        </p>
        <p className="text-xs text-[#B79E71] tracking-widest mt-1 font-semibold">
          BLOG
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-8 max-w-4xl mx-auto">
          {articles.map((article, index) => (
            <div className="max-w-xs" key={index}>
              <div className="border border-[#2C3E50] relative">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50] to-transparent opacity-50" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase text-[#B79E71]">
                {article.date}
              </p>
              <p className="mt-1 text-sm leading-snug italic font-semibold text-[#2C3E50]">
                {article.title}
              </p>
              <p className="text-xs text-[#7A7A7A] mt-1">
                By Cindy Jefferson | {article.comments}
              </p>
            </div>
          ))}
        </div>

        <button
          className="mt-10 bg-[#2C3E50] hover:bg-[#22374A] text-white text-xs font-semibold tracking-widest py-3 px-8 uppercase rounded-full transition-all duration-300"
          style={{ letterSpacing: '0.1em' }}
        >
          MORE POSTS
        </button>
      </div>
    </div>
  );
};

export default BlogArticles;
