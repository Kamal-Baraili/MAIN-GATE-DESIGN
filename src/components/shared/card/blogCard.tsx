import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  imgSrc: string;
  author: string;
  date: string;
  title: string;
  slug: string;
}

const BlogCard = ({ imgSrc, author, date, title, slug }: Props) => {
  const [isHover, setHover] = useState(false);
  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="p-6 bg-[#121212] rounded-xl text-zinc-300 flex flex-col items-start cursor-pointer"
      >
        <div className="overflow-hidden rounded-2xl">
          <img
            className={`rounded-2xl opacity-65 ${
              isHover &&
              "scale-[1.1] opacity-100 transition-all ease-in-out duration-300"
            }`}
            src={imgSrc}
            alt="our-works-image"
          />
        </div>
        <div className="w-full my-3 flex justify-between">
          <span>Author: {author}</span> <span className="text-sm">{date}</span>
        </div>
        <h3 className="text-2xl mb-2 pt-2 border-t border-t-zinc-700">
          {title}
        </h3>
        <Link to={`/blog/${slug.replace(/\s+/g, "-")}`}>
          <div
            className={`mt-2 px-3 py-2 text-sm text-black bg-[white] ${
              isHover && "bg-amber-50"
            } rounded`}
          >
            Read More
          </div>
        </Link>
      </div>
    </>
  );
};

export default BlogCard;
