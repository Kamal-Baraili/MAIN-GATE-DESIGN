import { blogCardData } from "../../../db/mockdata";
import BlogCard from "../../shared/card/blogCard";

const Blog = () => {
  return (
    <>
      <div className="w-11/12 mx-auto border-t border-t-zinc-800 pt-5 mt-20">
        <div className="flex">
          <div className="w-full">
            <h2 className="w-full mx-auto uppercase leading-[1] text-7xl text-amber-50">
              Latest
            </h2>
            <h2 className="w-full mx-auto uppercase leading-[1] text-7xl text-amber-50">
              from news
            </h2>
          </div>
          <p className="w-[70%] mx-auto my-3 text-3xl font-light text-zinc-400">
            Stay informed with the latest updates and insights from around the
            world. 
          </p>
        </div>
        <div className="w-full mx-auto mt-20 grid grid-cols-3 gap-10">
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
