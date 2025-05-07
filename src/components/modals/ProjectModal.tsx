import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectModal = ({ project, onClose }: any) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Helper function to determine if URL is a video
  const isVideo = (url: string | any): boolean => {
    return url && url.match(/\.(mp4|webm|ogg)$/i) !== null;
  };

  // Combine all media (images and videos)
  const allMedia = [...(project.images || []), ...(project.video || [])];

  // Close modal when clicking outside content
  const handleOutsideClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Navigate through media
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

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: any) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

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
        damping: 25,
        stiffness: 500,
      },
    },
    exit: { y: 50, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={handleOutsideClick}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 border-b p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">
                {project.title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Media Gallery with Carousel-like display */}
              {allMedia.length > 0 && (
                <div className="mb-8">
                  {/* Main Media Display */}
                  <div className="relative mb-4">
                    {isVideo(allMedia[activeMediaIndex]) ? (
                      <div className="rounded-xl overflow-hidden shadow-md">
                        <video
                          src={allMedia[activeMediaIndex]}
                          className="w-full h-64 md:h-80 object-contain bg-black"
                          controls
                          autoPlay
                          playsInline
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : (
                      <motion.div
                        className="rounded-xl overflow-hidden shadow-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <img
                          src={allMedia[activeMediaIndex]}
                          alt={`${project.title}`}
                          className="w-full h-64 md:h-80 object-cover"
                        />
                      </motion.div>
                    )}

                    {/* Navigation arrows */}
                    {allMedia.length > 1 && (
                      <>
                        <button
                          onClick={goToPrev}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                          aria-label="Previous media"
                        >
                          <svg
                            className="h-5 w-5"
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
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                          aria-label="Next media"
                        >
                          <svg
                            className="h-5 w-5"
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

                  {/* Thumbnail navigation for multiple media */}
                  {allMedia.length > 1 && (
                    <div className="flex overflow-x-auto space-x-2 pb-2">
                      {allMedia.map((media, index) => (
                        <div
                          key={index}
                          onClick={() => setActiveMediaIndex(index)}
                          className={`flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                            activeMediaIndex === index
                              ? "border-blue-500 scale-105"
                              : "border-transparent"
                          }`}
                        >
                          {isVideo(media) ? (
                            <div className="relative w-16 h-16">
                              <video
                                src={media}
                                className="w-full h-full object-cover"
                                muted
                                preload="metadata"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                <svg
                                  className="h-6 w-6 text-white"
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
                          ) : (
                            <img
                              src={media}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-16 h-16 object-cover"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Project Details with beautiful typography */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">
                    Description
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {project.description || project.desc}
                  </p>
                </div>

                {project.content && (
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">
                      Project Details
                    </h4>
                    <div
                      className="text-gray-600 leading-relaxed prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: project.content }}
                    />
                  </div>
                )}

                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.date && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800">
                        Date Created
                      </h4>
                      <p className="text-blue-600 mt-1">
                        {new Date(project.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  )}

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800">Status</h4>
                    <p className="text-green-600 mt-1 capitalize">
                      {project.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer with CTA */}
            <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
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
