"use client";

import { Camera, Mail, Share2 } from "lucide-react";
import { useState } from "react";
import { EducationSection } from "./EducationSection";
import { HeroSection } from "./HeroSection";
import { PersonSection } from "./PersonSection";
import { ProjectsSection } from "./ProjectsSection";
import { Button } from "./ui/button";
import { WorkExperienceSection } from "./WorkExperienceSection";

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Navigation */}
      <nav className="fixed top-0 right-0 p-6 z-50">
        <Button
          size="icon"
          className="p-2 rounded-full bg-gray-800 text-white hover:scale-110 transition-transform"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? "🌞" : "🌙"}
        </Button>
      </nav>

      {/* Hero Section with Particles */}
      <HeroSection isDarkMode={isDarkMode} />

      <PersonSection isDarkMode={isDarkMode} />

      <ProjectsSection />

      <WorkExperienceSection />
      <EducationSection />

      {/* Footer */}
      <footer className="py-8 text-center">
        <div className="flex justify-center gap-6">
          <a
            href="#"
            className="text-current hover:scale-110 transition-transform"
          >
            <Camera className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-current hover:scale-110 transition-transform"
          >
            <Share2 className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-current hover:scale-110 transition-transform"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
