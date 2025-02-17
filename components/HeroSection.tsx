"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

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

export const HeroSection = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
  );
};
