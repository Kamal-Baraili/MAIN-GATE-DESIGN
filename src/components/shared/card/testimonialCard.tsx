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
      <div className="px-4 lg:py-5 w-11/12 lg:w-8/11 mx-auto">
        <div className="px-7 lg:p-7 text-white mt-16 md:mt-20 rounded-4xl flex flex-col lg:flex-row gap-5 lg:gap-20">
          <div className="w-full lg:w-1/2 item-center flex justify-start">
            <div className="w-full flex justify-center">
              <img
                className="w-full rounded-4xl h-[25vh] lg:h-[45vh] object-cover opacity-80"
                src={imgSrc}
                alt=""
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col lg:gap-10">
            <img className="w-8 h-8 hidden" src="/homepage/quote.svg" alt="" />
            <p className="mt-4 lg:mt-16 text-sm md:text-base text-zinc-400">"{reviewDesc}"</p>
            <div className="mt-4 lg:mt-0">
              <h3 className="font-bold text-xl text-zinc-300">{reviewName}</h3>
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
