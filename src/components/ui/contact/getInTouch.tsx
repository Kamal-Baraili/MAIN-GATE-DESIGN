const GetInTouch = () => {
  return (
    <>
      <div className=" py-20 border-t border-t-zinc-800 bg-[url(/homepage/cta-bg.jpg)] bg-repeat-round opacity-75">
        <div className="w-7/11 mx-auto flex flex-col items-center gap-5">
          <h2 className="text-amber-50 text-6xl">Get In Touch</h2>
          <div className="w-30 bg-primary h-1"></div>
        </div>
        <div className="w-7/11 mx-auto my-20">
          <p className="text-center">
            We'd love to hear from you! Whether you have a question, need
            support, or just want to say hello, feel free to reach out. Our team
            is always here to help and we’ll get back to you as soon as
            possible.
          </p>
        </div>
        <div className="w-3/10 mx-auto flex gap-8">
          <a
            href="https://mail.google.com/mail/u/0/#inbox?compose=new"
            className="px-8 py-4 rounded-4xl bg-[#18181A] hover:bg-[#27272b] flex items-center gap-2"
          >
            <img src="/footer/mail.svg" alt="" />
            <span>Send Us an Email</span>
          </a>
          <a
            className="px-4 py-2 bg-green-500 hover:bg-green-400 rounded-4xl flex items-center gap-2"
            href="https://wa.me/+9779869177672?text=Hello%2C%20I%20need%20assistance"
            target="_blank"
          >
            <img src="/homepage/whatsapp-icon.svg" alt="" />
            <span>Whatsapp Us</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default GetInTouch;
