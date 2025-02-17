import { education } from "@/constants/education";
import { GraduationCapIcon } from "lucide-react";
import { TimelineItem } from "./TimeLineItem";

export const EducationSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <section className="px-6 py-16 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <GraduationCapIcon className="w-6 h-6" />
          <h2 className="text-3xl font-bold">Education</h2>
        </div>
        <div className="border-l border-gray-300">
          {education.map((edu, index) => (
            <TimelineItem key={index} {...edu} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};
