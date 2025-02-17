import { experiences } from "@/constants/workExperience";
import { BriefcaseIcon } from "lucide-react";
import { TimelineItem } from "./TimeLineItem";

export const WorkExperienceSection = () => {
  return (
    <section className="px-6 py-16 max-w-4xl mx-auto" id="work">
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <BriefcaseIcon className="w-6 h-6" />
          <h2 className="text-3xl font-bold">Work Experience</h2>
        </div>
        <div>
          {experiences.map((exp, index) => (
            <TimelineItem key={index} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};
