import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../../shared/button/button";
import { HeroWorksData } from "../../../db/mockdata";
import { Icon } from "@iconify/react/dist/iconify.js";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const navigate = useNavigate();
  const mainRef = useRef<HTMLDivElement | null>(null);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);
  const redDivRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const collectionDivRef = useRef<HTMLDivElement | null>(null);
  const hangingLampRef = useRef<HTMLImageElement | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const pinTriggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const calculateSliderPositions = () => {
    const images = mainRef.current;
    const redDiv = redDivRef.current;

    if (!images || !redDiv) return { initialOffset: 0, finalOffset: 0 };

    const firstImageContainer = images.querySelector(
      ".img-container"
    ) as HTMLElement;
    const collectionDiv = collectionDivRef.current;

    if (!firstImageContainer || !collectionDiv)
      return { initialOffset: 0, finalOffset: 0 };

    const redDivRect = redDiv.getBoundingClientRect();
    const redDivCenter = redDivRect.left + redDivRect.width / 2;

    const firstImageRect = firstImageContainer.getBoundingClientRect();
    const firstImageCenter = firstImageRect.left + firstImageRect.width / 2;

    const collectionRect = collectionDiv.getBoundingClientRect();
    const collectionCenter = collectionRect.left + collectionRect.width / 2;

    const initialOffset = redDivCenter - firstImageCenter;
    const finalOffset = redDivCenter - collectionCenter;

    return { initialOffset, finalOffset };
  };

  const handleNavigateToDetails = (
    slug: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    navigate(`/catalogue/${slug.replace(/\s+/g, "-")}`, { replace: true });
    window.scrollTo(0, 0);
  };

  const handleViewMoreClick = () => {
    navigate("/catalogue", { state: { scrollToTop: true } });
  };

  const handleSlideChange = (direction: "next" | "prev") => {
    const images = mainRef.current;
    const redDiv = redDivRef.current;
    if (!images || !redDiv) return;

    const totalSlides = HeroWorksData.length + 1;

    let newSlide = currentSlide;
    if (direction === "next") {
      newSlide = Math.min(currentSlide + 1, totalSlides - 1);
    } else {
      newSlide = Math.max(currentSlide - 1, 0);
    }

    if (newSlide === currentSlide) return;

    setCurrentSlide(newSlide);

    const allContainers = Array.from(
      images.querySelectorAll(".img-container")
    ) as HTMLElement[];

    if (allContainers.length === 0) return;

    const targetContainer = allContainers[newSlide];

    if (!targetContainer) return;

    const redDivRect = redDiv.getBoundingClientRect();
    const redDivCenter = redDivRect.left + redDivRect.width / 2;

    const targetRect = targetContainer.getBoundingClientRect();
    const targetCenter = targetRect.left + targetRect.width / 2;

    const exactOffset = redDivCenter - targetCenter;
    const currentTransform = gsap.getProperty(images, "x") as number;
    const newPosition = currentTransform + exactOffset;

    gsap.to(images, {
      x: newPosition,
      duration: 0.7,
      ease: "power2.out",
      onUpdate: updateSpotlight,
      onComplete: () => {
        updateSpotlight();
      },
    });
  };

  const updateSpotlight = () => {
    const images = mainRef.current;
    const redDiv = redDivRef.current;
    const hangingLamp = hangingLampRef.current;

    if (!images || !redDiv || !hangingLamp) {
      if (redDiv) gsap.to(redDiv, { opacity: 0, duration: 0.2 });
      return;
    }

    const imgContainers = Array.from(
      images.querySelectorAll(".img-container")
    ) as HTMLElement[];

    if (imgContainers.length === 0) return;

    if (isDesktop) {
      // Desktop: Use light beam (redDiv) as the detection point
      const redDivRect = redDiv.getBoundingClientRect();
      const redDivCenter = redDivRect.left + redDivRect.width / 2;
      const redDivBottom = redDivRect.bottom;

      // Increased detection threshold for desktop from 450 to 600px for a wider range
      const detectionThreshold = 600;

      let isHighlighted = false;

      // Reset all containers first
      imgContainers.forEach((container) => {
        gsap.to(container, {
          opacity: 0.6,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      // Check each image container against the light beam position
      imgContainers.forEach((container, index) => {
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        const containerTop = containerRect.top;

        // Horizontal distance between container center and light beam center
        const horizontalDistance = Math.abs(containerCenter - redDivCenter);

        // Check if container is within the path of the light beam
        const isBelowLightBeam = containerTop <= redDivBottom;

        // Container should be visible on screen
        const isVisible =
          containerRect.bottom > 0 && containerRect.top < window.innerHeight;

        // Highlight if container is in the light beam's path and horizontally aligned
        if (
          isVisible &&
          isBelowLightBeam &&
          horizontalDistance < detectionThreshold
        ) {
          isHighlighted = true;
          gsap.to(container, {
            opacity: 1,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });
          if (index !== currentSlide) {
            setCurrentSlide(index);
          }
        }
      });

      // Update light beam visibility based on highlight
      gsap.to(redDiv, {
        opacity: isHighlighted ? 1 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // Mobile: Increase detection threshold from 50 to 150px for a wider range
      const redDivRect = redDiv.getBoundingClientRect();
      const threshold = 150; // Increased from 50 to 150
      let isOverlapping = false;
      const imgDetectionPoints = Array.from(
        images.querySelectorAll(".img-detection")
      ) as HTMLElement[];

      imgDetectionPoints.forEach((imgPoint) => {
        const imgPointRect = imgPoint.getBoundingClientRect();
        const parentContainer = imgPoint.closest(
          ".img-container"
        ) as HTMLElement;

        if (!parentContainer) return;

        const imgPointCenter = imgPointRect.left + imgPointRect.width / 2;
        const redDivCenter = redDivRect.left + redDivRect.width / 2;
        const overlapping = Math.abs(redDivCenter - imgPointCenter) < threshold;

        if (overlapping) {
          isOverlapping = true;
          gsap.to(parentContainer, {
            opacity: 1,
            scale: 1.1,
            duration: 0.2,
            ease: "power2.out",
          });
          const allContainers = Array.from(
            images.querySelectorAll(".img-container")
          ) as HTMLElement[];
          const slideIndex = allContainers.indexOf(parentContainer);
          if (slideIndex >= 0 && slideIndex !== currentSlide) {
            setCurrentSlide(slideIndex);
          }
        } else {
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
    }
  };

  const resetSpotlight = () => {
    const images = mainRef.current;

    if (!images) return;

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

    if (redDivRef.current) {
      gsap.to(redDivRef.current, { opacity: 0 });
    }
  };

  const setupDesktopScrolling = () => {
    const heroContainer = heroContainerRef.current;
    const images = mainRef.current;
    const redDiv = redDivRef.current;
    const wrapper = wrapperRef.current;
    const collectionDiv = collectionDivRef.current;

    if (!heroContainer || !images || !redDiv || !wrapper || !collectionDiv)
      return;

    const savedScrollPosition = sessionStorage.getItem("heroScrollPosition");
    const { initialOffset } = calculateSliderPositions();

    gsap.set(wrapper, { opacity: 1 });
    gsap.set(images, { x: initialOffset });

    const highlightFirstImage = () => {
      const imgContainers = Array.from(
        images.querySelectorAll(".img-container")
      ) as HTMLElement[];

      if (imgContainers.length > 0) {
        imgContainers.forEach((container) => {
          gsap.set(container, {
            opacity: 0.6,
            scale: 1,
          });
        });

        gsap.set(imgContainers[0], {
          opacity: 1,
          scale: 1.1,
        });

        gsap.set(redDiv, { opacity: 1 });
        setCurrentSlide(0);
      }
    };

    highlightFirstImage();
    setTimeout(highlightFirstImage, 100);

    let totalWidth = images.scrollWidth;
    let lastElementOffset = 0;

    const calculateScrollDistance = () => {
      const collectionRect = collectionDiv.getBoundingClientRect();
      const mainRect = images.getBoundingClientRect();
      lastElementOffset =
        collectionRect.left - mainRect.left + collectionRect.width / 2;
      const scrollDistance = lastElementOffset - window.innerWidth / 2;
      return scrollDistance;
    };

    let scrollDistance = calculateScrollDistance();
    let lastScrollY = window.scrollY;
    let scrolledDistance = 0;
    let translateX = initialOffset;
    let heroPinPosition = 0;
    let isTouching = false;
    let touchStartX = 0;
    let touchStartY = 0;

    const updateDimensions = () => {
      totalWidth = images.scrollWidth;
      scrollDistance = calculateScrollDistance();
      wrapper.style.height = `${window.innerHeight + scrollDistance}px`;
      updateSpotlight();
    };

    const initializeScroll = () => {
      updateDimensions();
      gsap.set(images, { x: initialOffset });
      ScrollTrigger.refresh();
      updateSpotlight();

      highlightFirstImage();

      if (savedScrollPosition) {
        const savedPosition = parseInt(savedScrollPosition, 10);
        window.scrollTo(0, savedPosition);
        handleScroll();
      } else {
        handleScroll();
      }
    };

    const handleScroll = () => {
      if (isTouching) return;

      const currentScrollY = window.scrollY;
      const wrapperRect = wrapper.getBoundingClientRect();

      sessionStorage.setItem("heroScrollPosition", currentScrollY.toString());

      if (wrapperRect.top > 0) {
        setIsPinned(false);
        scrolledDistance = 0;
        translateX = initialOffset;
        gsap.set(images, { x: initialOffset });
        updateSpotlight();
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

        const { finalOffset } = calculateSliderPositions();
        const targetX =
          initialOffset -
          progress * (initialOffset - finalOffset + scrollDistance);
        translateX = targetX;

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
      if (!isTouching || !isDesktop) return;

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
        const progress = scrolledDistance / scrollDistance;

        const { finalOffset } = calculateSliderPositions();
        const targetX =
          initialOffset -
          progress * (initialOffset - finalOffset + scrollDistance);
        translateX = targetX;

        gsap.set(images, { x: translateX });
        updateSpotlight();
        touchStartX = touchX;
        touchStartY = touchY;
      }
    };

    const handleTouchEnd = () => {
      isTouching = false;
      updateSpotlight();
    };

    const tl = gsap.timeline();
    timelineRef.current = tl;

    const pinTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: `+=${scrollDistance + 100}`,
      pin: heroContainer,
      onEnter: () => {
        tl.to(wrapper, {
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            setIsPinned(true);
            updateSpotlight();
          },
        });
      },
      onEnterBack: () => {
        tl.to(wrapper, {
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            setIsPinned(true);
            updateSpotlight();
          },
        });
      },
      onLeaveBack: () => {
        tl.to(wrapper, {
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            setIsPinned(false);
            updateSpotlight();
            highlightFirstImage();
          },
        });
      },
    });

    pinTriggerRef.current = pinTrigger;

    initializeScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        initializeScroll();
        console.log(totalWidth);
        console.log(isPinned);
        console.log(lastScrollY);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      sessionStorage.removeItem("heroScrollPosition");

      if (pinTriggerRef.current) {
        pinTriggerRef.current.kill();
        pinTriggerRef.current = null;
      }

      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  };

  const setupMobileSlider = () => {
    const images = mainRef.current;
    const redDiv = redDivRef.current;
    const wrapper = wrapperRef.current;
    const heroContainer = heroContainerRef.current;

    if (!images || !redDiv || !wrapper || !heroContainer) return;

    gsap.set(wrapper, { opacity: 1 });
    const { initialOffset } = calculateSliderPositions();

    setCurrentSlide(0);
    gsap.set(images, { x: initialOffset });
    gsap.set(redDiv, { opacity: 1 });

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      setTouchEndX(e.changedTouches[0].clientX);
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const touchDiff = touchStartX - touchEndX;

      if (Math.abs(touchDiff) > swipeThreshold) {
        if (touchDiff > 0) {
          handleSlideChange("next");
        } else {
          handleSlideChange("prev");
        }
      }
    };

    heroContainer.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    heroContainer.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    const initializeMobileSlider = () => {
      const { initialOffset } = calculateSliderPositions();
      gsap.set(images, { x: initialOffset });

      const imgContainers = Array.from(
        images.querySelectorAll(".img-container")
      ) as HTMLElement[];

      imgContainers.forEach((container) => {
        gsap.set(container, {
          opacity: 0.6,
          scale: 1,
        });
      });

      if (imgContainers.length > 0) {
        gsap.set(imgContainers[0], {
          opacity: 1,
          scale: 1.1,
        });
        gsap.set(redDiv, { opacity: 1 });
      }
    };

    initializeMobileSlider();
    setTimeout(initializeMobileSlider, 100);

    return () => {
      gsap.set(images, { x: 0 });
      resetSpotlight();
      heroContainer.removeEventListener("touchstart", handleTouchStart);
      heroContainer.removeEventListener("touchend", handleTouchEnd);
    };
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      setIsDesktop(isLargeScreen);

      if (pinTriggerRef.current) {
        pinTriggerRef.current.kill();
        pinTriggerRef.current = null;
      }

      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      const images = mainRef.current;
      if (images) {
        const { initialOffset } = calculateSliderPositions();
        gsap.set(images, { x: initialOffset });
      }

      if (isLargeScreen) {
        const cleanup = setupDesktopScrolling();
        return cleanup;
      } else {
        const cleanup = setupMobileSlider();
        return cleanup;
      }
    };

    const cleanup = checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      if (cleanup) cleanup();
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full mx-auto relative">
      <div
        ref={heroContainerRef}
        className={`relative h-screen overflow-hidden touch-pan-y ${
          !isDesktop ? "flex flex-col items-center" : ""
        }`}
        style={{
          zIndex: 10,
        }}
      >
        <img
          ref={hangingLampRef}
          className="w-[100px] h-[40px] absolute top-40 lg:top-21 left-1/2 -translate-x-1/2 z-70 lg:w-[170px] lg:h-[50px] lg:object-cover"
          src="/homepage/hanging-lamp.png"
          alt="Hanging Lamp"
        />
        <div
          ref={redDivRef}
          className="w-[350px] h-[85vh] sm:h-[70vh] md:h-[75vh] lg:h-[90vh] absolute top-25 left-1/2 -translate-x-1/2 z-10 lg:w-[750px] lg:top-[40px]"
        >
          <img
            className="w-full h-full"
            src="/homepage/light-beam2.png"
            alt="Light Beam"
          />
        </div>

        {!isDesktop && (
          <div className="flex justify-center gap-10 md:gap-30 w-full absolute bottom-0 px-4 z-30">
            <button
              onClick={() => handleSlideChange("prev")}
              className={`bg-amber-300 p-3 rounded-full shadow-lg ${
                currentSlide === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-amber-400"
              }`}
              disabled={currentSlide === 0}
            >
              <Icon className="text-2xl" icon="tabler:arrow-left" />
            </button>
            <button
              onClick={() => handleSlideChange("next")}
              className={`bg-amber-300 p-3 rounded-full shadow-lg ${
                currentSlide === HeroWorksData.length
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-amber-400"
              }`}
              disabled={currentSlide === HeroWorksData.length}
            >
              <Icon className="text-2xl" icon="tabler:arrow-right" />
            </button>
          </div>
        )}

        <div
          ref={mainRef}
          className="flex pt-[45vh] md:pt-[38vh] px-4 whitespace-nowrap will-change-transform lg:pt-[24vh] xl:pt-[30vh] lg:px-40 relative z-20"
        >
          <div className="hidden lg:inline-block flex-shrink-0">
            <div className="w-[50px] h-[250px] transition-all duration-300 transform mx-2 lg:w-[600px] 2xl:w-[37vw] lg:h-[450px] lg:mx-4"></div>
          </div>

          {HeroWorksData.map((item, index) => (
            <div key={index} className="inline-block flex-shrink-0">
              <div className="img-container w-[300px] h-[35vh] mr-40 transition-all duration-300 transform mx-2 relative opacity-60 lg:w-[550px] lg:h-[450px] lg:px-5 lg:mr-70 lg:mx-4">
                <img
                  className="w-full h-full object-cover absolute inset-0 rounded-lg shadow-lg z-20 cursor-pointer"
                  src={item.img}
                  alt={`Gate ${index + 1}`}
                  loading="eager"
                  onClick={(event) => handleNavigateToDetails(item.slug, event)}
                />
                <div className="img-detection w-[300px] h-5 absolute top-0 left-1/2 -translate-x-1/2 z-30"></div>
              </div>
              <p className="w-[68%] mt-5 lg:w-[70%] uppercase text-wrap text-center text-white font-bold -z-20 font-ursb text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {item.title}
              </p>
            </div>
          ))}

          <div ref={collectionDivRef} className="inline-block flex-shrink-0">
            <div className="img-container w-[300px] h-[300px] px-2 transition-all duration-300 transform mx-2 relative opacity-60 md:w-[450px] md:h-[450px] md:px-5 md:mx-4">
              <div className="img-detection w-[300px] h-5 absolute top-0 left-1/2 -translate-x-1/2 z-30"></div>
              <div className="w-full h-full flex flex-col items-center justify-center absolute inset-0 z-20 rounded-lg ">
                <h2 className="text-3xl text-center font-bold text-white mt-10 md:text-5xl md:mt-0">
                  Please View Our <br /> Gate Collection.
                </h2>
                <div className="mt-8 flex items-center justify-center gap-3 md:mt-14 z-40">
                  <button
                    onClick={handleViewMoreClick}
                    className="inline-block"
                  >
                    <Button
                      text="View More"
                      color="text-black"
                      bgColor="bg-amber-300"
                      src="/homepage/open-gate.svg"
                      secondSrc="/btn-handle.png"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
