import HomePage from './Pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Planner from './Pages/CardPage';
import WeddingIntro from './Pages/WeddingIntro';
import ExclusiveDesign from './Pages/ExclusiveDesign';
import TestimonialCarousel from './Pages/TestimonialCarousel';
import EventsPlans from './Pages/EventsPlans';
import WeddingUpdates from './Pages/WeddingUpdates';
import BlogArticles from './Pages/BlogArticles';
import EnquiryForm from './Pages/EnquiryForm';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
      <HomePage />
      <Planner />
      <WeddingIntro />
      <ExclusiveDesign />
      <TestimonialCarousel />
      <EventsPlans />
      <WeddingUpdates />
      <BlogArticles />
      <EnquiryForm />
    </main>

      <Footer/>
    </>
  );
}
