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
  // const recentRef = React.useRef<HTMLDivElement>(null);
  // const workRef = React.useRef<HTMLDivElement>(null);
  // const recentDescRef = React.useRef<HTMLDivElement>(null);

  const navigate = useNavigate(); // Hook to navigate programmatically
  const locat = useLocation();

  // const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth > 1024); // State to track screen size

  // Effect to update the screen size on window resize
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsDesktop(window.innerWidth > 1024);
  //   };

  //   window.addEventListener("resize", handleResize);

  //   // Clean up on component unmount
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    if (locat.state?.scrollToTop) {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  }, [locat]);

  // useGSAP(
  //   () => {
  //     if (!isDesktop) return; // Skip animation if not desktop

  //     // Header animation
  //     const headerTl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: recentworkRef.current,
  //         start: "top 70%",
  //         end: "20% 50%",
  //         scrub: 1,
  //       },
  //     });

  //     headerTl.from(recentRef.current, {
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
      className="w-11/12 mx-auto mt-60 relative py-10 text-zinc-300"
    >
      <header className="">
        <h1
          className="uppercase md:leading-[1] text-4xl md:text-5xl lg:text-[4.7vw] text-amber-50"
          // ref={recentRef}
        >
          Our <span className="text-primary">Designs</span>
        </h1>
        <div className="">
          <p
            className="w-2/3 lg:w-3/11 mt-4 text-zinc-400 text-xl lg:text-[1.3vw]"
            // ref={recentDescRef}
          >
            Amidst the world of creativity, our clients deeply value and admire
            the work we craft.
          </p>
        </div>
      </header>

      <div className="py-10 md:pt-32 md:pb-32 relative z-[2] overflow-hidden grid grid-cols-1 gap-y-10 lg:grid-cols-2 gap-x-30">
        {WorksData.map((item, index) => (
          <div key={index} className="card">
            <div
              className={`w-full cursor-pointer ${
                index % 2 == 0 ? "" : "lg:mt-50"
              }`}
              onClick={(event) => handleNavigateToDetails(item.slug, event)}
            >
              <figure
                className={`items-end justify-end group flex self-end image overflow-hidden rounded-3xl relative bg-[#0e0e0e] hover:bg-[#121212]`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  width={800}
                  className="w-full rounded-3xl h-[40vh] sm:h-[50vh] md:h-[60vh] object-cover group-hover:scale-[1.1] opacity-65 group-hover:opacity-80 transition-all ease-in-out duration-200"
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
            <div className={`w-full mt-5`}>
              <h1 className="uppercase text-xl sm:text-2xl md:text-3xl lg:text-[2.3vw] text-center">
                {item.title}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default OurWorks;
