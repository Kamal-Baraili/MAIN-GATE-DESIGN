import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import Button from "../../shared/button/button";
import { useLocation } from "react-router-dom";

const MainGateHero = ({ isClicked, setIsClicked }: any) => {
  const box1 = useRef<HTMLDivElement | null>(null);
  const box2 = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const textThirdRef = useRef<HTMLDivElement | null>(null);
  const heading1 = useRef<HTMLHeadingElement | null>(null);
  const heading2 = useRef<HTMLHeadingElement | null>(null);
  const tlRef = useRef<GSAPTimeline | null>(null);

  const [isPlayClicked, setPlayClicked] = useState<boolean>(false);
  const [hasViewed, setHasViewed] = useState<boolean>(false);
  const location = useLocation();

  // Check localStorage on mount and set up reload detection
  useEffect(() => {
    const viewed = localStorage.getItem("hasViewedMainGateHero");
    if (viewed === "true") {
      setHasViewed(true);
    }

    // Clear localStorage on full page reload (not re-render)
    const handleBeforeUnload = () => {
      if (location.pathname === "/") {
        localStorage.removeItem("hasViewedMainGateHero");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location.pathname]); // Depend on pathname to ensure it only clears on homepage

  useEffect(() => {
    if (
      box1.current &&
      box2.current &&
      container.current &&
      textRef.current &&
      textThirdRef.current &&
      heading1.current &&
      heading2.current &&
      !hasViewed
    ) {
      // Set initial states
      gsap.set([box1.current, box2.current], { x: "0%" });
      gsap.set(container.current, { opacity: 1, visibility: "visible" });
      gsap.set(heading1.current, { opacity: 0, y: "0%" });
      gsap.set(heading2.current, { opacity: 0, y: "100%" });
      gsap.set(textThirdRef.current, { y: "2%", opacity: 0 });

      // Create timeline
      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          // Mark as viewed in localStorage when animation completes
          localStorage.setItem("hasViewedMainGateHero", "true");
          setHasViewed(true);
          console.log(isClicked)
        },
      });

      tl.to(box1.current, {
        x: "-100%",
        ease: "power2.inOut",
        duration: 3,
      })
        .to(
          box2.current,
          {
            x: "100%",
            ease: "power2.inOut",
            duration: 3,
          },
          "<"
        )
        .to(
          heading1.current,
          {
            opacity: 1,
            ease: "power2.inOut",
            duration: 0.5,
          },
          ">"
        )
        .to(
          heading1.current,
          {
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.6,
          },
          ">1"
        )
        .to(
          heading2.current,
          {
            y: "0%",
            opacity: 1,
            ease: "power2.inOut",
            duration: 0.5,
          },
          "-=0.5"
        )
        .to(
          heading2.current,
          {
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.5,
          },
          ">1"
        )
        .to(
          textThirdRef.current,
          {
            y: "0%",
            opacity: 1,
            ease: "power2.inOut",
            duration: 0.5,
          },
          ">0.5"
        )
        .to(
          container.current,
          {
            opacity: 0,
            visibility: "hidden",
            ease: "power2.inOut",
            duration: 0.5,
          },
          ">1"
        );

      tlRef.current = tl;

      // Cleanup
      return () => {
        if (tlRef.current) {
          tlRef.current.kill();
        }
      };
    }
  }, [hasViewed]);

  // Handle click event
  const handlePlayClick = () => {
    if (tlRef.current) {
      tlRef.current.restart();
      setPlayClicked(true);
    }
  };

  // Only show the component on the homepage and if not viewed yet
  if (hasViewed || location.pathname !== "/") {
    return null;
  }

  return (
    <div ref={container} className="fixed inset-0">
      <div className="h-[115vh] overflow-hidden bg-[#F7F4F4] relative">
        <div
          className={`w-full h-screen flex justify-center items-center absolute top-30 left-0 z-50 ${
            isPlayClicked && "hidden"
          }`}
        >
          <div
            onClick={(prev) => {
              handlePlayClick();
              setIsClicked(!prev);
            }}
          >
            <Button
              text="Open The Gate"
              color="text-black"
              bgColor="bg-amber-300"
              src="/homepage/gate-icon.svg"
              secondSrc="/btn-handle.png"
            />
          </div>
        </div>
        <div className="flex justify-between absolute inset-0 z-0">
          <div ref={box1} className="h-full w-1/2">
            <img
              src="/homepage/left-gate.jpg"
              className="h-full w-full"
              alt=""
            />
          </div>
          <div ref={box2} className="h-full w-1/2">
            <img
              src="/homepage/right-gate.jpg"
              className="h-full w-full"
              alt=""
            />
          </div>
        </div>

        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col  items-center justify-center pointer-events-none z-10"
        >
          <h2
            ref={heading1}
            className="text-5xl -mt-30 font-bold text-[#F5C230]"
          >
            Welcome
          </h2>
        </div>

        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center -mt-40 justify-center pointer-events-none z-10"
        >
          <h2 ref={heading2} className="text-5xl font-bold text-[#F5C230] mt-2">
            To Main Gate Design
          </h2>
        </div>

        <div
          ref={textThirdRef}
          className="absolute inset-0 flex items-center -mt-10 justify-center pointer-events-none z-10"
        >
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-4xl -mt-20 font-medium text-[#F5C230]">
              Step Into a World of Unmatched Gate Designs.
            </h2>
            <h2 className="text-4xl font-medium text-[#F5C230]">
              Your Ultimate Destination for Style and Protection.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainGateHero;
