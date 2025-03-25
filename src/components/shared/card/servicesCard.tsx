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
      <div className={`grid grid-cols-3 gap-8`}>
        <img
          className={`w-full h-[48vh] object-cover rounded-2xl opacity-55 hover:opacity-80 ${
            index == 1 || index === 3 || index === 5
              ? "col-span-1"
              : "col-span-2"
          }`}
          src={item.imgSrc}
          alt=""
        />
        <div
          className={`p-8 border border-zinc-600 rounded-3xl ${
            index === 2 && "order-first"
          }`}
        >
          <div className={``}>
            <img className="w-16 h-16 opacity-75" src={item.icon} alt="" />
            <h3 className="text-xl font-semibold text-zinc-300 my-8">
              {item.title}
            </h3>
            <p className="text-md text-zinc-400">{item.desc}</p>
          </div>
        </div>
        {(index === 1 || index === 3 || index === 5) && (
          <img
            className={`w-full h-[48vh] object-cover rounded-2xl opacity-55 hover:opacity-80`}
            src={item.imgSrcOpt}
            alt=""
          />
        )}
      </div>
    </>
  );
};

export default ServicesCard;
