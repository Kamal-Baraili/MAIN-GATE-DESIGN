import { Icon } from "@iconify/react/dist/iconify.js";

const ChairmanMessage = () => {
  return (
    <>
      <div className="w-11/12 mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative">
          <div className="w-full h-50 bg-gradient-to-b from-black via-black/50 to-transparent absolute top-0"></div>
          <div className="w-[14%] lg:w-[20%] h-[40vh] md:h-[60vh] lg:h-[70vh] bg-gradient-to-r from-black via-black/50 to-transparent absolute left-0"></div>

          <img
            className="h-[40vh] md:h-[60vh] lg:h-[70vh] object-cover rounded-lg"
            src="/homepage/about/chairman.jpg"
            alt=""
          />
          <div className="w-full h-50 bg-gradient-to-t from-black via-black/50 to-transparent absolute bottom-0"></div>
          <div className="w-[14%] lg:w-[20%] h-[40vh] md:h-[60vh] lg:h-[70vh] bg-gradient-to-l from-black via-black/50 to-transparent absolute top-0 right-0"></div>
        </div>
        <div>
          <h2 className="capitalize text-4xl md:text-5xl lg:text-6xl text-amber-50 tracking-wide">
            What our Founder & Chairperson has to say?
          </h2>
          <p className="py-5 text-zinc-400 text-sm sm:text-base">
            As we move forward in an ever-evolving world, it is with great pride
            that I share my reflections on our journey and the exciting road
            ahead. Our organization has always been driven by a passion for
            innovation, commitment to excellence, and a deep respect for the
            values that define us. <br />
            <br /> In the years ahead, we remain focused on delivering
            sustainable growth, embracing new opportunities, and fostering an
            environment where creativity and collaboration can flourish. Our
            dedicated team continues to be our greatest asset, and together, we
            will tackle challenges head-on and seize the opportunities that lie
            ahead. <br />
            <br /> Thank you for your trust, your partnership, and your
            commitment to our shared success. Together, we will continue to make
            a meaningful impact.
          </p>
          <div className="flex justify-between items-center">
            <div className="mt-4">
              <h3 className="text-xl text-zinc-400">Warm Regards,</h3>
              <h3 className="my-2 text-2xl text-zinc-300">John Doe</h3>
              <h4 className="italic text-zinc-300">Founder & Chairperson</h4>
            </div>
            <div className="w-1/3 my-2 flex justify-center gap-6">
              <span className="text-4xl text-[#3d5a98]">
                <Icon icon="basil:facebook-solid" />
              </span>
              <span className="text-4xl text-[#55acee]">
                <Icon icon="mdi:twitter" />
              </span>
              <span className="text-4xl">
                <Icon icon="skill-icons:instagram" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChairmanMessage;
