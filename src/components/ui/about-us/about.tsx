import { useLocation } from "react-router-dom";
import Button from "../../shared/button/button";

const About = () => {
  const location = useLocation();
  return (
    <>
      <div
        className={`-mt-20 lg:mt-60 pt-0 lg:pt-10 text-zinc-300 ${
          location.pathname == "/about" ? "pb-10 lg:pb-30" : "pb-30"
        }`}
      >
        <div className="w-11/12 mx-auto flex flex-col-reverse lg:flex-row justify-center gap-20 xl:gap-30">
          <div className="w-full lg:w-8/11 flex flex-col gap-3 items-center">
            {/* <h4 className="text-lg md:text-xl text-primary text-center">
              About Us
            </h4> */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-amber-50 tracking-wide text-center">
              Welcome To <span className="text-primary">Main Gate Design</span>
            </h2>
            <p className="text-sm md:text-base text-zinc-400 text-center">
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
        </div>
      </div>
    </>
  );
};

export default About;
