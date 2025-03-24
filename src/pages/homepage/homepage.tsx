import About from "../../components/ui/about-us/about";
import GetInTouch from "../../components/ui/contact/getInTouch";
import Hero from "../../components/ui/homepage/Hero";
import MainGateHero from "../../components/ui/homepage/mainGateHero";
import { Services } from "../../components/ui/our-services/services";
import Parallax from "../../components/ui/Parallax/parallax";
import Testimonial from "../../components/ui/testimonial/testimonial";
import Video from "../../components/ui/video/video";

const Homepage = () => {
  return (
    <>
      <MainGateHero />
      <Hero />
      <About />
      <Parallax />
      <Services />
      <Video />
      <Testimonial />
      <GetInTouch />
    </>
  );
};

export default Homepage;
