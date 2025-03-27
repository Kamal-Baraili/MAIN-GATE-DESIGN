import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const MainGateHero = () => {
  const box1 = useRef<HTMLDivElement | null>(null);
  const box2 = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const textThirdRef = useRef<HTMLDivElement | null>(null);
  const heading1 = useRef<HTMLHeadingElement | null>(null);
  const heading2 = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (
      box1.current &&
      box2.current &&
      container.current &&
      textRef.current &&
      textThirdRef.current &&
      heading1.current &&
      heading2.current
    ) {
      // Set initial states
      gsap.set([box1.current, box2.current], { x: "0%" });
      gsap.set(textRef.current, { y: "0%", opacity: 1 });
      gsap.set(heading1.current, { opacity: 1, y: "0%" });
      gsap.set(heading2.current, {
        opacity: 1,
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: 50,
        clipPath: "inset(0 0 50% 0)",
        transformOrigin: "center center",
      });
      gsap.set(textThirdRef.current, { y: "2%", opacity: 0 });
      gsap.set(container.current, { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=600%",
          scrub: 1,
          pin: true,
          toggleActions: "play none none reverse", // Reverse animation when scrolling back up
          onLeave: () => {
            gsap.to(container.current, { opacity: 0, duration: 1 }); // Ensure fade-out
          },
          onEnterBack: () => {
            gsap.to(container.current, { opacity: 1, duration: 1 }); // Fade in when scrolling back up
          },
        },
      });

      tl.to(box1.current, {
        x: "-100%",
        ease: "power2.inOut",
        duration: 5,
      })
        .to(
          box2.current,
          {
            x: "100%",
            ease: "power2.inOut",
            duration: 5,
          },
          "<"
        )
        .to(
          heading1.current,
          {
            y: "-10%",
            opacity: 0,
            ease: "power2.inOut",
            duration: 2,
          },
          ">-3"
        )
        .to(
          heading2.current,
          {
            yPercent: -50,
            clipPath: "inset(0 0 -30% 0)",
            ease: "power1.inOut",
            duration: 2,
          },
          "<1"
        )
        .to(
          heading2.current,
          {
            y: "-10%",
            opacity: 0,
            ease: "power2.inOut",
            duration: 2,
          },
          ">1"
        )
        .to(
          textThirdRef.current,
          {
            y: 0,
            opacity: 1,
            ease: "power2.inOut",
            duration: 2,
          },
          ">0.1"
        )
        .to(
          container.current,
          {
            opacity: 0,
            ease: "power2.inOut",
            duration: 1,
          },
          ">1"
        );

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <div ref={container} className="h-screen overflow-hidden bg-[#F7F4F4]">
      <div className="flex justify-between absolute inset-0">
        <div ref={box1} className="h-full w-1/2">
          <img
            src="/homepage/left-gate.jpg"
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div ref={box2} className="h-full w-1/2">
          <img
            src="/homepage/right-gate.jpg"
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
      </div>

      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -z-70"
      >
        <h2 ref={heading1} className="text-5xl font-bold text-[#F5C230]">
          Welcome
        </h2>
        <h2 ref={heading2} className="text-5xl font-bold text-[#F5C230]">
          To Main Gate design
        </h2>
      </div>

      <div
        ref={textThirdRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-5 opacity-0"
      >
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-4xl font-medium text-[#F5C230]">
            Step Into a World of Unmatched Gate Designs.
          </h2>
          <h2 className="text-4xl font-medium text-[#F5C230]">
            Your Ultimate Destination for Style and Protection.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MainGateHero;
