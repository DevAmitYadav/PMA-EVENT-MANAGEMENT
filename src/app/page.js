"use client";

import Navbar from './components/navbar/page';
import Footer from './components/footer/page';
import HomePage from './Home/page';
import Planner from './ui/planner/page';
import WeddingIntro from './ui/weddingintro/page';
import ExclusiveDesign from './ui/exclusivedesign/page';
import TestimonialCarousel from './ui/testimonial/page';
import EventsPlans from './ui/eventsplan/page';
import WeddingUpdates from './ui/weddingupdates/page';
import BlogArticles from './ui/blog/page';
import EnquiryForm from './ui/inquiry/page';
import WorkingProcess from './ui/workingprocess/page';
import ServicesPage from './ui/services/page';
import Portfolios from './ui/portfolio/page';
import UpcomingEvents from './ui/eventscalendar/page';
import { Toaster } from 'sonner';

export default function Home() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <section id="home" className="scroll-mt-16"><HomePage /></section>
        <section id="planner" className="scroll-mt-16"><Planner /></section>
        <section id="aboutus" className="scroll-mt-16"><WeddingIntro /></section>
        <section id="exclusivedesign" className="scroll-mt-16"><ExclusiveDesign /></section>
        <section id="events" className="scroll-mt-16"><EventsPlans /></section>
        <section id="updates" className="scroll-mt-16"><WeddingUpdates /></section>
        <section id="services" className="scroll-mt-16"><ServicesPage /></section>
        <section id="howitworks" className="scroll-mt-16"><WorkingProcess /></section>
        <section id="testimonials" className="scroll-mt-16"><TestimonialCarousel /></section>
        {/* <section id="blog" className="scroll-mt-16"><BlogArticles /></section> */}
        <section id="calendar" className="scroll-mt-16"><UpcomingEvents /></section>
        <section id="contact" className="scroll-mt-16"><EnquiryForm /></section>
      </main>
      <Footer />
    </>
  );
}
