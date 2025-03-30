import { Facebook, Instagram, Twitter } from "../icons/socialHandles";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="w-11/12 mx-auto py-10">
        <div className="flex justify-center">
          <img
            className="w-150 h-80"
            src="/footer/milky-way-footer.gif"
            alt=""
          />
        </div>
        <div className="">
          <div className="col-span-2 flex flex-col gap-10">
            {/* <div>
              <img
                className="w-40 object-contain"
                src="/main-gate-design-logo.png"
                alt="main-gate-design-logo"
              />
            </div> */}

            <div className="flex justify-center">
              {/* <div className="flex flex-col gap-5 items-start">
                  <h2 className="text-xl text-zinc-200">Quick Links</h2>
                  <div className="capitalize flex gap-6 transition-all ease-in-out duration-100">
                    {navMenus.map((k: any, ind: any) => (
                      <div
                        className="hover:-translate-y-1 transition-all ease-in-out duration-200"
                        key={ind}
                      >
                        <a
                          className="text-zinc-400 hover:text-amber-100 text-md"
                          href={k.path}
                        >
                          {k.title}
                        </a>
                      </div>
                    ))}
                  </div>
                </div> */}

              <div className="">
                <div className="flex gap-10">
                  <Facebook />

                  <Twitter />

                  <Instagram />
                </div>
                <h2 className="text-xl text-zinc-200 text-center mt-5">
                  Find Us At
                </h2>
              </div>

              {/* <div className="flex flex-col gap-5 items-start">
                <h2 className="text-xl text-zinc-200">Contact</h2>
                <div className="flex gap-3 text-zinc-400">
                  <div className="flex gap-1 items-center">
                    <img
                      className="h-4 w-4 opacity-70"
                      src="/footer/telephone.svg"
                      alt=""
                    />
                    <h4 className="">+977 9802355103</h4>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      className="h-5 w-5 opacity-70"
                      src="/footer/mail-footer.svg"
                      alt=""
                    />
                    <h4 className="">maingatedesign@gmail.com</h4>
                  </div>
                  <div className="flex gap-1">
                    <img
                      className="h-5 w-5 opacity-70"
                      src="/footer/location.svg"
                      alt=""
                    />
                    <h4 className="">Kathmandu, Maharajgunj</h4>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="w-full mt-5 pt-8 flex flex-col gap-2 items-center border-t border-t-zinc-800">
          <p className="text-zinc-400 capitalize text-sm text-center sm:text-left">
            &copy; Copyright {currentYear} | All Rights Reserved | Main Gate
            Design Pvt. Ltd.
          </p>
          <div className="flex items-center justify-end gap-2 text-zinc-300 text-sm">
            <span>Designed & Developed by</span>
            <a href="https://www.webxnep.com/" target="blank">
              <img className="w-12" src="/footer/webxlogo.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
