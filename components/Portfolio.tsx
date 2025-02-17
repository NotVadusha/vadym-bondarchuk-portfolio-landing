"use client";

import { MailIcon, Share2Icon } from "lucide-react";
import { useState } from "react";
import {
  FaGithub as FaGithubIcon,
  FaLinkedinIn as FaLinkedinInIcon,
} from "react-icons/fa";
import { CopyDataModal } from "./CopyDataModal";
import { EducationSection } from "./EducationSection";
import { HeroSection } from "./HeroSection";
import { PersonSection } from "./PersonSection";
import { ProjectsSection } from "./ProjectsSection";
import { Button } from "./ui/button";
import { WorkExperienceSection } from "./WorkExperienceSection";

const EMAIL_URL = process.env.NEXT_PUBLIC_EMAIL_URL;
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL;
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;

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

      <HeroSection isDarkMode={isDarkMode} />

      <PersonSection isDarkMode={isDarkMode} />

      <ProjectsSection />

      <WorkExperienceSection isDarkMode={isDarkMode} />
      <EducationSection isDarkMode={isDarkMode} />

      {/* Footer */}
      <footer className="py-8 text-center" id="contact">
        <div className="flex justify-center gap-6">
          <CopyDataModal
            triggerComponent={<Share2Icon className="size-8" />}
            title="Share"
            description="Share the data to the clipboard"
            value={window.location.href}
          />
          <CopyDataModal
            triggerComponent={<MailIcon className="size-8" />}
            title="Email"
            description="Email the data to the clipboard"
            value={EMAIL_URL ?? ""}
          />
          <CopyDataModal
            triggerComponent={<FaLinkedinInIcon className="size-8" />}
            title="Linkedin"
            description="Linkedin the data to the clipboard"
            value={LINKEDIN_URL ?? ""}
          />
          <CopyDataModal
            triggerComponent={<FaGithubIcon className="size-8" />}
            title="Github"
            description="Github the data to the clipboard"
            value={GITHUB_URL ?? ""}
          />
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
