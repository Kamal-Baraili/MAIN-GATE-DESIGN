import About from "../../components/ui/about-us/about";
import ChairmanMessage from "../../components/ui/chairman-message/chairmanMessage";
import Counter from "../../components/ui/countUp/countUp";
import OurTeam from "../../components/ui/our-team/ourTeam";
import Video from "../../components/ui/video/video";

const AboutUsPage = () => {
  return (
    <>
      <div className="mt-60 lg:mt-0">
        <About />
      </div>
      <Counter />
      <ChairmanMessage />
      <OurTeam />
      <Video />
    </>
  );
};

export default AboutUsPage;
