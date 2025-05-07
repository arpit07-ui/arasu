import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../../types/projectType";
import { useState } from "react";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  isOpen: boolean;
}

const ProjectModal = ({ project, onClose, isOpen }: ProjectModalProps) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Helper function to determine if URL is a video
  const isVideo = (url: string): boolean => {
    return url.match(/\.(mp4|webm|ogg)$/i) !== null;
  };

  // Combine all media (images + videos)
  const allMedia = [...(project.images || []), ...(project.video || [])];

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
    exit: { y: 50, opacity: 0 },
  };

  // Close modal when clicking outside content
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Navigate between media items
  const goToNext = () => {
    setActiveMediaIndex((prev) =>
      prev === allMedia.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setActiveMediaIndex((prev) =>
      prev === 0 ? allMedia.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          {/* Overlay with blur effect */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={handleOutsideClick}
          />

          {/* Modal Container */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
          >
            {/* Header with gradient background */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-10"
                aria-label="Close modal"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {/* Media Gallery - Shows both images and videos */}
              {allMedia.length > 0 && (
                <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                  {/* Main Media Display */}
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
                    {allMedia.length > 0 && (
                      <>
                        {isVideo(allMedia[activeMediaIndex]) ? (
                          <video
                            src={allMedia[activeMediaIndex]}
                            className="w-full h-full object-contain"
                            controls
                            autoPlay
                          />
                        ) : (
                          <img
                            src={allMedia[activeMediaIndex]}
                            alt={`${project.title} media`}
                            className="w-full h-full object-contain"
                          />
                        )}
                      </>
                    )}

                    {/* Navigation arrows for multiple media items */}
                    {allMedia.length > 1 && (
                      <>
                        <button
                          onClick={goToPrev}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-opacity"
                          aria-label="Previous media"
                        >
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={goToNext}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-opacity"
                          aria-label="Next media"
                        >
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails Row */}
                  {allMedia.length > 1 && (
                    <div className="grid grid-cols-6 gap-2 mt-4 px-1">
                      {allMedia.map((media, index) => (
                        <div
                          key={index}
                          onClick={() => setActiveMediaIndex(index)}
                          className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                            activeMediaIndex === index
                              ? "border-blue-500 scale-105"
                              : "border-transparent"
                          }`}
                        >
                          {isVideo(media) ? (
                            <div className="relative bg-gray-200 aspect-video">
                              <video
                                src={media}
                                className="w-full h-full object-cover"
                                muted
                                preload="metadata"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-white bg-black bg-opacity-60 rounded-full p-1">
                                  <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={media}
                              alt={`Thumbnail ${index}`}
                              className="w-full h-full object-cover aspect-video"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Project Details */}
              <div className="space-y-6">
                {/* Status Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === "ongoing"
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        : "bg-green-100 text-green-800 border border-green-200"
                    }`}
                  >
                    {project.status === "ongoing" ? "Ongoing" : "Completed"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(project.date).toLocaleDateString()}
                  </span>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">
                    Description
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>

                {/* Additional Content */}
                {project.content && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">
                      Details
                    </h4>
                    <div
                      className="text-gray-600 leading-relaxed prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: project.content }}
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end border-t">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
