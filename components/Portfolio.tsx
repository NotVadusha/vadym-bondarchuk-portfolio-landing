import { DarkmodeSwitcher } from "./DarkmodeSwitcher";
import { EducationSection } from "./EducationSection";
import { FooterComponent } from "./Footer";
import { HeroSection } from "./HeroSection";
import { PersonSection } from "./PersonSection";
import { ProjectsSection } from "./ProjectsSection";
import { WorkExperienceSection } from "./WorkExperienceSection";

const Portfolio = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 right-0 p-6 z-50">
        <DarkmodeSwitcher />
      </nav>

      <HeroSection />

      <PersonSection />

      <ProjectsSection />

      <WorkExperienceSection />
      <EducationSection />

      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default Portfolio;
