import ServicesCard from "../../components/shared/card/servicesCard";
import { servicesCardData } from "../../db/mockdata";

const ServicesPage = () => {
  return (
    <>
      <div className="w-11/12 mx-auto mt-25">
        <header className="md:flex items-center gap-40">
          <h1 className="uppercase md:leading-[1] text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-amber-50 text-center md:text-left">
            Our Services
          </h1>
          <div className="md:flex justify-end items-center">
            <p className="w-full md:w-[70%] text-md md:text-lg lg:text-3xl text-center md:text-left mt-4 md:mt-0 font-light text-zinc-400 overflow-hidden">
              Main Gate Design offers custom gates, expert installation, and
              reliable repairs for enhanced security and style.
            </p>
          </div>
        </header>
        <div className="pt-30 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {servicesCardData.map((item: any, index: any) => (
            <ServicesCard key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
