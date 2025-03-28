import { lazy, Suspense, useEffect, useState } from "react";
import Footer from "./components/layout/footer";
import Nav from "./components/layout/nav";
import { blogCardData } from "./db/mockdata";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Loading from "./loading";

// Lazy load the pages and components
const AboutUsPage = lazy(() => import("./pages/about-us/aboutUsPage"));
const BlogDetail = lazy(() => import("./pages/blog/blogDetail"));
const BlogsPage = lazy(() => import("./pages/blog/blogsPage"));
const ContactUsPage = lazy(() => import("./pages/contact-us/contactUsPage"));
const GetInTouch = lazy(() => import("./components/ui/contact/getInTouch"));
const Homepage = lazy(() => import("./pages/homepage/homepage"));
const ServicesPage = lazy(() => import("./pages/our-services/servicesPage"));
const OurWorks = lazy(() => import("./components/ui/our-work/ourWorks"));
const NotFound = lazy(() => import("./not-found"));

const App = () => {
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    const audio = document.getElementById(
      "main-hero-audio"
    ) as HTMLAudioElement | null;

    if (audio) {
      const playAudio = () => {
        audio.play().catch((error) => {
          console.log("Audio playback failed:", error);
        });
      };

      audio.addEventListener("canplay", () => {
        setAudioReady(true);
      });

      window.addEventListener("click", playAudio);
      window.addEventListener("touchstart", playAudio);

      return () => {
        window.removeEventListener("click", playAudio);
        window.removeEventListener("touchstart", playAudio);
      };
    } else {
      console.log("Audio element not found");
    }
  }, []);

  return (
    <>
      <audio
        id="main-hero-audio"
        className="hidden"
        autoPlay
        loop
        muted={false}
        src="/main-hero-sound.mp3"
      ></audio>
      <Router>
        <Suspense fallback={<Loading />}>
          <Main />
        </Suspense>
      </Router>
    </>
  );
};

const Main = () => {
  const location = useLocation();
  const isNotFoundPage =
    location.pathname === "/404" || location.pathname === "/*";

  return (
    <>
      {!isNotFoundPage && <Nav />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/works" element={<OurWorks />} />
        <Route path="blog" element={<BlogsPage />} />
        {blogCardData.map((key: any, index: any) => (
          <Route
            key={index}
            path={`/blog/${key.slug.replace(/\s+/g, "-")}`}
            element={
              <BlogDetail
                imgSrc={key.imgSrc}
                authorImg={key.authorImg}
                author={key.author}
                date={key.date}
                title={key.title}
              />
            }
          />
        ))}
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {!isNotFoundPage && <GetInTouch />}
      {!isNotFoundPage && <Footer />}
    </>
  );
};

export default App;
