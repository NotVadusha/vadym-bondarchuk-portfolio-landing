"use client";

import { techs } from "@/constants/techs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const PersonSection = () => {
  const router = useRouter();

  const handleDownloadCV = () => {
    router.push("/cv.pdf");
  };

  const handleContactMe = () => {
    window.scrollTo({
      top: document.getElementById("contact")?.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-6 py-16 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Photo Container */}
        <div className="relative w-96 h-96 flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl transform rotate-6 opacity-30"></div>
          <Image
            src="/person.png"
            alt="Vadym Bondarchuk"
            width={256}
            height={256}
            className="relative rounded-2xl object-cover w-full h-full shadow-lg"
          />
        </div>

        {/* Description Container */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">About Me</h2>
          <p className="text-lg leading-relaxed dark:text-gray-300 text-gray-600">
            Hey, I&apos;m Vadym, a Full-Stack Developer passionate about
            building modern, scalable, and efficient web solutions. I&apos;m all
            about clean, maintainable code and seamless teamwork, whether
            it&apos;s in an agile or scrum environment.
          </p>
          <div className="flex flex-wrap gap-3">
            {/* Tech Stack Pills */}
            {techs.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full text-sm cursor-pointer 
                  hover:scale-105 transition-transform
                  dark:bg-gray-800 dark:text-gray-200 bg-gray-200 text-gray-800"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Optional: Add social links or CTA */}
          <div className="flex gap-4 pt-4">
            <Button
              className="dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200
                        bg-gray-900 text-white hover:bg-gray-800
                          hover:scale-105 transition-transform"
              onClick={handleDownloadCV}
            >
              Download CV
            </Button>
            <Button
              variant="outline"
              onClick={handleContactMe}
              className="
                  dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200
                  hover:bg-gray-100 hover:scale-105 transition-transform"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
