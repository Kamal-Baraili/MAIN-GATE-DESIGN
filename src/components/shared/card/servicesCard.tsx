interface Props {
  icon: string;
  title: string;
  desc: string;
  imgSrc: string;
  imgSrcOpt?: string;
}

interface Item {
  item: Props;
  index: number;
}

const ServicesCard = ({ item, index }: Item) => {
  return (
    <>
      <div
        className={` ${
          index === 2 ? "flex flex-row-reverse items-center gap-8" : "grid grid-cols-3 gap-8"
        }`}
      >
        <img
          className={`w-full h-[30vh] object-cover rounded-2xl opacity-55 hover:opacity-80 ${
            index == 1 || index === 3 || index === 5
              ? "col-span-1"
              : "col-span-2"
          }`}
          src={item.imgSrc}
          alt=""
        />
        <div className="">
          <div className={`p-4 border border-zinc-600 rounded-3xl`}>
            <img className="w-12 h-12 opacity-75" src={item.icon} alt="" />
            <h3 className="text-md font-semibold text-zinc-300 my-8">
              {item.title}
            </h3>
            <p className="text-sm text-zinc-400">{item.desc}</p>
          </div>
        </div>
        {(index === 1 || index === 3 || index === 5) && (
          <img
            className={`w-full h-[30vh] object-cover rounded-2xl opacity-55 hover:opacity-80`}
            src={item.imgSrcOpt}
            alt=""
          />
        )}
      </div>
    </>
  );
};

export default ServicesCard;
