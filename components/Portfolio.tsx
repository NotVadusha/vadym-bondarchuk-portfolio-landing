"use client";

import { education } from "@/constants/education";
import { projects } from "@/constants/projects";
import { experiences } from "@/constants/workExperience";
import { motion } from "framer-motion";
import { Briefcase, Camera, GraduationCap, Mail, Share2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { TimelineItem } from "./TimeLineItem";
import { Button } from "./ui/button";

interface Particle {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speed: number;
  angle?: number;
  length?: number;
}

const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const createParticles = useCallback(() => {
    if (!heroRef.current) return [];
    const rect = heroRef.current.getBoundingClientRect();

    if (isDarkMode) {
      // Stars for dark mode (your existing code)
      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        baseX: Math.random() * rect.width,
        baseY: Math.random() * rect.height,
        size: Math.random() * 8 + 1,
        speed: Math.random() * 0.5 + 0.2,
      }));
    } else {
      // Sun with rays for light mode
      const centerX = rect.width / 2;
      const centerY = rect.height / 6;

      // Create one large central particle (sun)
      const sunParticle = {
        id: 0,
        x: centerX - 37.5,
        y: centerY - 37.5,
        baseX: centerX - 37.5,
        baseY: centerY - 37.5,
        size: 80,
        speed: 0.1,
      };

      // Create rays around the sun
      const rays = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        x: centerX,
        y: centerY,
        baseX: centerX,
        baseY: centerY,
        size: 5,
        speed: 0.05,
        angle: (i * Math.PI * 2) / 12,
        length: 80,
      }));

      return [sunParticle, ...rays];
    }
  }, [isDarkMode]);

  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setParticles(createParticles());
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    setParticles(createParticles());
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [createParticles]);

  // Update particle positions based on mouse position
  useEffect(() => {
    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          const dx = mousePosition.x - particle.baseX;
          const dy = mousePosition.y - particle.baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;

          let newX = particle.baseX;
          let newY = particle.baseY;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            newX -= dx * force * particle.speed;
            newY -= dy * force * particle.speed;
          }

          return {
            ...particle,
            x: newX,
            y: newY,
          };
        }),
      );
    };

    const animationFrame = requestAnimationFrame(animateParticles);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition]);

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
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Particle Field */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className={`absolute transition-all duration-75 ${
                isDarkMode
                  ? "bg-yellow-400/50 rounded-full shadow-[0px_0px_12px_3px_rgba(255,215,0,1)]"
                  : particle?.angle !== undefined
                  ? "bg-orange-400/70 rounded-sm" // Ray
                  : "bg-orange-400 rounded-full shadow-[0px_0px_90px_50px_rgba(255,165,0,0.5)]" // Sun
              }`}
              style={{
                width:
                  particle.angle !== undefined
                    ? `${particle.size}px`
                    : `${particle.size}px`,
                height:
                  particle.angle !== undefined
                    ? `${particle.length}px`
                    : `${particle.size}px`,
                opacity: particle.angle !== undefined ? 0.6 : 1,
                transform:
                  particle.angle !== undefined
                    ? `translate(${particle.x}px, ${particle.y}px) rotate(${particle.angle}rad)`
                    : `translate(${particle.x}px, ${particle.y}px)`,
                transformOrigin:
                  particle.angle !== undefined ? "center top" : "center center",
                willChange: "transform",
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 animate-fade-in">
              Vadym Bondarchuk
            </h1>
            <p className="text-xl mb-8 animate-fade-in delay-200">
              Full-Stack Engineer
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-6 h-6" />
            <h2 className="text-3xl font-bold">Work Experience</h2>
          </div>
          <div className="border-l border-gray-300">
            {experiences.map((exp, index) => (
              <TimelineItem key={index} {...exp} />
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-6 h-6" />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>
          <div className="border-l border-gray-300">
            {education.map((edu, index) => (
              <TimelineItem key={index} {...edu} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <Image
                width={400}
                height={300}
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end opacity-0 hover:opacity-100 transition-opacity duration-200">
                <h3 className="text-white text-xl font-bold">
                  {project.title}
                </h3>
                <div className="flex gap-2 mt-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-white/20 rounded-full text-sm text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
