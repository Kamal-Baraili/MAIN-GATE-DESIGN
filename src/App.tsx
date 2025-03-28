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
import { Icon } from "@iconify/react/dist/iconify.js";

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

  return (
    <>
      <div className="w-1/12 h-[20vh] bg-transparent fixed bottom-0 right-0 z-30 ">
        <audio
          id="main-hero-audio"
          className="hidden relative"
          autoPlay
          loop
          muted={isClicked ? true : false}
          src="/main-hero-sound.mp3"
        ></audio>
        <div
          className="cursor-pointer absolute bottom-20 z-40"
          onClick={(prev) => {
            setIsClicked(!prev);
            console.log("clicked");
          }}
        >
          {isClicked ? (
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
