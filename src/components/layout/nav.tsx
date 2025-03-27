import { navMenus } from "../../db/mockdata";
import Button from "../shared/button/button";
import { useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  return (
    <>
      <div className="w-full fixed top-0 left-0 z-60 border-b border-b-zinc-800 bg-black">
        <div className="w-11/12 mx-auto flex">
          <div className="w-full p-4 bg-black rounded-2xl flex gap-16 justify-start">
            <div className="flex items-center gap-24 bg-transparent">
              <a href="/">
                <img
                  className="w-40 h-12 object-contain"
                  src="/main-gate-design-logo.png"
                  alt="main-gate-design-logo"
                />
              </a>
            </div>
            <div className="flex justify-center gap-12 capitalize items-center">
              {navMenus.map((k: any, ind: any) => (
                <div key={ind}>
                  <a
                    className={`hover:text-primary
                   ${location.pathname === k.path && "text-primary"}`}
                    href={k.path}
                  >
                    {k.title}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[40%] flex justify-end items-center">
            <div className="flex items-center gap-6">
              <a href="/contact us">
                <Button
                  text="Contact Us"
                  color="text-black"
                  bgColor="bg-amber-300"
                  src="/homepage/gate-icon.svg"
                  secondSrc="/btn-handle.png"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
