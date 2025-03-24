import { ourWorksData } from "../../../db/mockdata";

const OurWorks = () => {
  return (
    <>
      <div className="py-10 border-t border-t-zinc-800 text-zinc-300">
        <div className="w-11/12 mx-auto flex justify-center gap-50">
          <div className="w-full mx-auto flex justify-between items-center">
            <div>
              <h4 className="text-7xl tracking-widest text-amber-50 text-center">
                Our Works
              </h4>
            </div>

            <p className="w-[48%]">
              We specialize in designing, manufacturing, and installing
              high-quality gates that combine security and style. From custom
              wrought iron to automated systems, we deliver reliable, tailored
              solutions to enhance the beauty and protection of any property.
            </p>
          </div>
        </div>

        <div className="w-11/12 mx-auto my-20 grid grid-cols-2 grid-rows-5 gap-x-10 gap-y-26 h-[250vh]">
          {ourWorksData.map((k: any, index: number) => (
            <div
              className={`${index === 0 && "row-span-2"} ${
                index === 3 && "col-span-2 row-span-2"
              }`}
              key={index}
            >
              <div
                className={`overflow-hidden h-full rounded-2xl 
                }`}
              >
                <img
                  className="w-full h-full opacity-60 hover:opacity-100 hover:scale-[1.1] transition-all duration-300 ease-in-out"
                  src={k.imgSrc}
                  alt=""
                />
              </div>
              <h3 className="px-2 pt-5 text-xl tracking-widest">{k.caption}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurWorks;
