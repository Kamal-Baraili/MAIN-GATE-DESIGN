import About from "../../components/ui/about-us/about";
import ChairmanMessage from "../../components/ui/chairman-message/chairmanMessage";
import Counter from "../../components/ui/countUp/countUp";
import OurTeam from "../../components/ui/our-team/ourTeam";

const AboutUsPage = () => {
  return (
    <>
      <About />
      <Counter />
      <ChairmanMessage />
      <OurTeam />
    </>
  );
};

export default AboutUsPage;
