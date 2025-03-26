import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Button from "../../shared/button/button";
import { imageData } from "../../../db/mockdata";

const Hero = () => {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);
  const redDivRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [isLightOn, setIsLightOn] = useState(true);

  useEffect(() => {
    const heroContainer = heroContainerRef.current;
    const images = mainRef.current;
    const redDiv = redDivRef.current;
    const wrapper = wrapperRef.current;

    if (!heroContainer || !images || !redDiv || !wrapper) return;

    let totalWidth = images.scrollWidth;
    let scrollDistance =
      totalWidth - window.innerWidth + (window.innerWidth < 768 ? 200 : 400);
    let lastScrollY = window.scrollY;
    let scrolledDistance = 0;
    let translateX = 0;
    let heroPinPosition = 0;
    let isTouching = false;
    let touchStartX = 0;
    let touchStartY = 0;

    const updateDimensions = () => {
      totalWidth = images.scrollWidth;
      scrollDistance =
        totalWidth - window.innerWidth + (window.innerWidth < 768 ? 200 : 400);
      wrapper.style.height = `${window.innerHeight + scrollDistance}px`;
    };

    const initializeScroll = () => {
      updateDimensions();
      handleScroll(); // Call handleScroll to set initial state
    };

    const handleScroll = () => {
      if (isTouching) return;

      const currentScrollY = window.scrollY;
      const wrapperRect = wrapper.getBoundingClientRect();

      if (wrapperRect.top > 0) {
        setIsPinned(false);
        scrolledDistance = 0;
        translateX = 0;
        gsap.set(images, { x: 0 });
        resetSpotlight();
        heroPinPosition = 0;
        lastScrollY = currentScrollY;
        return;
      }

      if (heroPinPosition === 0 && wrapperRect.top <= 0) {
        heroPinPosition = currentScrollY - wrapperRect.top * -1;
      }

      const relativePosition = currentScrollY - heroPinPosition;

      if (relativePosition >= 0 && relativePosition <= scrollDistance) {
        setIsPinned(true);
        scrolledDistance = relativePosition;
        const progress = scrolledDistance / scrollDistance;
        translateX = -(progress * (totalWidth - window.innerWidth));
        gsap.set(images, { x: translateX });
        updateSpotlight();
      }
      lastScrollY = currentScrollY;
    };

    const handleTouchStart = (e: TouchEvent) => {
      isTouching = true;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching) return;

      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = touchStartX - touchX;
      const deltaY = touchStartY - touchY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
      }

      const wrapperRect = wrapper.getBoundingClientRect();
      if (wrapperRect.top <= 0) {
        setIsPinned(true);
        scrolledDistance += deltaX * 2;
        scrolledDistance = Math.max(
          0,
          Math.min(scrolledDistance, scrollDistance)
        );
        translateX = totalWidth + (window.innerWidth < 768 ? 200 : 400);
        gsap.set(images, { x: translateX });
        updateSpotlight();
        touchStartX = touchX;
        touchStartY = touchY;
      }
    };

    const handleTouchEnd = () => {
      isTouching = false;
    };

    const updateSpotlight = () => {
      if (!images || !redDiv || !isLightOn) {
        gsap.to(redDiv, { opacity: 0, duration: 0.2 });
        return;
      }

      const imgDetectionPoints = Array.from(
        images.querySelectorAll(".img-detection")
      ) as HTMLElement[];
      const redDivRect = redDiv.getBoundingClientRect();
      let isOverlapping = false;

      imgDetectionPoints.forEach((imgPoint) => {
        const imgPointRect = imgPoint.getBoundingClientRect();
        const parentContainer = imgPoint.parentElement as HTMLElement;

        const overlapping =
          imgPointRect.right >= redDivRect.left &&
          imgPointRect.left <= redDivRect.right &&
          imgPointRect.bottom >= redDivRect.top &&
          imgPointRect.top <= redDivRect.bottom;

        if (overlapping && parentContainer) {
          isOverlapping = true;
          gsap.to(parentContainer, {
            opacity: 1,
            scale: 1.1,
            duration: 0.2,
            ease: "power2.out",
          });
        } else if (parentContainer) {
          gsap.to(parentContainer, {
            opacity: 0.6,
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        }
      });

      gsap.to(redDiv, {
        opacity: isOverlapping ? 1 : 0,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const resetSpotlight = () => {
      if (!images || !redDiv) return;

      const allContainers = Array.from(
        images.querySelectorAll(".img-container")
      ) as HTMLElement[];

      allContainers.forEach((container) => {
        gsap.to(container, {
          opacity: 0.6,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      if (!isLightOn) {
        gsap.to(redDiv, { opacity: 0, duration: 0.3 });
      }
    };

    gsap.set(redDiv, { opacity: 0 });
    initializeScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      gsap.set(images, { x: 0 });
      resetSpotlight();
    };
  }, [isLightOn]);

  const toggleLight = () => {
    setIsLightOn((prev) => !prev);
    const redDiv = redDivRef.current;
    if (redDiv) {
      if (!isLightOn) {
        // Turning ON - check spotlight immediately
        updateSpotlight();
      } else {
        // Turning OFF - hide immediately
        gsap.to(redDiv, { opacity: 0, duration: 0.2 });
      }
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div
        ref={heroContainerRef}
        className="relative h-screen overflow-hidden touch-pan-y"
        style={{
          position: isPinned ? "sticky" : "relative",
          top: isPinned ? 0 : "auto",
          left: 0,
          width: "100%",
          zIndex: 10,
        }}
      >
        <img
          className="w-[200px] h-[120px] absolute top-21 left-1/2 -translate-x-1/2 z-70 md:w-[170px] md:h-[50px] object-cover"
          src="/homepage/hanging-lamp.png"
          alt="Hanging Lamp"
        />
        <div
          ref={redDivRef}
          className="w-[450px] h-[800px] absolute top-[120px] left-1/2 -translate-x-1/2 z-10 md:w-[750px] md:top-[40px]"
        >
          <img
            className="w-full h-full"
            src="/homepage/light-beam2.png"
            alt=""
          />
        </div>
        <button
          onClick={toggleLight}
          className="absolute top-[100px] right-0 -translate-x-1/2 z-10 cursor-pointer hover:text-primary"
        >
          {isLightOn ? "Turn OFF" : "Turn ON"}
        </button>
        <div
          ref={mainRef}
          className="flex pt-50 px-4 whitespace-nowrap will-change-transform md:pt-70 md:px-40"
        >
          <div className="inline-block flex-shrink-0">
            <div className="w-[50px] h-[250px] transition-all duration-300 transform mx-2 md:w-[405px] md:h-[450px] md:mx-4"></div>
          </div>
          {imageData.map((src, index) => (
            <div key={index} className="inline-block flex-shrink-0">
              <div className="img-container w-[300px] h-[300px] px-2 mr-10 transition-all duration-300 transform mx-2 relative opacity-60 md:w-[450px] md:h-[450px] md:px-5 md:mr-120 md:mx-4">
                <img
                  className="w-full h-full object-cover absolute inset-0 rounded-lg shadow-lg z-20"
                  src={src}
                  alt={`Slide ${index}`}
                />
                <div className="img-detection w-[1px] h-5 absolute top-0 left-1/2 -translate-x-1/2 z-30"></div>
                <p
                  style={{
                    WebkitTextStrokeWidth: "2px",
                    WebkitTextStrokeColor: "#ffffff",
                  }}
                  className="text-[60px] uppercase text-transparent absolute top-20 -left-8 z-50 font-bold font-ursb md:text-[100px] md:top-40 md:-left-12"
                >
                  MILD STEEL
                </p>
                <p className="absolute top-20 -left-8 text-[60px] uppercase text-white font-bold -z-20 font-ursb md:text-[100px] md:top-40 md:-left-12">
                  MILD STEEL
                </p>
              </div>
            </div>
          ))}
          <div className="img-container flex-shrink-0 w-[300px] h-[300px] px-2 mr-10 transition-all duration-300 transform mx-2 relative opacity-60 md:w-[450px] md:h-[450px] md:px-5 md:mr-80 md:mx-4">
            <div className="img-detection w-[1px] h-5 absolute top-0 left-1/2 -translate-x-1/2 z-30"></div>
            <h2 className="text-3xl text-center font-bold text-white mt-10 md:text-5xl md:mt-20">
              Please View Our <br /> Gate Collection.
            </h2>
            <div className="mt-8 flex items-center justify-center gap-3 md:mt-14 absolute inset-0 z-20">
              <a href="/works">
                <Button
                  text="View More"
                  color="text-black"
                  bgColor="bg-amber-300"
                  src="/homepage/open-gate.svg"
                  secondSrc="/btn-handle.png"
                />
              </a>
            </div>
          </div>
          <div className="inline-block flex-shrink-0">
            <div className="w-[50px] h-[250px] transition-all duration-300 transform mx-2 md:w-[250px] md:h-[250px] md:mx-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
function updateSpotlight() {
  throw new Error("Function not implemented.");
}
