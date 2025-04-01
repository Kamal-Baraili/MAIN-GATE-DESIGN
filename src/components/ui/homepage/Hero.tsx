import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../../shared/button/button";
import { WorksData } from "../../../db/mockdata";
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
  // const [slideWidth, setSlideWidth] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Store scroll trigger reference to kill it when needed
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Add this function to calculate the initial and final positions
  const calculateSliderPositions = () => {
    const images = mainRef.current;
    const redDiv = redDivRef.current;

    if (!images || !redDiv) return { initialOffset: 0, finalOffset: 0 };

    // Get first image and collection div
    const firstImageContainer = images.querySelector(
      ".img-container"
    ) as HTMLElement;
    const collectionDiv = collectionDivRef.current;

    if (!firstImageContainer || !collectionDiv)
      return { initialOffset: 0, finalOffset: 0 };

    // Calculate centers
    const redDivRect = redDiv.getBoundingClientRect();
    const redDivCenter = redDivRect.left + redDivRect.width / 2;

    // First image center position
    const firstImageRect = firstImageContainer.getBoundingClientRect();
    const firstImageCenter = firstImageRect.left + firstImageRect.width / 2;

    // Collection div center position
    const collectionRect = collectionDiv.getBoundingClientRect();
    const collectionCenter = collectionRect.left + collectionRect.width / 2;

    // Calculate offsets needed to center elements
    const initialOffset = redDivCenter - firstImageCenter;
    const finalOffset = redDivCenter - collectionCenter;

    return { initialOffset, finalOffset };
  };

  const handleNavigateToDetails = (
    slug: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault(); // Optional, if you want to prevent the default behavior of the click.
    navigate(`/catalogue/${slug.replace(/\s+/g, "-")}`, { replace: true });
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  const handleViewMoreClick = () => {
    navigate("/catalogue", { state: { scrollToTop: true } });
  };

  // Updated function for mobile slider navigation with improved centering
  const handleSlideChange = (direction: "next" | "prev") => {
    const images = mainRef.current;
    const redDiv = redDivRef.current;
    if (!images || !redDiv) return;

    const totalSlides = WorksData.length + 1; // +1 for the collection div

    let newSlide = currentSlide;
    if (direction === "next") {
      newSlide = Math.min(currentSlide + 1, totalSlides - 1);
    } else {
      newSlide = Math.max(currentSlide - 1, 0);
    }

    if (newSlide === currentSlide) return;

    setCurrentSlide(newSlide);

    // Get all image containers including the collection div
    const allContainers = Array.from(
      images.querySelectorAll(".img-container")
    ) as HTMLElement[];

    if (allContainers.length === 0) return;

    const targetContainer = allContainers[newSlide];

    if (!targetContainer) return;

    // Calculate the exact position needed to center the target with the red div
    const redDivRect = redDiv.getBoundingClientRect();
    const redDivCenter = redDivRect.left + redDivRect.width / 2;

    const targetRect = targetContainer.getBoundingClientRect();
    const targetCenter = targetRect.left + targetRect.width / 2;

    // Calculate the offset needed
    const exactOffset = redDivCenter - targetCenter;
    const currentTransform = gsap.getProperty(images, "x") as number;
    const newPosition = currentTransform + exactOffset;

    // Animate to the position
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

  // Improved spotlight function with more reliable detection for desktop
  const updateSpotlight = () => {
    const images = mainRef.current;
    const redDiv = redDivRef.current;
    const hangingLamp = hangingLampRef.current;

    if (!images || !redDiv) {
      console.log("Missing references for spotlight");
      console.log(hangingLamp)
      if (redDiv) {
        gsap.to(redDiv, { opacity: 0, duration: 0.2 });
      }
      return;
    }

    // Get all image containers for more reliable container-based detection
    const imgContainers = Array.from(
      images.querySelectorAll(".img-container")
    ) as HTMLElement[];

    if (imgContainers.length === 0) {
      console.log("No image containers found");
      return;
    }

    const redDivRect = redDiv.getBoundingClientRect();
    const redDivCenter = redDivRect.left + redDivRect.width / 2;
    let isOverlapping = false;
    let closestContainer = null;
    let minDistance = Infinity;

    // Different detection method for desktop and mobile
    if (isDesktop) {
      // For desktop: Find the closest container to the spotlight center
      imgContainers.forEach((container) => {
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        // Calculate distance between centers
        const distance = Math.abs(redDivCenter - containerCenter);

        // Track the closest container
        if (distance < minDistance) {
          minDistance = distance;
          closestContainer = container;
        }

        // Reset all containers first
        gsap.to(container, {
          opacity: 0.6,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      });

      // Threshold for considering a container as "under" the spotlight
      const threshold = Math.min(170, window.innerWidth * 0.12); // Adaptive threshold

      // If we found a container close enough to the spotlight
      if (closestContainer && minDistance < threshold) {
        isOverlapping = true;

        // Highlight the closest container
        gsap.to(closestContainer, {
          opacity: 1,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });

        // Show the red beam
        gsap.to(redDiv, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        // Update current slide
        const slideIndex = imgContainers.indexOf(closestContainer);
        if (slideIndex >= 0 && slideIndex !== currentSlide) {
          setCurrentSlide(slideIndex);
        }
      } else {
        // Hide the red beam if no container is close enough
        gsap.to(redDiv, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    } else {
      // For mobile: Keep the original center-based detection with detection points
      const imgDetectionPoints = Array.from(
        images.querySelectorAll(".img-detection")
      ) as HTMLElement[];

      const threshold = 50; // mobile threshold

      imgDetectionPoints.forEach((imgPoint) => {
        const imgPointRect = imgPoint.getBoundingClientRect();
        const parentContainer = imgPoint.closest(
          ".img-container"
        ) as HTMLElement;

        if (!parentContainer) return;

        // Calculate center distance
        const imgPointCenter = imgPointRect.left + imgPointRect.width / 2;
        const overlapping = Math.abs(redDivCenter - imgPointCenter) < threshold;

        if (overlapping) {
          isOverlapping = true;
          gsap.to(parentContainer, {
            opacity: 1,
            scale: 1.1,
            duration: 0.2,
            ease: "power2.out",
          });

          // Ensure we set the current slide based on the active element
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

      // Mobile behavior for red div
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

    // Reset red beam opacity
    if (redDivRef.current) {
      gsap.to(redDivRef.current, { opacity: 0 });
    }
  };

  // Setup for desktop scrolling behavior
  const setupDesktopScrolling = () => {
    const heroContainer = heroContainerRef.current;
    const images = mainRef.current;
    const redDiv = redDivRef.current;
    const wrapper = wrapperRef.current;
    const collectionDiv = collectionDivRef.current;

    if (!heroContainer || !images || !redDiv || !wrapper || !collectionDiv)
      return;

    // Store scroll position in sessionStorage to handle page reload
    const savedScrollPosition = sessionStorage.getItem("heroScrollPosition");

    // Calculate initial position to center first image with red beam
    const { initialOffset } = calculateSliderPositions();

    // Set initial state of Hero to be invisible
    gsap.set(wrapper, { opacity: 0 });
    // Apply initial offset to center first image
    gsap.set(images, { x: initialOffset });

    let totalWidth = images.scrollWidth;
    let lastElementOffset = 0;

    // Calculate distance to center the last element
    const calculateScrollDistance = () => {
      const collectionRect = collectionDiv.getBoundingClientRect();
      const mainRect = images.getBoundingClientRect();

      // Distance from the start of the container to the center of the collection div
      lastElementOffset =
        collectionRect.left - mainRect.left + collectionRect.width / 2;

      // Distance to scroll to center the last element in the viewport
      const scrollDistance = lastElementOffset - window.innerWidth / 2;

      return scrollDistance;
    };

    let scrollDistance = calculateScrollDistance();
    let lastScrollY = window.scrollY;
    let scrolledDistance = 0;
    let translateX = initialOffset; // Start with initial offset
    let heroPinPosition = 0;
    let isTouching = false;
    let touchStartX = 0;
    let touchStartY = 0;

    const updateDimensions = () => {
      totalWidth = images.scrollWidth;
      scrollDistance = calculateScrollDistance();
      wrapper.style.height = `${window.innerHeight + scrollDistance}px`;
    };

    const initializeScroll = () => {
      updateDimensions();
      console.log(
        "Total width:",
        totalWidth,
        "Scroll distance:",
        scrollDistance,
        "Last element offset:",
        lastElementOffset,
        "Initial offset:",
        initialOffset
      );

      // Apply initial offset
      gsap.set(images, { x: initialOffset });
      updateSpotlight();
      console.log(lastScrollY);
      console.log(isPinned);

      // If there's a saved scroll position, use it
      if (savedScrollPosition) {
        const savedPosition = parseInt(savedScrollPosition, 10);
        window.scrollTo(0, savedPosition);

        // Manually trigger scroll handling for the saved position
        handleScroll();
      } else {
        handleScroll();
      }
    };

    const handleScroll = () => {
      if (isTouching) return;

      const currentScrollY = window.scrollY;
      const wrapperRect = wrapper.getBoundingClientRect();

      // Save current scroll position to sessionStorage
      sessionStorage.setItem("heroScrollPosition", currentScrollY.toString());

      if (wrapperRect.top > 0) {
        setIsPinned(false);
        scrolledDistance = 0;
        translateX = initialOffset; // Reset to initial offset instead of 0
        gsap.set(images, { x: initialOffset });
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

        // Calculate final position considering initial offset
        const { finalOffset } = calculateSliderPositions();
        const targetX =
          initialOffset -
          progress * (initialOffset - finalOffset + scrollDistance);
        translateX = targetX;

        gsap.set(images, { x: translateX });

        // Throttle the spotlight updates for better performance
        // Use requestAnimationFrame to ensure smooth updates
        if (!window.requestAnimationFrame) {
          updateSpotlight();
        } else {
          window.requestAnimationFrame(() => {
            updateSpotlight();
          });
        }
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

        // Apply initial offset to touch movement as well
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
          },
        });
      },
      onLeaveBack: () => {
        tl.to(wrapper, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            setIsPinned(false);
          },
        });
      },
    });

    pinTriggerRef.current = pinTrigger;

    // FIXED: Set initial red div opacity to 0 for both desktop and mobile
    gsap.set(redDiv, { opacity: 0 });
    initializeScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    // Add event listener for page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Reinitialize scroll when page becomes visible again
        initializeScroll();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Clean up event listeners
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      // Clear saved scroll position on component unmount
      sessionStorage.removeItem("heroScrollPosition");

      gsap.set(images, { x: 0 });
      resetSpotlight();

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

  // Improved setup for mobile slider behavior with touch swipe
  const setupMobileSlider = () => {
    const images = mainRef.current;
    const redDiv = redDivRef.current;
    const wrapper = wrapperRef.current;
    const heroContainer = heroContainerRef.current;

    if (!images || !redDiv || !wrapper || !heroContainer) return;

    // Set wrapper to be visible
    gsap.set(wrapper, { opacity: 1 });

    // Calculate initial position to center first image
    const { initialOffset } = calculateSliderPositions();

    // Reset to first slide with correct initial position
    setCurrentSlide(0);
    gsap.set(images, { x: initialOffset });

    // Add touch event handlers for mobile swipe functionality
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
          // Swipe left - next slide
          handleSlideChange("next");
        } else {
          // Swipe right - previous slide
          handleSlideChange("prev");
        }
      }
    };

    // Add event listeners for mobile swiping
    heroContainer.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    heroContainer.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    // Add forced rendering to ensure elements appear
    setTimeout(() => {
      if (images && redDiv) {
        // Force redraw by accessing offsetHeight
        images.offsetHeight;
        redDiv.offsetHeight;

        // Run initial spotlight update
        updateSpotlight();

        // Measure all image containers
        const imgContainers = Array.from(
          images.querySelectorAll(".img-container")
        ) as HTMLElement[];

        // Make sure first image starts at full opacity
        if (imgContainers.length > 0) {
          gsap.set(imgContainers[0], {
            opacity: 1,
            scale: 1.1,
          });
        }
      }
    }, 100);

    return () => {
      gsap.set(images, { x: 0 });
      resetSpotlight();

      // Remove event listeners
      heroContainer.removeEventListener("touchstart", handleTouchStart);
      heroContainer.removeEventListener("touchend", handleTouchEnd);
    };
  };

  // Check screen size and initialize appropriate behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      setIsDesktop(isLargeScreen);

      // Kill existing animations and event listeners before switching modes
      if (pinTriggerRef.current) {
        pinTriggerRef.current.kill();
        pinTriggerRef.current = null;
      }

      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      // Reset any transformations
      const images = mainRef.current;
      if (images) {
        // Calculate initial position
        const { initialOffset } = calculateSliderPositions();
        gsap.set(images, { x: initialOffset });
      }

      // Setup appropriate behavior based on screen size
      if (isLargeScreen) {
        const cleanup = setupDesktopScrolling();
        return cleanup;
      } else {
        const cleanup = setupMobileSlider();
        return cleanup;
      }
    };

    const cleanup = checkScreenSize();

    // Add resize listener to switch modes when screen size changes
    window.addEventListener("resize", checkScreenSize);

    return () => {
      if (cleanup) cleanup();
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="w-11/12 mx-auto relative">
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
          className="w-[350px] h-[85vh] lg:h-[800px] absolute top-25 left-1/2 -translate-x-1/2 z-10 lg:w-[750px] lg:top-[40px]"
        >
          <img
            className="w-full h-full"
            src="/homepage/light-beam2.png"
            alt="Light Beam"
          />
        </div>

        {/* Mobile navigation buttons - only show on smaller screens */}
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
                currentSlide === WorksData.length
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-amber-400"
              }`}
              disabled={currentSlide === WorksData.length}
            >
              <Icon className="text-2xl" icon="tabler:arrow-right" />
            </button>
          </div>
        )}

        <div
          ref={mainRef}
          className="flex pt-60 px-4 whitespace-nowrap will-change-transform lg:pt-50 lg:px-40 relative z-20"
        >
          {/* Spacer for better initial positioning */}
          <div className="hidden lg:inline-block flex-shrink-0">
            <div className="w-[50px] h-[250px] transition-all duration-300 transform mx-2 lg:w-[405px] lg:h-[450px] lg:mx-4"></div>
          </div>

          {/* Map through image data with key elements fixed */}
          {WorksData.map((item, index) => (
            <div key={index} className="inline-block flex-shrink-0">
              <div className="img-container w-[300px] h-[300px] mr-40 transition-all duration-300 transform mx-2 relative opacity-60 lg:w-[450px] lg:h-[450px] lg:px-5 lg:mr-120 lg:mx-4">
                <img
                  className="w-full h-full object-cover absolute inset-0 rounded-lg shadow-lg z-20 cursor-pointer"
                  src={item.img}
                  alt={`Gate ${index + 1}`}
                  loading="eager" // Force eager loading
                  onClick={(event) => handleNavigateToDetails(item.slug, event)}
                />
                <div className="img-detection w-[1px] h-5 absolute top-0 left-1/2 -translate-x-1/2 z-30"></div>
              </div>
              <p className="w-[80%] mt-5 lg:w-1/2 uppercase text-wrap text-center text-white font-bold -z-20 font-ursb text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {item.title}
              </p>
            </div>
          ))}

          {/* Collection div at the end */}
          <div ref={collectionDivRef} className="inline-block flex-shrink-0">
            <div className="img-container w-[300px] h-[300px] px-2 transition-all duration-300 transform mx-2 relative opacity-60 md:w-[450px] md:h-[450px] md:px-5 md:mx-4">
              <div className="img-detection w-[1px] h-5 absolute top-0 left-1/2 -translate-x-1/2 z-30"></div>
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
