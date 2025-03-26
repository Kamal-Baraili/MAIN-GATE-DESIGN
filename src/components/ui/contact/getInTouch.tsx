const GetInTouch = () => {
  return (
    <>
      <div className="relative">
        <div className="w-11/12 mx-auto py-40 flex gap-16">
          <div className="w-1/2 mx-auto flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <h2 className="text-amber-50 text-6xl text-center">
                Get In <span className="text-primary">Touch</span>
              </h2>
            </div>
            <div className="">
              <p className="w-full text-zinc-300 text-center">
                We'd love to hear from you! Whether you have a question, need
                support, or just want to say hello, feel free to reach out. Our
                team is always here to help and we’ll get back to you as soon as
                possible.
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <a
                href="/contact us"
                className="px-6 py-4 rounded-4xl bg-[#dbdbdb] hover:bg-[#f6f5f5] flex items-center gap-2"
              >
                <img src="/footer/mail.svg" alt="" />
                <span className="text-black">Contact Us</span>
              </a>
              <a
                className="px-6 py-2 bg-green-500 hover:bg-green-400 rounded-4xl flex items-center gap-2"
                href="https://wa.me/?text=Hello%2C%20I%20need%20assistance" // Enter whatsapp number between / and ?
                target="_blank"
              >
                <img src="/homepage/whatsapp-icon.svg" alt="" />
                <span>Whatsapp Us</span>
              </a>
            </div>
          </div>

          {/* <div className="w-full">
          <img
            className="absolute top-[35%] right-[34.5%] w-[15vw] h-[35vh] object-cover"
            src="/homepage/cta/cta-img1.jpg"
            alt="call-to-action-image"
          />
          <img
            className="absolute top-[58%] right-[11%] w-[20vw] h-[25vh] object-cover"
            src="/homepage/cta/cta-img2.jpg"
            alt="call-to-action-image"
          />
          <img
            className="absolute top-[10%] right-0 w-[30vw] h-[40vh]  object-cover"
            src="/homepage/cta/cta-img3.jpg"
            alt="call-to-action-image"
          />
        </div> */}
        </div>
        <div className="w-11/12 mx-auto h-[70vh] bg-[url(/homepage/cta/cta-img1.jpeg)] absolute inset-0 -z-10 opacity-70"></div>
        <div className="w-11/12 mx-auto h-[70vh] bg-black/40 absolute -z-5 inset-0"></div>
      </div>
    </>
  );
};

export default GetInTouch;
