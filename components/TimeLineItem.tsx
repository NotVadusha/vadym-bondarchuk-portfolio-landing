import { BuildingIcon, CalendarIcon, MapPinIcon } from "lucide-react";

export interface TimelineItemProps {
  period: string;
  location: string;
  title: string;
  place: string;
  description: string[];
}

export const TimelineItem = ({
  period,
  location,
  title,
  place,
  description,
}: TimelineItemProps) => (
  <div className="relative pl-8 py-6 group">
    <div className="absolute left-0 group-hover:left-[-1px] top-0 h-full w-px group-hover:w-0.5 bg-gray-300 group-hover:bg-blue-500 transition-colors" />
    <div className="absolute left-[-5px] top-8 w-2.5 h-2.5 rounded-full bg-gray-300 group-hover:bg-blue-500 transition-colors" />

    <div className="group-hover:translate-x-2 transition-transform">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
        <CalendarIcon className="w-4 h-4" />
        <span>{period}</span>
        <MapPinIcon className="w-4 h-4 ml-2" />
        <span>{location}</span>
      </div>

      <h3 className="text-xl font-bold mb-1">{title}</h3>

      <div className="flex items-center gap-2 text-gray-600 mb-3">
        <BuildingIcon className="w-4 h-4" />
        <span>{place}</span>
      </div>

      <ul className="space-y-2">
        {description.map((item: string, index: number) => (
          <li key={index} className="text-gray-600">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
