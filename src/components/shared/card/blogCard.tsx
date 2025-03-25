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
        <div className="flex gap-2 items-center">
          <img className="w-5 h-5 rounded-full" src={authorImg} alt="author-img" />
          <span>{author}</span>
        </div>{" "}
        <span className="text-sm">{date}</span>
      </div>
      <h3 className="text-2xl mb-2 pt-2 border-t border-t-zinc-700">{title}</h3>
      <div
        onClick={handleReadMoreClick} // Replace Link with clickable div
        className={`mt-2 px-3 py-2 text-sm text-zinc-200 bg-[#303030] ${
          isHover && "bg-[#636363]"
        } rounded cursor-pointer`}
      >
        Read More
      </div>
    </div>
  );
};

export default BlogCard;
