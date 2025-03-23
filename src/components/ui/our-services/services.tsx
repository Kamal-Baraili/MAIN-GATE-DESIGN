import ServicesCard from "../../shared/card/servicesCard";
import { servicesCardData } from "../../../db/mockdata";

export function Services() {
  return (
    <div className="h-auto pt-10 pb-30 rounded-t-4xl border-t border-t-zinc-800">
      <div className="w-7/11 mx-auto flex flex-col items-center gap-5 mb-16">
        <h2 className="text-zinc-300 text-6xl">What We Do?</h2>
        <div className="w-30 bg-primary h-1"></div>
      </div>
      <div className="w-9/11 mx-auto grid h-auto grid-cols-4 gap-y-20 text-zinc-400">
        {servicesCardData.map((k: any, i: number) => (
          <ServicesCard
            key={i}
            img={k.img}
            title={k.title}
            desc={k.desc}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
