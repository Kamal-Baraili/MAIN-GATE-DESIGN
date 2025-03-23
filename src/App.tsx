import Footer from "./components/layout/footer";
import Nav from "./components/layout/nav";
import About from "./components/ui/about-us/about";
import { Services } from "./components/ui/our-services/services";
import OurWorks from "./components/ui/our-work/ourWorks";
import { blogCardData } from "./db/mockdata";
import BlogDetail from "./pages/blog/blogDetail";
import BlogsPage from "./pages/blog/blogsPage";
import ContactUsPage from "./pages/contact-us/contactUsPage";
import Homepage from "./pages/homepage/homepage";
import "./styles/index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Nav />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact us" element={<ContactUsPage />} />
        <Route path="/our work" element={<OurWorks />} />
        <Route path="blog" element={<BlogsPage />} />
        {blogCardData.map((key: any, index: any) => (
          <Route
            key={index}
            path={`/blog/${key.slug.replace(/\s+/g, "-")}`}
            element={
              <BlogDetail
                imgSrc={key.imgSrc}
                author={key.author}
                date={key.date}
                title={key.title}
              />
            }
          />
        ))}
      </Routes>

      <Footer />
    </>
  );
};

export default App;
