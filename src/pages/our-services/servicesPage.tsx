import { useEffect } from "react";
import { HoverEffect } from "../../components/ui/hover-effect/cardHoverEffect";
import { servicesCardData } from "../../db/mockdata";

const ServicesPage = () => {
  useEffect(() => {
    // Scroll to top when the page is loaded
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="w-full mt-70">
        <header className="w-11/12 mx-auto mb-10">
          <h1 className="uppercase md:leading-[1] text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-amber-50">
            Our <span className="text-primary">Services</span>
          </h1>
          <div className="p-0">
            <p className="w-2/3 lg:w-3/11 mt-4 text-zinc-400 text-xl">
              Main Gate Design offers custom gates, expert installation, and
              reliable repairs for enhanced security and style.
            </p>
          </div>
        </header>
        <div className="">
          <HoverEffect items={servicesCardData} />
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
