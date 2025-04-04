import { Link } from "react-router-dom";
import TestimonialCard from "../../components/shared/card/testimonialCard";
import { DesignReviewData } from "../../db/mockdata";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useLocation } from "react-router-dom";

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
  const locate = useLocation();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 1120,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <div className="w-11/12 mx-auto pt-[12.5vh]">
        <div className="w-12 my-5">
          <Link to="/catalogue">
            <div className=" flex gap-2 text-zinc-300 opacity-70 hover:opacity-90 hover:text-zinc-100 hover:gap-3 transition-all ease-in-out duration-100 cursor-pointer">
              <img className="" src="/blog/arrow-left.svg" alt="" />
              <span className="text-base lg:text-[1.05vw]">Back</span>
            </div>
          </Link>
        </div>
        <div className="w-full flex flex-col-reverse lg:flex-row items-center gap-8">
          <div className="w-full">
            <h2 className="text-4xl lg:text-[2.3vw] mb-2 pt-2 text-zinc-400">
              {item.title}
            </h2>
            <p className="mt-10 tracking-wider text-zinc-500 text-base lg:text-[1.05vw]">
              {item.desc}
            </p>
          </div>
          <div className="w-full">
            <img
              className="w-full rounded-2xl h-[40vh] sm:h-[50vh] md:h-[60vh] object-cover opacity-85"
              src={item.img}
              alt=""
            />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-2">
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
        <div className="my-20 flex flex-col items-center">
          <h2 className="md:leading-[1] text-4xl md:text-5xl lg:text-6xl xl:text-7xl lg:text-[3.9vw] text-amber-50 text-center md:text-left">
            Have a Question?
          </h2>
          <div className="mt-10 flex flex-col justify-start items-center gap-5">
            <a
              className="px-4 sm:px-6 py-4 bg-green-500 hover:bg-green-400 rounded-4xl flex items-center gap-2"
              href={`https://wa.me/+9779865366391?text=${window.origin}${locate.pathname}`} // Enter whatsapp number between / and ?
              target="_blank"
            >
              <img src="/homepage/whatsapp-icon.svg" alt="" />
              <span className="text-sm sm:text-base lg-text-[]1.05vw">
                Whatsapp Us
              </span>
            </a>
          </div>
        </div>

        <div>
          <Slider {...settings}>
            {DesignReviewData.map((k: any, ind: number) => (
              <div className="p-4">
                <TestimonialCard
                  key={ind}
                  imgSrc={k.imgSrc}
                  reviewDesc={k.reviewDesc}
                  reviewName={k.reviewName}
                  reviewPost={k.reviewPost}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default OurWorkDetails;
