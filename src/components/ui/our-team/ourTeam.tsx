import { OurTeamCardData } from "../../../db/mockdata";
import TeamCard from "../../shared/card/teamCard";

const OurTeam = () => {
  return (
    <>
      <div className="py-24 border-t border-t-zinc-800 rounded-4xl text-zinc-300">
        <div className="w-11/12 mx-auto flex flex-col gap-2">
          <h2 className="text-6xl text-amber-50 tracking-wide text-center">
            Our Team
          </h2>
          <p className="text-center w-7/11 mx-auto">
            Our expert designers and craftsmen work together to create custom
            gates that blend style, functionality, and security. With years of
            experience, we deliver high-quality solutions tailored to your
            needs.
          </p>
        </div>

        <div className="w-7/11 mx-auto mt-20 grid grid-cols-3 gap-10">
          {OurTeamCardData.map((item: any, index: number) => (
            <TeamCard key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default OurTeam;
