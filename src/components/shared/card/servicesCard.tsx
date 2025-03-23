import { useState } from "react";

interface Props {
  img: string;
  title: string;
  desc: string;
  index: number;
}

const ServicesCard = ({ img, title, desc, index }: Props) => {
  return (
    <>
      <div className="h-full">
        <div
          className={`p-4 h-[38vh] ${
            (index === 1 || index === 5) && " border-l border-l-zinc-600"
          } ${(index === 2 || index === 6) && "border-x border-x-zinc-600"}`}
        >
          <img className="w-12 h-12 opacity-85" src={img} alt="" />
          <h3 className="text-md font-semibold my-8">{title}</h3>
          <p className="text-sm">{desc}</p>
        </div>
      </div>
    </>
  );
};

export default ServicesCard;
