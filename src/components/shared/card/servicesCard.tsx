import { JSX, useState } from "react";

interface Props {
  icon: JSX.Element;
  title: string;
  desc: string;
}

interface Item {
  item: Props;
}

const ServicesCard = ({ item }: Item) => {
  const [isCardHover, setCardHover] = useState(false);
  return (
    <>
      <div
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
        className={`p-8 flex flex-col items-center relative rounded transition-all ease-in-out cursor-default group
        `}
      >
        <div className="flex justify-center">
          <span
            className={`text-5xl text-zinc-400 group-hover:text-primary p-4 rounded-full border border-zinc-700 absolute -top-10 bg-[#0e0e0e] hover:bg-[#121212]`}
          >
            {item.icon}
          </span>
        </div>
        <h3
          className={`text-lg text-center ${
            isCardHover ? "text-zinc-200" : "text-zinc-400"
          } mt-12 transition-all ease-in-out duration-400`}
        >
          {item.title}
        </h3>
        <p
          className={`mt-6 text-center transition-all ease-in-out duration-400 ${
            isCardHover ? "text-zinc-500" : "text-zinc-600"
          }`}
        >
          {item.desc}
        </p>
      </div>
    </>
  );
};

export default ServicesCard;
