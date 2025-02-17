import { BuildingIcon, CalendarIcon, MapPinIcon } from "lucide-react";

export interface TimelineItemProps {
  period: string;
  location: string;
  title: string;
  place: string;
  description: string[];
  isDarkMode: boolean;
}

export const TimelineItem = ({
  period,
  location,
  title,
  place,
  description,
  isDarkMode,
}: TimelineItemProps) => (
  <div className="relative pl-8 py-6 group">
    <div
      className={`absolute left-0 group-hover:left-[-1px] top-0 h-full w-px ${
        isDarkMode ? "bg-gray-300" : "bg-gray-600"
      } group-hover:bg-blue-500 transition-colors`}
    />
    <div
      className={`absolute left-[-5px] top-8 w-2.5 h-2.5 rounded-full ${
        isDarkMode ? "bg-gray-300" : "bg-gray-600"
      } group-hover:bg-blue-500 transition-colors`}
    />

    <div className="group-hover:translate-x-2 transition-transform">
      <div
        className={`flex items-center gap-2 text-sm ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        } mb-1`}
      >
        <CalendarIcon className="w-4 h-4" />
        <span>{period}</span>
        <MapPinIcon className="w-4 h-4 ml-2" />
        <span>{location}</span>
      </div>

      <h3 className="text-xl font-bold mb-1">{title}</h3>

      <div
        className={`flex items-center gap-2 ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        } mb-3`}
      >
        <BuildingIcon className="w-4 h-4" />
        <span>{place}</span>
      </div>

      <ul className="space-y-2">
        {description.map((item: string, index: number) => (
          <li
            key={index}
            className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            • {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
