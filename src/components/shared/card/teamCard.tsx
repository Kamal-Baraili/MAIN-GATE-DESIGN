interface Props {
  imgSrc: string;
  memberName: string;
  memberPost: string;
}

interface Item {
  item: Props;
  index: number;
}

const TeamCard = ({ item, index }: Item) => {
  return (
    <>
      <div
        className={`${(index === 1 || index === 4) && "mt-30"} ${
          (index === 2 || index === 5) && "-mt-40"
        }`}
      >
        <div className="w-full rounded-2xl overflow-hidden">
          <img
            className={`w-full h-[50vh] object-cover opacity-60 rounded-2xl hover:opacity-85 hover:scale-[1.1] transition-all ease-in-out duration-200`}
            src={item.imgSrc}
            alt={item.imgSrc}
          />
        </div>
        <div className="py-5 flex justify-between items-center gap-3 border-b border-b-zinc-600">
          <h3 className="text-3xl text-zinc-400 font-semibold">
            {item.memberName}
          </h3>
          <img
            className="w-6 h-6 opacity-65"
            src="/footer/instagram.svg"
            alt=""
          />
        </div>
        <h4 className="pt-2 text-zinc-400 italic text-lg">{item.memberPost}</h4>
      </div>
    </>
  );
};

export default TeamCard;
