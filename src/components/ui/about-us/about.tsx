import { useLocation } from "react-router-dom";
import Button from "../../shared/button/button";

const About = () => {
  const location = useLocation();
  return (
    <>
      <div className="mt-20 py-30 text-zinc-300">
        <div className="w-11/12 mx-auto flex justify-center gap-50">
          <div className="w-1/2 flex flex-col gap-3 items-start">
            <h4 className="text-xl text-primary">About Us</h4>
            <h2 className="text-6xl text-amber-50 tracking-wide">
              Welcome To Main Gate Design
            </h2>
            <p className="text-zinc-400">
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
          <div className="w-1/2 relative z-0">
            <img
              className="w-full h-[60vh] rounded-2xl"
              src="/homepage/about/about-img.jpeg"
              alt=""
            />
            <div className="p-4 bg-black absolute -bottom-14 -left-20 z-20">
              <img
                className="w-70 h-50 rounded-2xl"
                src="/homepage/about/about-img2.png"
                alt=""
              />
            </div>
            <div className="p-4 bg-black absolute -top-20 -right-3 z-20">
              <img
                className="w-70 h-50 rounded-2xl"
                src="homepage/about/about-img3.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
