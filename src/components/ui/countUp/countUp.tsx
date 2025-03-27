import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

const Counter = () => {
  const servicepointsRef = useRef<HTMLDivElement>(null);
  const [countersKey, setCountersKey] = useState(0);

  // Use react-intersection-observer to detect when the component is in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    // Remove triggerOnce to allow repeated triggers
  });

  // Animation for card movements
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLDivElement>(".card");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: servicepointsRef.current,
          start: "25% 100%",
          end: "bottom bottom",
          scrub: 1,
          // markers: true,
        },
      });

      cards.forEach((card, index) => {
        const isEvenIndex = index % 2 === 0;
        tl.fromTo(
          card,
          {
            x: isEvenIndex ? -160 : 160,
            rotate: isEvenIndex ? -20 : 20,
            opacity: 0,
          },
          {
            x: 0,
            rotate: 0,
            opacity: 1,
          }
          // index * 0.1
        );
      });
    },
    { scope: servicepointsRef }
  );

  // Update counters when in view
  React.useEffect(() => {
    if (inView) {
      // Increment key to force re-render and restart CountUp
      setCountersKey((prev) => prev + 1);
    }
  }, [inView]);

  // Combine refs
  const combinedRef = React.useCallback(
    (el: HTMLDivElement | null) => {
      servicepointsRef.current = el;
      inViewRef(el);
    },
    [inViewRef]
  );

  return (
    <>
      <div className="w-11/12 mx-auto ">
        <h2 className="text-6xl text-amber-50 tracking-wide">Achievements</h2>
      </div>
      <div
        className="w-11/12 mx-auto relative py-20 text-white"
        ref={combinedRef}
      >
        <div className="grid grid-cols-2 gap-x-20 gap-y-8">
          {services.map((item, index) => (
            <div
              key={index}
              className={`${
                index % 2 == 0 ? "mt-0" : "mt-8"
              } h-[45vh] bg-zinc-900 group flex justify-between text-right cursor-pointer ease-in-out duration-200 p-8 rounded-3xl card  ${
                index === 0 && "hover:bg-[#C93202]"
              } ${index === 1 && "hover:bg-[#A1C9B8]"} ${
                index === 2 && "hover:bg-[#C8D1D1]"
              } ${index === 3 && "hover:bg-[#DECF3E]"} `}
            >
              <div className="flex items-start">
                <h2 className="text-8xl">
                  <CountUp
                    key={`counter-${countersKey}-${index}`}
                    start={0}
                    end={
                      index === 0 ? 5 : index === 1 ? 10 : index === 2 ? 8 : 6
                    }
                    duration={4}
                  />
                </h2>
                <span className="text-5xl">+</span>
              </div>
              <div className="flex flex-col justify-end h-full">
                <div className="text-[1.8vw] font-thebold text-zinc-400 group-hover:text-black ease-in-out duration-100 uppercase font-medium flex flex-col justify-start">
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Counter;

const services = [
  {
    title: (
      <>
        <h2>AWARDS &</h2>
        <h2>RECOGNITION</h2>
      </>
    ),
  },
  {
    title: (
      <>
        <h2>PROJECTS</h2>
        <h2>COMPLETED</h2>
      </>
    ),
  },
  {
    title: (
      <>
        <h2>CREATIVE</h2>
        <h2>MINDS</h2>
      </>
    ),
  },
  {
    title: (
      <>
        <h2>YEARS OF</h2>
        <h2>EXPERIENCE</h2>
      </>
    ),
  },
];
