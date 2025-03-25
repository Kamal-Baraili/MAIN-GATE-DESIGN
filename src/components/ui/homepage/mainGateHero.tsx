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

  useEffect(() => {
    if (
      box1.current &&
      box2.current &&
      container.current &&
      textRef.current &&
      textThirdRef.current
    ) {
      // Set initial states
      gsap.set([box1.current, box2.current], { x: "0%" });
      gsap.set(textRef.current, { y: "0%", scale: 1, opacity: 1 });
      gsap.set(textThirdRef.current, { y: "0%", opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=300%", // Extended duration for multiple scrolls
          scrub: 1,
          pin: true,
          toggleActions: "play none none none",
        },
      });

      // Animation sequence
      tl
        // Move the gates - 5s duration
        .to(box1.current, {
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
          "<" // Sync with box1
        )
        // Fade out first text (Welcome)
        .to(
          textRef.current,
          {
            y: "-10%",
            scale: 4,
            opacity: 0,
            ease: "power2.inOut",
            duration: 2,
          },
          ">-1" // Starts 2s before gates finish
        )
        // Fade in second text
        // .to(
        //   textSecondRef.current,
        //   {
        //     y: "-10%",
        //     opacity: 1,
        //     ease: "power2.inOut",
        //     duration: 2,
        //   },
        //   ">1" // 2s after first text fades
        // )
        // // Fade out second text
        // .to(
        //   textSecondRef.current,
        //   {
        //     y: "-20%",
        //     opacity: 0,
        //     ease: "power2.inOut",
        //     duration: 2,
        //   },
        //   ">-1" // 2s after second text appears
        // );
        // Fade in third text
        .to(
          textThirdRef.current,
          {
            y: "-10%",
            opacity: 1,
            ease: "power2.inOut",
            duration: 2,
          },
          ">1" // 2s after second text fades
        );

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <>
      <div ref={container} className="h-screen overflow-hidden bg-[#F7F4F4]">
        <div className="flex justify-between absolute inset-0">
          <div ref={box1} className="h-full w-1/2 ">
            <img
              src="/homepage/left-gate.jpg"
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
          <div ref={box2} className="h-full w-1/2 ">
            <img
              src="/homepage/right-gate.jpg"
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
        </div>

        <div
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-0"
        >
          <h2 ref={heading1} className="text-5xl font-bold text-[#F5C230]">
            Welcome To Main Gate Design
          </h2>
        </div>

        {/* <div
          ref={textSecondRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-5 opacity-0"
        >
          <h2 className="text-4xl font-bold text-[#F5C230]">
            The Gate has been opened
          </h2>
        </div> */}

        <div
          ref={textThirdRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-5 opacity-0"
        >
          <h2 className="text-4xl font-bold text-[#F5C230]">
            You've Entered inside the heaven of gates.
          </h2>
        </div>
      </div>
    </>
  );
};

export default MainGateHero;
