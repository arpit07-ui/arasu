import { useEffect, useState, useRef } from "react";
import { getAllProjects } from "../../services/projectService";
import ProjectModal from "../modals/ProjectModal";
import { Project } from "../../types/projectType";

const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

const ITEMS_PER_PAGE = 10;

const ProjectSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<"all" | "ongoing" | "completed">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  const fetchProjects = async (): Promise<Project[]> => {
    try {
      const result = await getAllProjects();
      return result.data.filter(
        (project: Project) => project.visibility === true
      );
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  };

  const applyFilter = (type: "all" | "ongoing" | "completed") => {
    setFilter(type);
    setCurrentPage(1);
  };

  // Pagination logic
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProjects();
      setProjects(
        filter === "all"
          ? data
          : data.filter((project) => project.status === filter)
      );
    };
    loadData();
  }, [filter]);

  // Handle video element references
  useEffect(() => {
    // Start the video preview when mouse is over
    Object.values(videoRefs.current).forEach((videoEl) => {
      if (videoEl) {
        videoEl.addEventListener("mouseenter", () => {
          videoEl
            .play()
            .catch((err) => console.log("Auto-play prevented:", err));
        });
        videoEl.addEventListener("mouseleave", () => {
          videoEl.pause();
          videoEl.currentTime = 0;
        });
      }
    });
  }, [paginatedProjects]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Helper function to determine if URL is a video
  const isVideo = (url: string): boolean => {
    return url.match(/\.(mp4|webm|ogg)$/i) !== null;
  };

  // Get the first available media (image or video)
  const getFirstMedia = (project: Project): string | null => {
    if (project.images && project.images.length > 0) {
      return project.images[0];
    }
    if (project.video && project.video.length > 0) {
      return project.video[0];
    }
    return null;
  };

  // Function to load video thumbnail
  const handleVideoRef = (
    element: HTMLVideoElement | null,
    projectId: string
  ) => {
    if (element) {
      videoRefs.current[projectId] = element;
      // Try to load first frame as a thumbnail
      element.currentTime = 0.1;
    }
  };

  return (
    <section className="font-rethink px-4 sm:px-6 py-8 sm:py-10">
      <h3 className="text-center text-base sm:text-lg md:text-xl text-black">
        Explore Our Projects
      </h3>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-center mb-6 sm:mb-8">
        Ways to Get Involved
      </h2>

      {/* Filter buttons remain the same */}
      {/* <div className="flex flex-wrap gap-3 sm:gap-4 sm:justify-center mb-6 sm:mb-8">
        <button
          onClick={() => applyFilter("all")}
          className={`px-4 py-2 text-sm sm:text-base rounded-3xl ${
            filter === "all"
              ? "bg-black text-white"
              : "border-[1.4px] border-black"
          }`}
        >
          All Projects
        </button>
        <button
          onClick={() => applyFilter("ongoing")}
          className={`px-4 py-2 text-sm sm:text-base rounded-3xl ${
            filter === "ongoing"
              ? "bg-black text-white"
              : "border-[1.4px] border-black"
          }`}
        >
          Ongoing Projects
        </button>
        <button
          onClick={() => applyFilter("completed")}
          className={`px-4 py-2 text-sm sm:text-base rounded-3xl ${
            filter === "completed"
              ? "bg-black text-white"
              : "border-[1.4px] border-black"
          }`}
        >
          Completed Projects
        </button>
      </div> */}

      {paginatedProjects.length === 0 ? (
        <p className="text-center text-gray-500 text-sm sm:text-base mt-8">
          No projects available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {paginatedProjects.map((project) => {
            const mediaUrl = getFirstMedia(project);
            const isVideoMedia = mediaUrl ? isVideo(mediaUrl) : false;

            return (
              <div
                key={project.id}
                onClick={() => openModal(project)}
                className="bg-white rounded-xl overflow-hidden border shadow-md hover:shadow-lg transition-shadow relative cursor-pointer"
              >
                <div className="relative">
                  {mediaUrl ? (
                    isVideoMedia ? (
                      <div className="relative w-full h-40 sm:h-48 md:h-52 bg-gray-100">
                        <video
                          ref={(el) => handleVideoRef(el, project.id)}
                          src={mediaUrl}
                          className="w-full h-full object-cover rounded-lg"
                          muted
                          playsInline
                          preload="metadata"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="bg-black bg-opacity-50 rounded-full p-3">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={mediaUrl}
                        alt={project.title}
                        className="w-full h-40 sm:h-48 md:h-52 object-cover rounded-lg"
                      />
                    )
                  ) : (
                    <div className="w-full h-40 sm:h-48 md:h-52 bg-gray-200 flex items-center justify-center rounded-lg">
                      <span className="text-gray-500 text-sm">
                        No media available
                      </span>
                    </div>
                  )}
                  <span className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-full shadow">
                    {formatDate(project.date)}
                  </span>
                </div>
                <div className="p-3 sm:p-4 text-center">
                  <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination remains the same */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-8 sm:mt-10 gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="px-3 sm:px-4 py-2 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
          >
            ⟨
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`px-3 sm:px-4 py-2 rounded ${
                  currentPage === pageNum ? "bg-black text-white" : "border"
                }`}
              >
                {pageNum}
              </button>
            )
          )}
          <button
            onClick={() => goToPage(currentPage + 1)}
            className="px-3 sm:px-4 py-2 border rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            ⟩
          </button>
        </div>
      )}

      {/* Project Modal - Make sure your ProjectModal also handles videos */}
      {isModalOpen && selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeModal}
          isOpen={true}
        />
      )}
    </section>
  );
};

export default ProjectSection;
