import { blogCardData } from "../../../db/mockdata";
import BlogCard from "../../shared/card/blogCard";

const Blog = () => {
  return (
    <>
      <div className="w-11/12 mx-auto border-t border-t-zinc-800 pt-5 mt-20">
        <div className="md:flex">
          <div className="w-full">
            <h2 className="uppercase md:leading-[1] text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-amber-50 text-center md:text-left">
              Latest
            </h2>
            <h2 className="uppercase md:leading-[1] text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-amber-50 text-center md:text-left">
              from news
            </h2>
          </div>
          <p className="w-full md:w-[70%] text-md md:text-lg lg:text-3xl text-center md:text-left mt-4 md:mt-0 font-light text-zinc-400 overflow-hidde">
            Stay informed with the latest updates and insights from around the
            world.
          </p>
        </div>
        <div className="w-full mx-auto mt-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {blogCardData.map((key: any, index: any) => (
            <BlogCard
              key={index}
              imgSrc={key.imgSrc}
              author={key.author}
              date={key.date}
              title={key.title}
              slug={key.slug}
              authorImg={key.authorImg}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
