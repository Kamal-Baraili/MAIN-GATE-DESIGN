import { cn } from "../../../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ServicesCard from "../../shared/card/servicesCard";
import { JSX } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    icon: JSX.Element;
    title: string;
    desc: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    if (!mainRef.current || !containerRef.current) return;

    const cards = mainRef.current.children;
    const cardWidth = cards[0]?.getBoundingClientRect().width || 0;
    const totalScrollWidth = mainRef.current.scrollWidth;

    // Calculate the width of exactly 3 cards
    const initialVisibleWidth = cardWidth * 3;

    // Only scroll if there are more than 3 cards and on desktop (1024px and above)
    if (mediaQuery.matches && items.length > 3) {
      // Adjust scroll distance to start after 3 cards are visible
      const scrollDistance = totalScrollWidth - initialVisibleWidth - 120;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom top",
          pin: true,
          scrub: 0.5,
          // markers: true, // Uncomment for debugging
        },
      });

      tl.to(mainRef.current, {
        x: -scrollDistance,
        duration: 5,
        ease: "none",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [items.length]);

  return (
    <div ref={containerRef} className="overflow-x-hidden w-full px-0">
      <div
        ref={mainRef}
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-4 lg:flex mt-30 lg:gap-6", // Changed to grid with 1 column, flex on lg (1024px) and up
          className
        )}
        style={{
          // Only apply maxWidth on desktop
          ...(window.innerWidth >= 1024 && {
            maxWidth: `${((400 * 3 + 6 * 2) / window.innerWidth) * 100}vw`, // Use vw calculation instead of px
          }),
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="relative group block p-2 h-full w-full"
            style={{
              width: window.innerWidth >= 1024 ? "29.44vw" : "full", // Use vw for desktop width
              flex: window.innerWidth >= 1024 ? "0 0 29.44vw" : "1 1 100%", // Flex on desktop, full width on mobile
            }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="p-2 absolute inset-0 h-full w-full bg-zinc-900 dark:bg-slate-800/[0.8] block rounded-2xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              <ServicesCard item={item} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full bg-black border border-transparent relative z-20",
        className
      )}
      style={{
        width: "100%", // Fill the parent container
        maxWidth: window.innerWidth >= 1024 ? "29.44vw" : "full", // Use vw for maxWidth instead of px
      }}
    >
      <div className="relative z-50">
        <div>{children}</div>
      </div>
    </div>
  );
};
