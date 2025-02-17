import { DarkmodeSwitcher } from "./DarkmodeSwitcher";
import { EducationSection } from "./EducationSection";
import { FooterComponent } from "./Footer";
import { HeroSection } from "./HeroSection";
import Navbar from "./Navbar";
import { PersonSection } from "./PersonSection";
import { ProjectsSection } from "./ProjectsSection";
import { WorkExperienceSection } from "./WorkExperienceSection";

const Portfolio = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white bg-white text-gray-900">
      <div className="sticky top-0 right-0 p-4 z-50 w-fit">
        <DarkmodeSwitcher />
      </div>

      <HeroSection />

      <Navbar />

      <PersonSection />

      <ProjectsSection />

      <WorkExperienceSection />
      <EducationSection />

      <FooterComponent />
    </div>
  );
};

export default Portfolio;
