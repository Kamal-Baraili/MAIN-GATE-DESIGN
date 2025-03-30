import { lazy, Suspense, useEffect, useState } from "react";
import Footer from "./components/layout/footer";
import Nav from "./components/layout/nav";
import { blogCardData, WorksData } from "./db/mockdata";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Loading from "./loading";
import { Icon } from "@iconify/react/dist/iconify.js";
import OurWorkDetails from "./pages/our-work/ourWorkDetails";

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
  const [isClicked, setIsClicked] = useState<boolean>(true); // Control the audio play/pause
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const audio = document.getElementById(
      "main-hero-audio"
    ) as HTMLAudioElement | null;

    if (audio) {
      // Automatically play audio once it's ready
      audio.play().catch((error) => {
        console.log("Audio playback failed:", error);
        console.log(audioReady);
      });

      audio.addEventListener("canplay", () => {
        setAudioReady(true);
      });

      // Add event listeners for click or touch to toggle audio play/pause
      const playAudio = () => {
        if (audio) {
          if (isClicked) {
            audio.pause(); // Mute/Stop the audio
          } else {
            audio.play(); // Start playing the audio
          }
        }
      };

      window.addEventListener("click", playAudio);
      window.addEventListener("touchstart", playAudio);

      return () => {
        window.removeEventListener("click", playAudio);
        window.removeEventListener("touchstart", playAudio);
      };
    } else {
      console.log("Audio element not found");
    }
  }, [isClicked]); // Re-run when isClicked changes

  // Function to handle audio mute/unmute
  const toggleMute = () => {
    const audio = document.getElementById(
      "main-hero-audio"
    ) as HTMLAudioElement | null;

    if (audio) {
      setIsMuted(!isMuted);
      audio.muted = !isMuted;
    }
  };

  return (
    <>
      <div className="w-full lg:w-1/12 h-[4vh] xl:h-[6vh] bg-transparent opacity-35 hover:opacity-100 fixed bottom-0 right-0 z-30 ">
        <audio
          id="main-hero-audio"
          className="hidden relative"
          autoPlay
          loop
          muted={isMuted}
          src="/main-hero-sound.mp3"
        ></audio>
        <div
          className="cursor-pointer absolute -top-[60%] xl:-top-0 lg:bottom-10 right-[5%] xl:right-0 lg:left-10 z-40"
          onClick={toggleMute}
        >
          {isMuted ? (
            <Icon
              className="text-2xl text-primary"
              icon="streamline:volume-mute-solid"
            />
          ) : (
            <Icon
              className="text-2xl text-primary"
              icon="garden:volume-unmuted-fill-16"
            />
          )}
        </div>
      </div>
      <Router>
        <Suspense fallback={<Loading />}>
          <Main isClicked={isClicked} setIsClicked={setIsClicked} />
        </Suspense>
      </Router>
    </>
  );
};

const Main = ({ isClicked, setIsClicked }: any) => {
  const location = useLocation();
  const isNotFoundPage =
    location.pathname === "/404" || location.pathname === "/*";

  return (
    <>
      {!isNotFoundPage && <Nav />}
      <Routes>
        <Route
          path="/"
          element={
            <Homepage isClicked={isClicked} setIsClicked={setIsClicked} />
          }
        />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/works" element={<OurWorks />} />
        <Route path="blog" element={<BlogsPage />} />
        {blogCardData.map((item: any, index: any) => (
          <Route
            key={index}
            path={`/blog/${item.slug.replace(/\s+/g, "-")}`}
            element={
              <BlogDetail
                imgSrc={item.imgSrc}
                authorImg={item.authorImg}
                author={item.author}
                date={item.date}
                title={item.title}
              />
            }
          />
        ))}

        {WorksData.map((item: any, index: any) => (
          <Route
            key={index}
            path={`/works/${item.slug.replace(/\s+/g, "-")}`}
            element={<OurWorkDetails item={item} />}
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
