import { FastForward } from "lucide-react";
import { useState } from "react";

interface Props {
  text: string;
  color: string;
  bgColor: string;
  src?: string;
  secondSrc?: string;
  border?: string;
}

const Button = ({ text, color, bgColor, src, secondSrc, border }: Props) => {
  const [isHover, setHover] = useState(false);
  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`flex items-center gap-8 text-md text-center rounded-md ${color} px-4 py-3 ${bgColor} border ${border} opacity-100 cursor-pointer relative`}
      >
        {src && (
          <div className="">
            <div className="w-5 h-5 bg-black rounded"></div>
            {secondSrc && (
              <div
                className={`absolute top-1 -left-4 flex ${
                  isHover && "rotate-45"
                } transition-all ease-in-out duration-[1s]`}
              >
                <div className="w-10 h-10"></div>
                <img
                  className=" w-10 h-10 object-contain "
                  src={secondSrc}
                  alt="icon"
                />
              </div>
            )}
          </div>
        )}
        <span className="text-base">{text}</span>
      </div>
    </>
  );
};

export default Button;
