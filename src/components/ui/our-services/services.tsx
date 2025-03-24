import { useState, useEffect } from "react";

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [imgSource, setImgSource] = useState("/our works/our-works-img1.jpg");

  // Add useEffect to handle image transition with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setImgSource(servicesTitles[hoveredIndex].imgSrc);
    }, 300); // 150ms delay for image transition

    return () => clearTimeout(timer); // Cleanup timeout on unmount or change
  }, [hoveredIndex]);

  return (
    <div className="h-auto pt-10 pb-30 rounded-t-4xl border-t border-t-zinc-800">
      <div className="w-10/11 mx-auto flex flex-row-reverse gap-10">
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg text-primary">Services</h3>
            <h2 className="uppercase text-6xl text-amber-50 tracking-wide">
              enjoy your favourite design
            </h2>
            <p className="text-zinc-400">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
              dignissimos dolores ex animi vel ipsum optio, assumenda laudantium
              quos cumque neque aspernatur commodi sint nostrum officia in.
              Commodi, autem accusamus.
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
                    hoveredIndex === ind ? "text-white" : "text-zinc-400"
                  }`}
                >
                  <span>{k.number}</span>
                  <span>{k.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <img
            className="w-full h-full rounded-4xl object-cover transition-opacity duration-300 ease-in-out"
            src={imgSource}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

const servicesTitles = [
  { number: "01", title: "Cardio", imgSrc: "/our works/our-works-img1.jpg" },
  { number: "02", title: "Lifting", imgSrc: "/our works/our-works-img2.jpg" },
  { number: "03", title: "Exercise", imgSrc: "/our works/our-works-img3.jpg" },
  { number: "04", title: "Dumbell", imgSrc: "/our works/our-works-img4.jpg" },
  { number: "05", title: "Yoga", imgSrc: "/our works/our-works-img1.jpg" },
  {
    number: "06",
    title: "Meditation",
    imgSrc: "/our works/our-works-img2.jpg",
  },
];
