import { blogCardData } from "../../../db/mockdata";
import BlogCard from "../../shared/card/blogCard";

const Blog = () => {
  return (
    <>
      <div className="border-t border-t-zinc-800 pt-5">
        <div className="">
          <h2 className="w-[98%] mx-auto text-6xl text-center">
            Latest from news
          </h2>
          <p className="w-2/3 mx-auto my-3 text-center text-zinc-400">
            Stay informed with the latest updates and insights from around the
            world. Our 'Latest from News' section provides you with the
            essential stories, trends, and events, keeping you connected and
            up-to-date with the world around you.
          </p>
        </div>
        <div className="w-9/11 mx-auto my-10 grid grid-cols-3 gap-10">
          {blogCardData.map((key: any, index: any) => (
            <div key={index}>
              <BlogCard
                imgSrc={key.imgSrc}
                author={key.author}
                date={key.date}
                title={key.title}
                slug={key.slug}
                authorImg={key.authorImg}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
