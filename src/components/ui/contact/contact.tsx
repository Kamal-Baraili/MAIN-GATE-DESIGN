import Button from "../../shared/button/button";

const Contact = () => {
  return (
    <>
      <div className="w-10/11 mx-auto py-10 mt-20">
        <div className="w-full">
          <h2 className="text-amber-50 text-6xl text-center">
            Need help? Get in touch
          </h2>
        </div>
        <div className="w-1/2 mx-auto mt-3">
          <p className="text-center text-zinc-400">
            We'd love to hear from you! Whether you have a question, need
            support, or just want to say hello, feel free to reach out. Our team
            is always here to help and we’ll get back to you as soon as
            possible.
          </p>
        </div>
        <div className="w-full py-10 grid grid-cols-2 gap-12">
          <div className="">
            <img
              className="w-full h-[75vh] mt-14 rounded-2xl opacity-60 object-cover"
              src="/homepage/about/about-img2.png"
              alt=""
            />
          </div>
          <div className="">
            <h2 className="text-4xl text-zinc-300">Send us a message</h2>
            <div className="rounded-xl p-4 mt-5 border border-zinc-600 text-amber-50">
              <form
                className=" text-zinc-500 flex flex-col items-start"
                action=""
              >
                <div className="w-full flex gap-8">
                  <div className="w-full">
                    <h3 className="text-lg">Full Name</h3>{" "}
                    <input
                      className="w-full mt-1.5 p-3 rounded-xl border border-zinc-700 outline-none"
                      type="text"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="w-full">
                    <h3 className="text-lg">Email</h3>{" "}
                    <input
                      className="w-full mt-1.5 p-3 rounded-xl border border-zinc-700 outline-none"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="w-full mt-5">
                  <h3 className="text-lg">
                    What kind of service are you looking for?
                  </h3>
                  <select
                    className="w-full mt-1.5 p-3 rounded-xl border bg-black border-zinc-700 outline-none"
                    name="cars"
                    id="cars"
                  >
                    <option
                      className="hover:bg-black"
                      value=""
                      disabled
                      selected
                    >
                      Select your subject
                    </option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>

                <div className="w-full mt-5">
                  <h3 className="text-lg">Message</h3>{" "}
                  <textarea
                    className="w-full mt-1.5 p-3 h-[30vh] rounded-xl border border-zinc-700 outline-none resize-none"
                    placeholder="Message"
                  />
                </div>
                <div className="mt-5">
                  <Button
                    text="Send Message"
                    color="text-black"
                    bgColor="bg-amber-300"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
