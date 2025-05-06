import React from 'react';

const BlogArticles = () => {
  return (
    <div className="bg-white font-['Playfair_Display']">
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="italic text-2xl text-gray-700">
          Articles from the Blog
        </p>
        <p className="text-xs text-[#b9a98a] tracking-widest mt-1 font-semibold">
          BLOG
        </p>
    

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-8 max-w-4xl mx-auto">
          {[
            {
              img: 'https://storage.googleapis.com/a1aa/image/1bf6beda-f240-4cad-d23b-c35327bdc4cb.jpg',
              date: 'JUL 27, 2016',
              title: 'An occasion that joins two hearts in a symphony',
              comments: '3 comments',
              color: '#9da56a',
            },
            {
              img: 'https://storage.googleapis.com/a1aa/image/c4a4c6bb-9346-430e-4017-b3f4417afcd2.jpg',
              date: 'JUL 18, 2016',
              title: 'The role of your bouquette in wedding compositions',
              comments: '1 comment',
              color: '#9da56a',
            },
            {
              img: 'https://storage.googleapis.com/a1aa/image/db17137d-105f-4cbe-91a8-291373d9f0ef.jpg',
              date: 'JUL 9, 2016',
              title: '10 reasons why you should hire a wedding planner',
              comments: '2 comments',
              color: '#d6bfa7',
            },
          ].map((article, index) => (
            <div className="max-w-xs" key={index}>
              <div className="border border-white relative">
                <img src={article.img} alt={article.title} className="w-full" height="180" width="320" />
                <div className="absolute inset-0 border border-white pointer-events-none" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase" style={{ color: article.color }}>
                {article.date}
              </p>
              <p className={`mt-1 text-sm leading-snug ${index === 2 ? 'font-semibold' : ''}`} style={{ color: article.color, fontStyle: 'italic' }}>
                {article.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                By Cindy Jefferson | {article.comments}
              </p>
            </div>
          ))}
        </div>

        <button
          className="mt-10 bg-[#9da56a] text-white text-xs font-semibold tracking-widest py-3 px-8 uppercase"
          style={{ letterSpacing: '0.1em' }}
        >
          MORE POSTS
        </button>
      </div>
    </div>
  );
};

export default BlogArticles;
