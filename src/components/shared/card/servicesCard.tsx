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
        className={`p-8 bg-[#0e0e0e] hover:bg-[#121212] rounded transition-all ease-in-out cursor-default group
        `}
      >
        <span className={`text-5xl text-zinc-400 group-hover:text-primary`}>
          {item.icon}
        </span>
        <h3
          className={`text-lg ${
            isCardHover ? "text-zinc-200" : "text-zinc-400"
          } my-8 transition-all ease-in-out duration-400`}
        >
          {item.title}
        </h3>
        <p
          className={`mt-14 transition-all ease-in-out duration-400 ${
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
