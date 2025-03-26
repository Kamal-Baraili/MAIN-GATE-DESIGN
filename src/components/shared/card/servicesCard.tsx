import { useState } from "react";

interface Props {
  icon: string;
  title: string;
  desc: string;
  imgSrc: string;
  imgSrcOpt?: string;
}

interface Item {
  item: Props;
  index: number;
}

const ServicesCard = ({ item, index }: Item) => {
  const [isCardHover, setCardHover] = useState(false);
  return (
    <>
      <div className={`grid grid-cols-3 gap-8`}>
        <img
          className={`w-full h-[48vh] object-cover rounded-2xl opacity-55 hover:opacity-80 ${
            index == 1 || index === 3 || index === 5
              ? "col-span-1"
              : "col-span-2"
          }`}
          src={item.imgSrc}
          alt=""
        />
        <div
          onMouseEnter={() => setCardHover(true)}
          onMouseLeave={() => setCardHover(false)}
          className={`p-8 border border-zinc-600 rounded-3xl transition-all ease-in-out duration-400 cursor-default ${
            index === 2 && "order-first"
          } ${index === 0 && "hover:bg-[#C93202]"} ${
            index === 1 && "hover:bg-[#A1C9B8]"
          } ${index === 2 && "hover:bg-[#C8D1D1]"} ${
            index === 3 && "hover:bg-[#DECF3E]"
          } ${index === 4 && "hover:bg-[#A1C9B8]"} ${
            index === 5 && "hover:bg-[#C8D1D1]"
          }`}
        >
          <div className={``}>
            <img className="w-16 h-16 opacity-75" src={item.icon} alt="" />
            <h3
              className={`text-xl font-semibold ${
                isCardHover ? "text-black" : "text-zinc-300"
              } my-8 transition-all ease-in-out duration-400`}
            >
              {item.title}
            </h3>
            <p
              className={`text-md transition-all ease-in-out duration-400 ${
                isCardHover ? "text-black" : "text-zinc-400"
              }`}
            >
              {item.desc}
            </p>
          </div>
        </div>
        {(index === 1 || index === 3 || index === 5) && (
          <img
            className={`w-full h-[48vh] object-cover rounded-2xl opacity-55 hover:opacity-80`}
            src={item.imgSrcOpt}
            alt=""
          />
        )}
      </div>
    </>
  );
};

export default ServicesCard;
