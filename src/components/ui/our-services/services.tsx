import { useState, useEffect, useRef } from "react";
import { servicesTitles } from "../../../db/mockdata";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [imgSource, setImgSource] = useState<string>(
    "/our works/our-works-img1.jpg"
  );
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false); // Track screen size

  // Refs for animation targets
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const serviceItemsRef = useRef<HTMLDivElement[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);

  // Helper function to add refs to service items array
  const addToServiceItemsRef = (el: HTMLDivElement | null) => {
    if (el && !serviceItemsRef.current.includes(el)) {
      serviceItemsRef.current.push(el);
    }
  };

  // Detect screen width change (greater than 1024px)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsLargeScreen(mediaQuery.matches);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsLargeScreen(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Clean up on unmount
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Handle image transition with delay
  useGSAP(() => {
    const timer = setTimeout(() => {
      setImgSource(servicesTitles[hoveredIndex].imgSrc);
    }, 1);

    return () => clearTimeout(timer);
  }, [hoveredIndex]);

  // GSAP animations (only trigger if isLargeScreen is true)
  useEffect(() => {
    if (!isLargeScreen) return; // Skip animation for small screens

    // Animation for subtitle (h3)
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    // Animation for main title (h2)
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    // Animation for paragraph
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    // Animation for service items
    if (serviceItemsRef.current.length > 0) {
      gsap.fromTo(
        serviceItemsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15, // Stagger effect for each item
          ease: "power2.out",
          scrollTrigger: {
            trigger: serviceItemsRef.current[0], // Use first item as trigger
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    // Animation for image
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLargeScreen]); // Re-run animations when the screen size changes

  return (
    <div className="h-auto pb-20 py-0 md:py-30 rounded-t-4xl">
      <div className="w-10/11 mx-auto flex flex-col-reverse lg:flex-row-reverse gap-4 md:gap-10">
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <h3 ref={subtitleRef} className="text-lg text-primary">
              Services
            </h3>
            <h2
              ref={titleRef}
              className="uppercase text-3xl lg:text-6xl text-amber-50 tracking-wide text-wrap"
            >
              enjoy your favourite design
            </h2>
            <p ref={textRef} className="text-sm md:text-base text-zinc-400">
              Enjoy your favorite design with a custom gate that perfectly
              reflects your style. Whether you prefer a modern, traditional, or
              unique look, we offer a wide range of customizable options to suit
              your taste. Crafted with high-quality materials and expert
              craftsmanship, our gates provide both beauty and functionality,
              giving you an entrance that stands out every time you come home.
            </p>
          </div>
          <div className="mt-6">
            {servicesTitles.map((k, ind) => (
              <div key={ind}>
                <div
                  ref={addToServiceItemsRef}
                  onMouseEnter={() => setHoveredIndex(ind)}
                  onMouseLeave={() => setHoveredIndex(0)}
                  className={`flex justify-between py-4 border-b border-b-zinc-800 cursor-default transition-colors duration-300 ease-in-out ${
                    hoveredIndex === ind ? "text-primary" : "text-zinc-400"
                  }`}
                >
                  <span>{k.number}</span>
                  <span>{k.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full hidden md:flex items-center">
          <img
            ref={imageRef}
            className="w-full h-[60vh] rounded-4xl object-cover transition-opacity duration-300 ease-in-out"
            src={imgSource}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
