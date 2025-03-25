interface Props {
  imgSrc: string;
  reviewDesc: string;
  reviewName: string;
  reviewPost: string;
}

const TestimonialCard = ({
  imgSrc,
  reviewDesc,
  reviewName,
  reviewPost,
}: Props) => {
  return (
    <>
      <div className="px-4 py-5 w-8/11 mx-auto">
        <div className="p-7 text-white mt-20 rounded-4xl flex gap-20 border border-zinc-800">
          <div className="w-1/2 item-center flex justify-start">
            <div className="w-full">
              <img
                className="w-full rounded-4xl h-[45vh] object-cover opacity-80"
                src={imgSrc}
                alt=""
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-10">
            <img className="w-8 h-8" src="/homepage/quote.svg" alt="" />
            <p className="mt-16 text-zinc-400">"{reviewDesc}"</p>
            <div className="">
              <h3 className="font-bold text-xl text-zinc-500">{reviewName}</h3>
              <h4 className="mt-1 text-sm italic text-zinc-500">
                {reviewPost}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialCard;
