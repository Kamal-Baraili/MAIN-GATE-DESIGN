import { WorkdsData } from "../../../db/mockdata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const OurWorks = () => {
  const recentworkRef = React.useRef<HTMLDivElement>(null);
  const recentRef = React.useRef<HTMLDivElement>(null);
  const workRef = React.useRef<HTMLDivElement>(null);
  const recentDescRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: recentworkRef.current,
          start: "top 70%",
          end: "20% 50%",
          scrub: 1,
          // markers: true,
        },
      });

      headerTl.from(recentRef.current, {
        x: 80,
        duration: 2,
      });

      headerTl.from(
        workRef.current,
        {
          x: 120,
          duration: 1,
        },
        "<"
      );

      headerTl.from(
        recentDescRef.current,
        {
          height: 0,
          transformOrigin: "bottom",
          duration: 1,
        },
        "<"
      );

      // Cards animation
      const cards = gsap.utils.toArray<HTMLDivElement>(".card");

      cards.forEach((card, index) => {
        const content = card.querySelector(".content") as HTMLDivElement;
        const image = card.querySelector(".image") as HTMLDivElement;
        const isEvenIndex = index % 2 === 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            end: "top 30%",
            // markers: true,
            scrub: 2,
          },
        });

        tl.from(content, {
          x: isEvenIndex ? -120 : 120,
          opacity: 0,
          duration: 0.2,
        });

        tl.from(
          image,
          {
            x: isEvenIndex ? 200 : -200,
            rotate: isEvenIndex ? 10 : -10,
            duration: 0.2,
          },
          "<"
        );
      });
    },
    { scope: recentworkRef }
  );

  return (
    <main
      ref={recentworkRef}
      className="w-11/12 mx-auto mt-20 relative pt-10 text-zinc-300"
    >
      <header className="flex items-center gap-40">
        <h1
          className="uppercase leading-[1] text-7xl text-amber-50"
          ref={recentRef}
        >
          Recent Works
        </h1>
        <div className="flex justify-end items-center">
          <p
            className="text-3xl w-[60%] font-light overflow-hidden"
            ref={recentDescRef}
          >
            Amidst the world of creativity, our clients deeply value and admire
            the work we craft.
          </p>
        </div>
      </header>

      <div className="py-32 space-y-12 relative z-[2]">
        {WorkdsData.map((item, index) => (
          <div key={index} className="grid grid-cols-2 items-center gap-4 card">
            <div
              className={`${
                index % 2 === 0
                  ? "order-0 flex flex-col items-start justify-end"
                  : "order-2 flex flex-col items-end text-right justify-end"
              } col-span-1 content`}
            >
              <h1 className="uppercase text-4xl mb-4 text-left">
                {item.title}
              </h1>
              <p className="text-xl text-zinc-600">{item.desc}</p>
            </div>
            <figure className=" w-[100%] items-end justify-end flex self-end image overflow-hidden rounded-3xl">
              <img
                src={item.img}
                alt={item.title}
                width={700}
                className="rounded-3xl h-[40vh] object-cover hover:scale-[1.3] opacity-65 hover:opacity-80 transition-all ease-in-out duration-200"
              />
            </figure>
          </div>
        ))}
      </div>
    </main>
  );
};

export default OurWorks;
