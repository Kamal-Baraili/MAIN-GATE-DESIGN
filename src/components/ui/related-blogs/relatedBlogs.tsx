import { blogCardData } from "../../../db/mockdata";
import BlogCard from "../../shared/card/blogCard";

const RelatedBlogs = () => {
  return (
    <>
      <div className="w-full md:w-5/11 mx-auto mt-10">
        <h2 className=" uppercase text-4xl text-amber-50 text-center">Related Blogs</h2>
      </div>
      <div className="w-full md:w-5/11 mx-auto mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
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
    </>
  );
};

export default RelatedBlogs;
