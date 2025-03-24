import ServicesCard from "../../components/shared/card/servicesCard";
import { servicesCardData } from "../../db/mockdata";

const ServicesPage = () => {
  return (
    <>
      <div className="w-11/12 mx-auto mt-5">
        <h1 className="pb-5 text-6xl text-amber-50 text-center tracking-wide">
          Our Services
        </h1>
        <div className="py-10 grid grid-cols-1 gap-y-10 border-t border-t-zinc-800">
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
