import About from "../../components/ui/about-us/about";
import Hero from "../../components/ui/homepage/Hero";
import MainGateHero from "../../components/ui/homepage/mainGateHero";
import { Services } from "../../components/ui/our-services/services";
import Parallax from "../../components/ui/Parallax/parallax";
import Testimonial from "../../components/ui/testimonial/testimonial";
import Video from "../../components/ui/video/video";
import { Helmet } from "react-helmet";

const Homepage = ({isClicked, setIsClicked}: any) => {
  return (
    <>
      <Helmet>
        <title>
          Main Gate Design - your top choice for premium main gate designs in
          Nepal.
        </title>
        <meta
          name="description"
          content="Main Gate Design is the top leading company in Nepal, offering exceptional services and products across various industries."
        />
        <meta
          property="og:title"
          content="Main Gate Design - your top choice for premium main gate designs in Nepal."
        />
        <meta
          property="og:description"
          content="Discover Main Gate Design, the top leading company in Nepal, renowned for its excellence in multiple industries. Explore our innovative solutions and achievements."
        />
        <meta property="og:image" content="/og/home.png" />
        <meta
          property="og:image:alt"
          content="Main Gate Design - your top choice for premium main gate designs in Nepal."
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://main-gate-two.vercel.app/" />
        <meta
          name="keywords"
          content="Main Gate Design, Leading Company in Nepal, Innovation, Industries, Home"
        />
        <meta name="author" content="Main Gate Design" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Main Gate Design | Leading Industries in Nepal"
        />
        <meta
          property="twitter:description"
          content="Main Gate Design is the top leading company in Nepal, offering exceptional services and products across various industries."
        />
        <meta property="twitter:image" content="/og/home.png" />
        <link rel="canonical" href="https://main-gate-two.vercel.app/" />
      </Helmet>
      <div className="relative -top-21 z-70 main-gate-hero">
        <MainGateHero isClicked={isClicked} setIsClicked={setIsClicked} />
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
