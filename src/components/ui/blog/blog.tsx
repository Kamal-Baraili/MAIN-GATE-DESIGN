import { blogCardData } from "../../../db/mockdata";
import BlogCard from "../../shared/card/blogCard";

const Blog = () => {
  return (
    <>
      <div className="w-11/12 mx-auto border-t border-t-zinc-800 pt-5 mt-20">
        <div className="mt-40">
          <div className="w-full">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-amber-50 tracking-wide text-center">
              Latest from <span className="text-primary">news</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-zinc-400 text-center">
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
