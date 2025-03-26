import ServicesCard from "../../components/shared/card/servicesCard";
import { servicesCardData } from "../../db/mockdata";

const ServicesPage = () => {
  return (
    <>
      <div className="w-11/12 mx-auto mt-25">
        <header className="flex items-center gap-40">
          <h1 className="uppercase leading-[1] text-7xl text-amber-50">
            Our Services
          </h1>
          <div className="flex justify-end items-center">
            <p className="text-3xl w-[70%] font-light overflow-hidden">
              Main Gate Design offers custom gates, expert installation, and
              reliable repairs for enhanced security and style.
            </p>
          </div>
        </header>
        <div className="py-30 grid grid-cols-1 gap-y-10">
          {servicesCardData.map((item: any, index: any) => (
            <div key={index}>
              <ServicesCard index={index} item={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
