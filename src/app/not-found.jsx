"use client";

import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4 sm:px-10">
        <h1 className="text-8xl sm:text-9xl font-extrabold text-black tracking-tighter">
          404
        </h1>
        <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-black">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-md mx-auto">
          Oops! The page you’re looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block border border-black text-black rounded-full px-6 py-3 text-lg font-semibold hover:bg-black hover:text-white transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
