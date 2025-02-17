import { education } from "@/constants/education";
import { GraduationCapIcon } from "lucide-react";
import { TimelineItem } from "./TimeLineItem";

export const EducationSection = () => {
  return (
    <section className="px-6 py-16 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <GraduationCapIcon className="w-6 h-6" />
          <h2 className="text-3xl font-bold">Education</h2>
        </div>
        <div>
          {education.map((edu, index) => (
            <TimelineItem key={index} {...edu} />
          ))}
        </div>
      </div>
    </section>
  );
};
