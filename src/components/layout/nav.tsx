import { Icon } from "@iconify/react/dist/iconify.js";
import { navMenus } from "../../db/mockdata";
import Button from "../shared/button/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isHamburgerActive, setHamburgerActive] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const contactButtonRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/contact");
    handleCloseHamburger();
  };

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(path);
  };

  // Improved Hamburger Menu Animation
  const handleHamburgerClick = () => {
    setHamburgerActive(true);

    // Create a timeline for smoother sequence
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Animate menu container
    tl.fromTo(
      menuRef.current,
      {
        y: "-100%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        duration: 0.4,
      }
    );

    // Animate menu items with stagger - fixed to use querySelectorAll
    if (menuItemsRef.current) {
      const menuItems = menuItemsRef.current.querySelectorAll(".menu-item");
      tl.fromTo(
        menuItems,
        {
          y: -20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.3,
        },
        "-=0.2" // Start slightly before previous animation completes
      );
    }

    // Animate contact button
    tl.fromTo(
      contactButtonRef.current,
      {
        scale: 0.9,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
      },
      "-=0.2" // Start slightly before previous animation completes
    );
  };

  // Improved closing animation
  const handleCloseHamburger = () => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.in" },
      onComplete: () => setHamburgerActive(false), // Only hide after animation completes
    });

    // Animate contact button out
    tl.to(contactButtonRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
    });

    // Animate menu items out with stagger - fixed to use querySelectorAll
    if (menuItemsRef.current) {
      const menuItems = menuItemsRef.current.querySelectorAll(".menu-item");
      tl.to(
        menuItems,
        {
          y: -20,
          opacity: 0,
          stagger: 0.03,
          duration: 0.25,
        },
        "-=0.1" // Start slightly before previous animation completes
      );
    }

    // Animate menu container out
    tl.to(
      menuRef.current,
      {
        y: "-100%",
        opacity: 0,
        duration: 0.3,
      },
      "-=0.2" // Start slightly before previous animation completes
    );
  };

  // Add overflow handling
  useEffect(() => {
    if (isHamburgerActive) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Clean up
    };
  }, [isHamburgerActive]);

  return (
    <div className="w-full fixed top-0 left-0 z-60 border-b border-b-zinc-800 bg-black">
      <div className="w-11/12 mx-auto flex items-center justify-between">
        <div className="p-4 bg-black flex gap-16 justify-start">
          <div className="flex items-center gap-24 bg-transparent">
            <Link onClick={handleLogoClick} to="/">
              <img
                className="w-35 h-12 lg:w-40 object-contain"
                src="/main-gate-design-logo.png"
                alt="main-gate-design-logo"
              />
            </Link>
          </div>

          {/* Desktop menus */}
        </div>
        <div className="hidden lg:flex justify-center gap-8 xl:gap-12 capitalize items-center">
          {navMenus.map((k: any, ind: number) => (
            <div key={ind}>
              <Link
                to={k.path}
                onClick={(e) => handleNavClick(e, k.path)}
                className={`hover:text-primary text-sm xl:text-base text-nowrap transition-colors duration-300
                   ${location.pathname === k.path && "text-primary"}`}
              >
                {k.title}
              </Link>
            </div>
          ))}
        </div>
        {/* Desktop contact button */}
        <div className="flex justify-end items-center">
          <div className="hidden lg:flex items-center gap-6">
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
        {/* Hamburger Menu for small devices */}
        <div
          onClick={handleHamburgerClick}
          className="block lg:hidden cursor-pointer p-2"
        >
          <Icon
            icon="ci:hamburger-lg"
            className="text-[1.5rem] transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Hamburger Menu Animation */}
        {isHamburgerActive && (
          <div
            ref={menuRef}
            className="w-full h-screen bg-black fixed inset-0 opacity-0"
            style={{ transform: "translateY(-100%)" }}
          >
            <div
              onClick={handleCloseHamburger}
              className="py-3 flex justify-end pr-2 cursor-pointer"
            >
              <Icon
                icon="entypo:cross"
                className="text-[2.5rem] transition-transform duration-300 hover:rotate-90"
              />
            </div>
            <div className="w-full h-[90vh] mt-10">
              <div ref={menuItemsRef} className="flex flex-col">
                {navMenus.map((k: any, ind: number) => (
                  <div
                    key={ind}
                    className="py-6 border-b border-b-zinc-700 flex justify-center menu-item"
                    onClick={handleCloseHamburger}
                  >
                    <Link
                      to={k.path}
                      onClick={(e) => handleNavClick(e, k.path)}
                      className={`capitalize text-center hover:text-primary text-2xl transition-colors duration-300
                       ${location.pathname === k.path && "text-primary"}`}
                    >
                      {k.title}
                    </Link>
                  </div>
                ))}
              </div>
              <div
                ref={contactButtonRef}
                className="flex lg:hidden justify-center mt-10 opacity-0"
                style={{ transform: "scale(0.9)" }}
              >
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
        )}
      </div>
    </div>
  );
};

export default Nav;
