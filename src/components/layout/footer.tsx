import { navMenus } from "../../db/mockdata";

const Footer = () => {
  return (
    <>
      <div className="pt-20 border-t border-t-zinc-800">
        <div className="w-[98%] mx-auto grid grid-cols-2">
          <div>
            <img
              className="w-80 h-30 object-contain"
              src="/main-gate-design-logo.png"
              alt="main-gate-design-logo"
            />
          </div>

          <div className="flex justify-between opacity-95">
            <div>
              <h2 className="text-lg">Quick Links</h2>
              <div className="capitalize mt-4 flex flex-col gap-2 transition-all ease-in-out duration-100">
                {navMenus.map((k: any, ind: any) => (
                  <div className="hover:translate-x-3 transition-all ease-in-out duration-200" key={ind}>
                    <a className="hover:text-amber-100 text-sm" href={k.path}>
                      {k.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg">Opening Hours</h2>
              <div className="mt-4">Sun to Fri (9AM - 6:30PM)</div>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-lg">Contact</h2>
              <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                  <img src="/footer/telephone.svg" alt="" />
                  <h4>+977 9802355103</h4>
                </div>
                <div className="flex gap-4">
                  <img src="/footer/mail.svg" alt="" />
                  <h4>maingatedesign@gmail.com</h4>
                </div>
                <div className="flex gap-4">
                  <img src="/footer/location.svg" alt="" />
                  <h4>Kathmandu, Maharajgunj</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Socials and copyright */}
        <div className="flex justify-end my-8 opacity-85">
          <div className="w-[98%] mx-auto flex justify-between gap-8">
            <div className="flex gap-4">
              <div className="p-4 rounded-full border border-zinc-700">
                <img className="w-8 h-8" src="/footer/facebook.svg" alt="" />
              </div>
              <div className="p-4 rounded-full border border-zinc-700">
                <img className="w-8 h-8" src="/footer/twitter.svg" alt="" />
              </div>
              <div className="p-4 rounded-full border border-zinc-700">
                <img className="w-8 h-8" src="/footer/instagram.svg" alt="" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span>&copy; Designed & Developed by</span>
              <img className="w-14 h-14" src="/footer/webxlogo.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
