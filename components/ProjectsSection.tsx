import { projects } from "@/constants/projects";
import Image from "next/image";

export const ProjectsSection = () => {
  return (
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
              <h3 className="text-white text-xl font-bold">{project.title}</h3>
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
  );
};
