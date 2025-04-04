import { OurTeamCardData } from "../../../db/mockdata";
import TeamCard from "../../shared/card/teamCard";

const OurTeam = () => {
  return (
    <>
      <div className="pt-24 text-zinc-300">
        <div className="w-11/12 mx-auto flex flex-col gap-2">
          <h2 className="text-4xl md:text-5xl lg:text-[4.03vw]  text-amber-50 tracking-wide text-center">
            Our Team
          </h2>
          <p className="w-full lg:w-4/11 mx-auto text-zinc-400 text-center text-base lg:text-[1.05vw]">
            Our expert designers and craftsmen work together to create custom
            gates that blend style, functionality, and security. With years of
            experience, we deliver high-quality solutions tailored to your
            needs.
          </p>
        </div>

        <div className="w-11/12 mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 md:gap-16 lg:gap-20">
          {OurTeamCardData.map((item: any, index: number) => (
            <TeamCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default OurTeam;
