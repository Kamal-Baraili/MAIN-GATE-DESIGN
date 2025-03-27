import Button from "../../shared/button/button";
import { Icon } from "@iconify/react/dist/iconify.js";

const Contact = () => {
  return (
    <>
      <div className="w-10/11 mx-auto mt-20">
        <div className="w-full py-10 grid grid-cols-2 gap-12">
          <div className="">
            <div className="w-full">
              <h2 className="text-amber-50 text-6xl">Get in touch</h2>
            </div>
            <div className="mt-3">
              <p className="text-zinc-400">
                Reach out today to discover how our custom gate designs can
                transform your property, combining security with style. We're
                here to help safeguard your future and create a lasting
                impression.
              </p>
            </div>
            <div className="w-1/3 my-10 flex justify-between">
              <span className="text-4xl text-zinc-500">
                <Icon icon="basil:facebook-solid" />
              </span>
              <span className="text-4xl text-zinc-500">
                <Icon icon="mdi:twitter" />
              </span>
              <span className="text-4xl text-zinc-500">
                <Icon icon="mingcute:instagram-fill" />
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-10">
              {contactData.map((item, ind) => (
                <div
                  className="h-[20vh] bg-[#0c0c0cd4] flex flex-col gap-2 justify-center items-center rounded-lg group cursor-default hover:bg-[#171717]"
                  key={ind}
                >
                  <span className="text-zinc-400 text-4xl">{item.icon}</span>
                  <h3 className="text-zinc-500 text-xl">{item.text}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <h2 className="text-4xl text-zinc-300">Send us a message</h2>
            <div className="rounded-xl p-4 mt-5 border border-zinc-900 text-amber-50">
              <form
                className=" text-zinc-500 flex flex-col items-start"
                action=""
              >
                <div className="w-full flex gap-8">
                  <div className="w-full">
                    <h3 className="text-lg">Full Name</h3>{" "}
                    <input
                      className="w-full mt-1.5 p-3 rounded-xl border border-zinc-800 outline-none"
                      type="text"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="w-full">
                    <h3 className="text-lg">Email</h3>{" "}
                    <input
                      className="w-full mt-1.5 p-3 rounded-xl border border-zinc-800 outline-none"
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
                    className="w-full mt-1.5 p-3 rounded-xl border bg-black border-zinc-800 outline-none"
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
                    className="w-full mt-1.5 p-3 h-[30vh] rounded-xl border border-zinc-800 outline-none resize-none"
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

const contactData = [
  {
    icon: <Icon icon="carbon:location-filled" />,
    text: "Kathmandu, Maharajgunj",
  },
  {
    icon: <Icon icon="material-symbols-light:mail" />,
    text: "maingatedesign@gmail.com",
  },
  {
    icon: <Icon icon="foundation:telephone" />,
    text: "01-4025365",
  },
  {
    icon: <Icon icon="foundation:telephone" />,
    text: "+977 9860457823",
  },
];
