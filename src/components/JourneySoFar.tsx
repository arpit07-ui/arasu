import { useState, useEffect } from "react";

interface Stat {
  label: string;
  value: string;
}

interface Project {
  title: string;
  description: string;
  videoUrl: string;
  completedPercent: number;
  happyPercent: number;
}

const JourneySoFar = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setStats([
      { label: "Years of Experience", value: "04+" },
      { label: "Campaigns Launched", value: "52+" },
      { label: "Members", value: "110+" },
      { label: "Average Growth Rate", value: "52%" },
    ]);

    setProjects([
      {
        title: "Restoring Nature: Our Biodiversity Projects In Action",
        description:
          "Together, we are protecting ecosystems, supporting endangered species, and creating a greener, more balanced planet for future generations.",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        completedPercent: 90,
        happyPercent: 95,
      },
      {
        title: "Opening Scene – Lush Forest, Animals In Their Natural Habitat",
        description:
          "Nature is rich, vibrant, and beautifully diverse—home to millions of species, including us. But today, that delicate balance is under threat from climate change.",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        completedPercent: 70,
        happyPercent: 85,
      },
    ]);
  }, []);

  return (
    <section className="font-rethink px-4 md:px-20 py-2 text-center">
      <h2 className="text-3xl md:text-4xl font-medium mb-10 tracking-wide">
        The Journey So Far
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-40 bg-gradient-to-r from-[#4E9F3D] via-green-900  to-[#1C3916] text-white rounded-xl px-4 mb-12">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col tracking-wide items-center justify-center text-center"
          >
            <div className="text-4xl font-bold">{stat.value}</div>
            <div className="text-sm mt-1 pt-2">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* <div className="grid md:grid-cols-1 gap-10">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`w-full flex ${
              idx === 1 ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex flex-col md:flex-row gap-6 items-start max-w-4xl w-full">
              <video
                src={project.videoUrl}
                controls
                className=" w-auto h-48 rounded-xl shadow-md"
              />
              <div className="text-left md:pr-10">
                <div className="text-xs text-[#696969] mb-1">
                  — PROJECT SHOWCASE {idx + 1}
                </div>
                <div className="bg-gradient-to-r from-[#4E9F3D] via-green-900 to-[#1C3916] text-white font-medium rounded-md px-3 py-3 inline-block text-sm mb-2">
                  {project.title}
                </div>
                <p className="text-sm text-[#696969] mb-4">
                  {project.description}
                </p>

                <div className="mb-2 relative">
                  <div className="text-xs mb-1">Project Completed</div>
                  <div className="bg-gray-200 h-2 rounded-full relative">
                    <div
                      className="bg-[#4E9F3D] h-2 rounded-full"
                      style={{ width: `${project.completedPercent}%` }}
                    ></div>
                    <p className="text-xs absolute right-0 -top-5 text-[#4E9F3D] font-semibold">
                      {project.completedPercent}%
                    </p>
                  </div>
                </div>

                <div className="mb-2 relative">
                  <div className="text-xs mb-1">Happy Members</div>
                  <div className="bg-gray-200 h-2 rounded-full relative">
                    <div
                      className="bg-[#4E9F3D] h-2 rounded-full"
                      style={{ width: `${project.happyPercent}%` }}
                    ></div>
                    <p className="text-xs absolute right-0 -top-5 text-[#4E9F3D] font-semibold">
                      {project.happyPercent}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default JourneySoFar;
