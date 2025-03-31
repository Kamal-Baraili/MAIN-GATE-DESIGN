import { useLocation } from "react-router-dom";
import Button from "../../shared/button/button";

const About = () => {
  const location = useLocation();
  return (
    <>
      <div
        className={`-mt-20 lg:mt-20 pt-0 lg:pt-30 text-zinc-300 ${
          location.pathname == "/about" ? "pb-10 lg:pb-30" : "pb-30"
        }`}
      >
        <div className="w-11/12 mx-auto flex flex-col-reverse lg:flex-row justify-center gap-20 xl:gap-50">
          <div className="w-full lg:w-1/2 flex flex-col gap-3 items-start">
            <h4 className="text-lg md:text-xl text-primary">About Us</h4>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-amber-50 tracking-wide">
              Welcome To Main Gate Design
            </h2>
            <p className="text-sm md:text-base text-zinc-400">
              Our team of experienced professionals will work closely with you
              to understand your requirements and provide innovative solutions
              that align with your vision. With our expertise and commitment to
              quality, we assure you a flawless execution of the project and a
              main gate that, gives you peace of mind. Apart from being visually
              stunning, our main gates are also designed with security as a top
              priority. We incorporate advanced locking mechanisms.
            </p>
            <a className="mt-12" href="/about">
              {location.pathname !== "/about" && (
                <Button
                  text="Know More"
                  color="text-black"
                  bgColor="bg-amber-300"
                  src="/homepage/gate-icon.svg"
                  secondSrc="/btn-handle.png"
                />
              )}
            </a>
          </div>
          <div className="w-full lg:w-1/2 relative z-0">
            <img
              className="w-full h-[40vh] sm:h-[50vh] lg:h-full rounded-lg lg:rounded-2xl object-cover"
              src="/homepage/about/about-img.jpeg"
              alt=""
            />
            {/* <div className="p-2 lg:p-4 bg-black absolute left-0 -bottom-10 lg:-bottom-14 lg:-left-20 z-20 rounded-lg lg:rounded-2xl ">
              <img
                className="w-[30vw] h-20 sm:h-30 lg:w-[20vw] lg:h-50 rounded-lg lg:rounded-2xl object-cover"
                src="/homepage/about/about-img2.png"
                alt=""
              />
            </div>
            <div className="p-2 lg:p-4 bg-black absolute -top-10 lg:-top-20 -right-3 z-20 rounded-lg lg:rounded-2xl">
              <img
                className="w-[30vw] h-20 sm:h-30 lg:w-[20vw] lg:h-50 rounded-lg lg:rounded-2xl object-cover"
                src="homepage/about/about-img3.png"
                alt=""
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
