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
      <div className="p-8 border border-zinc-800 rounded-2xl">
        <div className="flex gap-4 items-center">
          <img className="w-10 h-10 rounded-full" src={imgSrc} alt="" />
          <div>
            <h3 className="text-zinc-500 font-semibold">{reviewName}</h3>
            <h4 className="text-sm text-zinc-600 italic">{reviewPost}</h4>
          </div>
        </div>
        <p className="text-zinc-400 mt-10">{reviewDesc}</p>
      </div>
    </>
  );
};

export default TestimonialCard;
