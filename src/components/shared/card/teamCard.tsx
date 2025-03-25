interface Props {
  imgSrc: string;
  memberName: string;
  memberPost: string;
}

interface Item {
  item: Props;
}

const TeamCard = ({ item }: Item) => {
  return (
    <>
      <div className={`relative`}>
        <div className="w-full overflow-hidden">
          <img
            className={`w-full h-[55vh] object-cover opacity-70 rounded hover:opacity-90 hover:scale-[1.1] transition-all ease-in-out duration-200`}
            src={item.imgSrc}
            alt={item.imgSrc}
          />
        </div>
        <div className="absolute bottom-0 left-[10%] px-2 flex flex-col gap-3">
          <h3 className="text-[#fff] text-4xl font-semibold">
            {item.memberName}
          </h3>
          <div className="flex items-center gap-14">
            <h4 className="text-[#fff] italic text-lg">{item.memberPost}</h4>
            <div className="p-2 w-full flex justify-center gap-10">
              <img src="/footer/twitter.svg" alt="" />
              <img src="/footer/instagram.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamCard;
