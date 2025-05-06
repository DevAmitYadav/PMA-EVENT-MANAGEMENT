import React from 'react';

const EnquiryForm = () => {
  return (
    <div className="bg-[#fdfaf6] min-h-[60vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Get in Touch
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Name, Email, Phone */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9da56a]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9da56a]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                placeholder="+1 234 567 8901"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9da56a]"
              />
            </div>
          </div>

          {/* Right Side - Subject, Message */}
          <div className="space-y-6">
            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="Enquiry subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9da56a]"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9da56a] resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#9da56a] hover:bg-[#8b9859] text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300"
              >
                Submit Enquiry
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
