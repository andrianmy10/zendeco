import Header from './Header';
import Footer from './Footer';
import HeroView from './Hero/HeroView';
import BestProductView from './BestProduct/BestProductView'; 
import AboutView from './About/AboutView'; 
import RatingView from './Rating/RatingView';
import ContactView from './Contact/ContactView';

export default function LandingView() {
  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Header />
      
      <main className="flex-grow">
        <HeroView />
        <BestProductView />
        <AboutView />
        <RatingView />
        <ContactView />
      </main>

      <Footer />
    </div>
  );
}