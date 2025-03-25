import { navMenus } from "../../db/mockdata";

const Footer = () => {
  return (
    <>
      <div className="w-11/12 mx-auto py-10 border-t border-t-zinc-800">
        <div className="grid grid-cols-2">
          <div className=" flex flex-col gap-10">
            <div>
              <img
                className="w-80 h-30 object-contain"
                src="/main-gate-design-logo.png"
                alt="main-gate-design-logo"
              />
            </div>

            <div className="flex justify-between">
              <div className="flex justify-between opacity-95">
                <div>
                  <h2 className="text-lg text-zinc-200">Quick Links</h2>
                  <div className="capitalize mt-4 flex flex-col gap-2 transition-all ease-in-out duration-100">
                    {navMenus.map((k: any, ind: any) => (
                      <div
                        className="hover:translate-x-3 transition-all ease-in-out duration-200"
                        key={ind}
                      >
                        <a
                          className="text-zinc-400 hover:text-amber-100 text-sm"
                          href={k.path}
                        >
                          {k.title}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-lg text-zinc-200">Contact</h2>
                <div className="flex flex-col gap-3 text-zinc-400">
                  <div className="flex gap-4">
                    <img
                      className="opacity-70"
                      src="/footer/telephone.svg"
                      alt=""
                    />
                    <h4>+977 9802355103</h4>
                  </div>
                  <div className="flex gap-4">
                    <img className="opacity-70" src="/footer/mail.svg" alt="" />
                    <h4>maingatedesign@gmail.com</h4>
                  </div>
                  <div className="flex gap-4">
                    <img
                      className="opacity-70"
                      src="/footer/location.svg"
                      alt=""
                    />
                    <h4>Kathmandu, Maharajgunj</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="opacity-85">
              <div className="flex gap-10 opacity-65">
                <img className="w-8 h-8" src="/footer/facebook.svg" alt="" />

                <img className="w-8 h-8" src="/footer/twitter.svg" alt="" />

                <img className="w-8 h-8" src="/footer/instagram.svg" alt="" />
              </div>
            </div>
          </div>

          {/* CTA box */}
          <div className="py-10 pl-20">
            <div className="w-full h-full p-8 bg-primary rounded-xl flex flex-col gap-10">
              <h1 className="capitalize text-4xl text-black">
                make creator marketing a breeze
              </h1>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white">
                    <img src="/footer/check.svg" alt="" />
                  </div>{" "}
                  <span className="text-black">
                    Get better returns on your time & money
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white">
                    <img src="/footer/check.svg" alt="" />
                  </div>{" "}
                  <span className="text-black">
                    Save 75% of you time per campaign
                  </span>
                </div>
              </div>
              <div className="flex gap-8 mt-10">
                <a
                  href="/contact us"
                  className="px-8 py-4 rounded-4xl bg-[#18181A] hover:bg-[#27272b] flex items-center gap-2"
                >
                  <img src="/footer/mail.svg" alt="" />
                  <span>Contact Us</span>
                </a>
                <a
                  className="px-4 py-2 bg-green-500 hover:bg-green-400 rounded-4xl flex items-center gap-2"
                  href="https://wa.me/?text=Hello%2C%20I%20need%20assistance" // Enter whatsapp number between / and ?
                  target="_blank"
                >
                  <img src="/homepage/whatsapp-icon.svg" alt="" />
                  <span>Whatsapp Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-5 flex">
          <p className="w-full text-zinc-400">
            Main Gate Design specializes in crafting stylish, secure, and custom
            gates for both residential and commercial properties, ensuring
            quality and durability.
          </p>
          <div className="w-full flex items-center justify-end gap-2 text-zinc-300">
            <span>&copy; Designed & Developed by</span>
            <img className="w-14 h-14" src="/footer/webxlogo.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
