import TestimonialCard from "../../shared/card/testimonialCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { SetStateAction, useRef, useState } from "react";
import { reviewCardData } from "../../../db/mockdata";

const Testimonial = () => {
  // Explicitly type the ref to Slider
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 3000,
    beforeChange: (_oldIndex: any, newIndex: SetStateAction<number>) =>
      setCurrentSlide(newIndex),
  };

  // Custom next and previous functions
  // const next = () => {
  //   if (sliderRef.current) {
  //     sliderRef.current.slickNext();
  //   }
  // };

  // const prev = () => {
  //   if (sliderRef.current) {
  //     sliderRef.current.slickPrev();
  //   }
  // };

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <>
      <div className="pt-20 pb-30 rounded-t-4xl -mt-10 border-y border-y-zinc-800">
        <h2 className="text-primary text-6xl text-center">
          What Our Clients Say?
        </h2>
        <div className="w-full mx-auto mt-10 relative">
          <Slider {...settings} ref={sliderRef}>
            {reviewCardData.map((key: any, index: any) => (
              <TestimonialCard
                key={index}
                imgSrc={key.imgSrc}
                reviewDesc={key.reviewDesc}
                reviewName={key.reviewName}
                reviewPost={key.reviewPost}
              />
            ))}
          </Slider>

          <div className="absolute top-0 left-[45%] flex md:gap-4 gap-2 z-[10]">
            {reviewCardData.map((k: any, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative md:w-12 md:h-12 w-8 h-8 rounded-full overflow-hidden transition-all duration-300 cursor-pointer ${
                  currentSlide === index
                    ? "ring-2 ring-white scale-110"
                    : "opacity-70"
                }`}
              >
                <img
                  src={k.imgSrc}
                  alt="testimonial-img"
                  className="brightness-75"
                />
              </button>
            ))}
          </div>

          {/* Custom Left Arrow */}
          {/* <div
            className="w-10 absolute left-5 top-1/2 text-2xl text-black bg-white p-2 rounded-full shadow-lg cursor-pointer"
            onClick={prev}
          >
            {"<"}
          </div> */}

          {/* Custom Right Arrow */}
          {/* <div
            className="w-10 absolute right-5 top-1/2 text-2xl text-black bg-white p-2 rounded-full shadow-lg cursor-pointer"
            onClick={next}
          >
            {">"}
          </div> */}
        </div>
      </div>

      <div className="w-full h-screen py-10 mb-10">
        <iframe
          className="w-full"
          width="1303"
          height="734"
          src="https://www.youtube.com/embed/U6ixCJWPmjA?autoplay=1&loop=1&playlist=U6ixCJWPmjA&mute=1"
          allow="autoplay; loop"
        ></iframe>
      </div>
    </>
  );
};

export default Testimonial;
