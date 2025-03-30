import { Link } from "react-router-dom";

interface Items {
  title: string;
  desc: string;
  img: string;
  imgCollection: string[];
  slug: string;
}

interface Key {
  item: Items;
}

const OurWorkDetails = ({ item }: Key) => {
  return (
    <>
      <div className="w-11/12 mx-auto pt-24">
        <div className="w-12 my-5">
          <Link to="/works">
            <div className=" flex gap-2 text-zinc-300 opacity-70 hover:opacity-90 hover:text-zinc-100 hover:gap-3 transition-all ease-in-out duration-100">
              <img className="" src="/blog/arrow-left.svg" alt="" />
              <span className="">Back</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <div className="w-1/2">
            <h2 className="text-4xl mb-2 pt-2 text-zinc-400">{item.title}</h2>
            <p className="mt-10 leading-7 tracking-wider text-zinc-500">
              {item.desc}
            </p>
          </div>
          <div>
            <img
              className="w-full rounded-2xl h-[60vh] object-cover opacity-85"
              src={item.img}
              alt=""
            />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-2">
          {item.imgCollection.map((k: any, ind: number) => (
            <div key={ind} className="overflow-hidden group">
              <img
                className="group-hover:scale-[1.1] w-full h-full opacity-60 hover:opacity-85 transition-all ease-in-out duration-75"
                src={k}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurWorkDetails;
