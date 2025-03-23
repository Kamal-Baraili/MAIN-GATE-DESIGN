const About = () => {
  return (
    <>
      <div className="py-24 border-t border-t-zinc-800 rounded-4xl text-zinc-300">
        <div className="w-[98%] mx-auto flex justify-center gap-50">
          <div className="w-1/2">
            <h4 className="text-xl text-primary mt-10">About Us</h4>
            <h2 className="my-10 text-6xl text-amber-50">
              Welcome To Main Gate Design
            </h2>
            <p>
              Our team of experienced professionals will work closely with you
              to understand your requirements and provide innovative solutions
              that align with your vision. With our expertise and commitment to
              quality, we assure you a flawless execution of the project and a
              main gate that, gives you peace of mind. Apart from being visually
              stunning, our main gates are also designed with security as a top
              priority. We incorporate advanced locking mechanisms.
            </p>
          </div>
          <div className="w-1/2 relative z-0">
            <img
              className="w-full rounded-2xl"
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
            <div className="p-4 bg-black absolute -top-20 -right-5 z-20">
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
