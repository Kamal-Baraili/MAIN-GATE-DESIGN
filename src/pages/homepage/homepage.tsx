import About from "../../components/ui/about-us/about";
import Hero from "../../components/ui/homepage/Hero";
import MainGateHero from "../../components/ui/homepage/mainGateHero";
import { Services } from "../../components/ui/our-services/services";
import Parallax from "../../components/ui/Parallax/parallax";
import Testimonial from "../../components/ui/testimonial/testimonial";
import Video from "../../components/ui/video/video";

const Homepage = () => {
  return (
    <>
      <div className="relative -top-21 z-100 main-gate-hero">
        <MainGateHero />
      </div>
      <div className="relative -top-21">
        <Hero />
      </div>
      <About />
      <Parallax />
      <Services />
      <Video />
      <Testimonial />
    </>
  );
};

export default Homepage;
