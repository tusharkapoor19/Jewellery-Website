import TopBar from "../../components/TopBar/TopBar";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
// import SearchSection from "../../components/SearchSection/SearchSection";
import Collections from "../../components/Collections/Collections";
import FeaturedCollections from "../../components/FeaturedCollections/FeaturedCollections";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import SignatureBanner from "../../components/SignatureBanner/SignatureBanner";
import Testimonials from "../../components/Testimonials/Testimonials";
import VideoLookbook from "../../components/VideoLookbook/VideoLookbook";
import Newsletter from "../../components/Newsletter/Newsletter";
import Chatbot from "../../components/Chatbot/Chatbot";
import Footer from "../../components/Footer/Footer";
const Home = () => {
  return (
    <>
      <TopBar />
      <Navbar />
      <Hero />
       {/* <SearchSection /> */}
      <Collections />
      <FeaturedCollections />
      <NewArrivals />
      <SignatureBanner />
      <Testimonials />
      <VideoLookbook />
      <Newsletter />
      <Chatbot />
      <Footer />
    </>
  );
};

export default Home;