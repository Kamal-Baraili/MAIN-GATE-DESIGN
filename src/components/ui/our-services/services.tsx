import { useState, useEffect } from "react";
import { servicesTitles } from "../../../db/mockdata";

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [imgSource, setImgSource] = useState("/our works/our-works-img1.jpg");

  // Add useEffect to handle image transition with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setImgSource(servicesTitles[hoveredIndex].imgSrc);
    }, 10); // 150ms delay for image transition

    return () => clearTimeout(timer); // Cleanup timeout on unmount or change
  }, [hoveredIndex]);

  return (
    <div className="h-auto py-30 rounded-t-4xl border-t border-t-zinc-800">
      <div className="w-10/11 mx-auto flex flex-row-reverse gap-10">
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg text-primary">Services</h3>
            <h2 className="uppercase text-6xl text-amber-50 tracking-wide">
              enjoy your favourite design
            </h2>
            <p className="text-zinc-400">
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
                  onMouseEnter={() => {
                    setHoveredIndex(ind);
                  }}
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
        <div className="w-full flex items-center">
          <img
            className="w-full h-[60vh] rounded-4xl object-cover transition-opacity duration-300 ease-in-out"
            src={imgSource}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
