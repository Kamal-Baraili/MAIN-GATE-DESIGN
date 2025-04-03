import TestimonialCard from "../../shared/card/testimonialCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import { SetStateAction, useEffect, useRef, useState } from "react";
import { reviewCardData } from "../../../db/mockdata";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
  // const sliderRef = useRef<Slider | null>(null);
  // const titleRef = useRef<HTMLHeadingElement>(null);
  // const [currentSlide, setCurrentSlide] = useState(0);

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   autoplay: true,
  //   pauseOnHover: false,
  //   autoplaySpeed: 3000,
  //   beforeChange: (_oldIndex: any, newIndex: SetStateAction<number>) =>
  //     setCurrentSlide(newIndex),
  //   responsive: [
  //     {
  //       breakpoint: 1500,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },

  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };

  // const goToSlide = (index: number) => {
  //   if (sliderRef.current) {
  //     sliderRef.current.slickGoTo(index);
  //   }
  // };

  // useEffect(() => {
  //   if (titleRef.current) {
  //     gsap.fromTo(
  //       titleRef.current,
  //       { opacity: 0, y: 30 },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         duration: 0.8,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: titleRef.current,
  //           start: "top top",
  //           end: "bottom 20%",
  //           toggleActions: "play reverse play reverse",
  //         },
  //       }
  //     );
  //   }
  // }, []);

  return (
    <>
      <div className="w-11/12 mx-auto mt-20 sm:mt-50 pt-20 pb-10 rounded-t-4xl -mt-10">
        <div>
          <h2 className="text-amber-50 text-5xl lg:text-6xl text-center">
            What Our <span className="text-primary">Clients</span> Say?
          </h2>
          <p className="text-zinc-400 pt-4 w-full sm:w-9/11 mx-auto  text-center leading-6 text-sm sm:text-base">
            At Main Gate Design, we are committed to providing exceptional
            service and going above and beyond to meet the unique needs of every
            client. We believe that the best way to showcase the value we bring
            is through the voices of the people who have experienced our work
            firsthand.{" "}
            <span className="hidden sm:inline-bloc">
              Our clients’ feedback is invaluable to us and reflects the
              dedication, care, and expertise we invest into every project we
              undertake. We’re proud to say that our clients’ success stories
              speak volumes about our passion for excellence, our attention to
              detail, and our ability to deliver results that make a real
              difference.{" "}
            </span>
          </p>
        </div>
        <div className="w-full mx-auto mt-5 md:mt-30 relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* <Slider {...settings} ref={sliderRef}> */}
          {reviewCardData.map((key: any, index: any) => (
            <TestimonialCard
              key={index}
              imgSrc={key.imgSrc}
              reviewDesc={key.reviewDesc}
              reviewName={key.reviewName}
              reviewPost={key.reviewPost}
            />
          ))}
          {/* </Slider> */}

          {/* <div className="absolute top-0 left-[40%] flex md:gap-4 gap-2 z-[10]">
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Testimonial;
