import { Icon } from "@iconify/react/dist/iconify.js";
import { WorksData } from "../../../db/mockdata";
// import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const OurWorks = () => {
  // const recentworkRef = React.useRef<HTMLDivElement>(null);
  const recentRef = React.useRef<HTMLDivElement>(null);
  // const workRef = React.useRef<HTMLDivElement>(null);
  const recentDescRef = React.useRef<HTMLDivElement>(null);

  const navigate = useNavigate(); // Hook to navigate programmatically
  const locat = useLocation();

  useEffect(() => {
    if (locat.state?.scrollToTop) {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  }, [locat]);

  // useGSAP(
  //   () => {
  //     // Header animation
  //     const headerTl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: recentworkRef.current,
  //         start: "top 70%",
  //         end: "20% 50%",
  //         scrub: 1,
  //         // markers: true,
  //       },
  //     });

  //     headerTl.from(recentRef.current, {
  //       // x: 80,
  //       duration: 2,
  //     });

  //     headerTl.from(
  //       workRef.current,
  //       {
  //         x: 120,
  //         duration: 1,
  //       },
  //       "<"
  //     );

  //     headerTl.from(
  //       recentDescRef.current,
  //       {
  //         height: 0,
  //         transformOrigin: "bottom",
  //         duration: 1,
  //       },
  //       "<"
  //     );

  //     // Cards animation
  //     const cards = gsap.utils.toArray<HTMLDivElement>(".card");

  //     cards.forEach((card, index) => {
  //       const content = card.querySelector(".content") as HTMLDivElement;
  //       const image = card.querySelector(".image") as HTMLDivElement;
  //       const isEvenIndex = index % 2 === 0;

  //       const tl = gsap.timeline({
  //         scrollTrigger: {
  //           trigger: card,
  //           start: "top 70%",
  //           end: "top 40%",
  //           // markers: true,
  //           scrub: 2,
  //         },
  //       });

  //       tl.from(content, {
  //         x: isEvenIndex ? -120 : 120,
  //         opacity: 0,
  //         duration: 0.2,
  //       });

  //       tl.from(
  //         image,
  //         {
  //           x: isEvenIndex ? 200 : -200,
  //           rotate: isEvenIndex ? 10 : -10,
  //           duration: 0.2,
  //         },
  //         "<"
  //       );
  //     });
  //   },
  //   { scope: recentworkRef }
  // );

  const handleNavigateToDetails = (
    slug: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault(); // Optional, if you want to prevent the default behavior of the click.
    navigate(`/catalogue/${slug.replace(/\s+/g, "-")}`, { replace: true });
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  return (
    <main
      // ref={recentworkRef}
      className="w-11/12 mx-auto mt-20 relative pt-10 text-zinc-300"
    >
      <header className="md:flex items-center gap-40">
        <h1
          className="uppercase md:leading-[1] text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-amber-50 text-center md:text-left"
          ref={recentRef}
        >
          Our Designs
        </h1>
        <div className="md:flex justify-end items-center">
          <p
            className="w-full md:w-[60%] text-md md:text-lg lg:text-3xl text-center md:text-left mt-4 md:mt-0 font-light text-zinc-400 overflow-hidden"
            ref={recentDescRef}
          >
            Amidst the world of creativity, our clients deeply value and admire
            the work we craft.
          </p>
        </div>
      </header>

      <div className="py-10 md:pt-32 md:pb-32 space-y-12 relative z-[2] overflow-hidden">
        {WorksData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 card"
          >
            <div
              className={`w-full ${
                index % 2 === 0
                  ? "md:order-0 flex md:flex-col items-center justify-center"
                  : "md:order-2 flex md:flex-col items-center text-center justify-center"
              } content`}
            >
              <h1 className="uppercase text-4xl mb-4 text-center">
                {item.title}
              </h1>
            </div>
            <div
              className=" w-full cursor-pointer"
              onClick={(event) => handleNavigateToDetails(item.slug, event)} // Pass event here
            >
              <figure className="items-end justify-end group flex self-end image overflow-hidden rounded-3xl relative">
                <img
                  src={item.img}
                  alt={item.title}
                  width={800}
                  className="rounded-3xl h-[40vh] sm:h-[50vh] md:h-[60vh] object-cover group-hover:scale-[1.1] opacity-65 group-hover:opacity-80 transition-all ease-in-out duration-200"
                />
                <div className="hidden w-full rounded-3xl h-[60vh] transition-all ease-in-out duration-200 absolute group-hover:flex justify-end items-start text-2xl">
                  <div className="flex gap-2">
                    <Icon
                      icon="system-uicons:arrow-top-right"
                      className="text-4xl text-zinc-400"
                    />
                  </div>
                </div>
              </figure>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default OurWorks;
