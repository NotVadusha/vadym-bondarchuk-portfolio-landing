"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight;
      setIsVisible(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`flex justify-center items-center gap-4 sticky top-0 bg-white dark:bg-gray-900 duration-300 z-10 py-4 transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      id="navbar"
    >
      <Button
        variant="ghost"
        onClick={() => scrollToSection("hero")}
        className="dark:hover:bg-gray-800"
      >
        Home
      </Button>
      <Button
        variant="ghost"
        onClick={() => scrollToSection("about")}
        className="dark:hover:bg-gray-800"
      >
        About
      </Button>
      <Button
        variant="ghost"
        onClick={() => scrollToSection("projects")}
        className="dark:hover:bg-gray-800"
      >
        Projects
      </Button>
      <Button
        variant="ghost"
        onClick={() => scrollToSection("work")}
        className="dark:hover:bg-gray-800"
      >
        Work
      </Button>
      <Button
        variant="ghost"
        onClick={() => scrollToSection("contact")}
        className="dark:hover:bg-gray-800"
      >
        Contact
      </Button>
    </nav>
  );
}
