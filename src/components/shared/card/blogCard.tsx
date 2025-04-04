import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  imgSrc: string;
  authorImg: string;
  author: string;
  date: string;
  title: string;
  slug: string;
}

const BlogCard = ({ imgSrc, author, date, title, authorImg, slug }: Props) => {
  const [isHover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default Link behavior
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
    navigate(`/blog/${slug.replace(/\s+/g, "-")}`); // Navigate to the blog details page
  };

  return (
    <div
      onClick={handleReadMoreClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="p-6 hover:bg-[#121212] rounded-2xl text-zinc-300 flex flex-col items-start cursor-pointer"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          className={`rounded-lg opacity-65 ${
            isHover &&
            "scale-[1.1] opacity-100 transition-all ease-in-out duration-300"
          }`}
          src={imgSrc}
          alt="our-works-image"
        />
      </div>
      <div className="w-full my-3 flex justify-between">
        <div className="flex gap-2 items-center">
          <img
            className="w-5 h-5 lg:w-[1.25vw] lg:h-[2.5vh] rounded-full"
            src={authorImg}
            alt="author-img"
          />
          <span className="text-sm md:text-base lg:text-[1.0125vw]">
            {author}
          </span>
        </div>
        <span className="text-[12px] md:text-sm lg:text-[0.9vw]">{date}</span>
      </div>
      <h3 className="text-xl md:text-2xl lg:text-[1.6vw] mb-2 pt-2 border-t border-t-zinc-700">
        {title}
      </h3>
      <div
        className={`mt-2 px-3 py-2 text-sm text-zinc-200 rounded cursor-pointer flex gap-2 items-center`}
      >
        <h4
          className={`text-base lg:text-[1.0125vw] ${
            isHover && "text-primary"
          }`}
        >
          Read More
        </h4>
        <img
          className={`transition-all ease-in-out duration-300 ${
            isHover && "-rotate-45"
          }`}
          src="/blog/blog-arrow-right.svg"
          alt=""
        />
      </div>
    </div>
  );
};

export default BlogCard;
