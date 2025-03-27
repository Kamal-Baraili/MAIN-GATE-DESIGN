import Footer from "./components/layout/footer";
import Nav from "./components/layout/nav";
import OurWorks from "./components/ui/our-work/ourWorks";
import { blogCardData } from "./db/mockdata";
import AboutUsPage from "./pages/about-us/aboutUsPage";
import BlogDetail from "./pages/blog/blogDetail";
import BlogsPage from "./pages/blog/blogsPage";
import ContactUsPage from "./pages/contact-us/contactUsPage";
import GetInTouch from "./components/ui/contact/getInTouch";
import Homepage from "./pages/homepage/homepage";
import ServicesPage from "./pages/our-services/servicesPage";
import "./styles/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  return (
    <>
      <audio className="hidden" controls autoPlay loop src="/main-hero-sound.mp3"></audio>
      <Nav />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact us" element={<ContactUsPage />} />
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
      </Routes>
      <GetInTouch />
      <Footer />
    </>
  );
};

export default App;
