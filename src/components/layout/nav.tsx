import { navMenus } from "../../db/mockdata";
import Button from "../shared/button/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/contact");
  };

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(path);
  };

  return (
    <div className="w-full fixed top-0 left-0 z-60 border-b border-b-zinc-800 bg-black">
      <div className="w-11/12 mx-auto flex">
        <div className="w-full p-4 bg-black rounded-2xl flex gap-16 justify-start">
          <div className="flex items-center gap-24 bg-transparent">
            <Link onClick={handleLogoClick} to="/">
              <img
                className="w-40 h-12 object-contain"
                src="/main-gate-design-logo.png"
                alt="main-gate-design-logo"
              />
            </Link>
          </div>
          <div className="flex justify-center gap-12 capitalize items-center">
            {navMenus.map((k: any, ind: number) => (
              <div key={ind}>
                <Link
                  to={k.path}
                  onClick={(e) => handleNavClick(e, k.path)}
                  className={`hover:text-primary
                   ${location.pathname === k.path && "text-primary"}`}
                >
                  {k.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[40%] flex justify-end items-center">
          <div className="flex items-center gap-6">
            <Link onClick={handleContactClick} to="/contact">
              <Button
                text="Contact Us"
                color="text-black"
                bgColor="bg-amber-300"
                src="/homepage/gate-icon.svg"
                secondSrc="/btn-handle.png"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
