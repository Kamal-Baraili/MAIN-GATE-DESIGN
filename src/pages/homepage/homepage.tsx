import About from "../../components/ui/about-us/about";
import Contact from "../../components/ui/contact/getInTouch";
import Hero from "../../components/ui/homepage/Hero";
import MainGateHero from "../../components/ui/homepage/mainGateHero";
import { Services } from "../../components/ui/our-services/services";
import Testimonial from "../../components/ui/testimonial/testimonial";

const Homepage = () => {
  return (
    <>
      <MainGateHero />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Testimonial />
    </>
  );
};

export default Homepage;
