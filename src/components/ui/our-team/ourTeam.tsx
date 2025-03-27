import { OurTeamCardData } from "../../../db/mockdata";
import TeamCard from "../../shared/card/teamCard";

const OurTeam = () => {
  return (
    <>
      <div className="pt-24 text-zinc-300">
        <div className="w-11/12 mx-auto flex flex-col gap-2">
          <h2 className="text-6xl text-amber-50 tracking-wide">Our Team</h2>
          <p className="w-3/11 text-zinc-400">
            Our expert designers and craftsmen work together to create custom
            gates that blend style, functionality, and security. With years of
            experience, we deliver high-quality solutions tailored to your
            needs.
          </p>
        </div>

        <div className="w-11/12 mx-auto mt-10 grid grid-cols-3 gap-20">
          {OurTeamCardData.map((item: any, index: number) => (
            <TeamCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default OurTeam;
