import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


// Load fonts with CSS variable setup
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Gatherings Event",
  description: "A beautiful flower event landing page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#d9c9bc] text-black`}
      >
        {/* Optional wrapper div */}
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
