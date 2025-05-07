import { motion, AnimatePresence } from "framer-motion";
import { Blog } from "../../types/blogType";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogModalProps {
  blog: Blog;
  onClose: () => void;
}

const BlogModal = ({ blog, onClose }: BlogModalProps) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [allMedia, setAllMedia] = useState<string[]>([]);

  // Set up image gallery when blog changes
  useEffect(() => {
    if (blog?.images && blog.images.length > 0) {
      setAllMedia(blog.images);
      setActiveMediaIndex(0);
    } else {
      setAllMedia([]);
    }
  }, [blog]);

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
        stiffness: 300,
      },
    },
    exit: { y: 50, opacity: 0 },
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
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

  // Prevent image navigation buttons from triggering modal close
  const handleNavButtonClick = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation();
    callback();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
      >
        {/* Overlay */}
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
          onClick={handleOutsideClick}
        />

        {/* Modal Container */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          variants={modalVariants}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-4 flex justify-between items-center">
            <h3 className="text-2xl font-bold text-white">{blog.title}</h3>
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
            {/* Blog Images Gallery */}
            {allMedia.length > 0 && (
              <div className="mb-6 rounded-xl overflow-hidden relative">
                {/* Main Image */}
                <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={allMedia[activeMediaIndex]}
                    alt={`${blog.title} - Image ${activeMediaIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Controls - only show if multiple images */}
                  {allMedia.length > 1 && (
                    <>
                      {/* Left Navigation */}
                      <button
                        onClick={(e) => handleNavButtonClick(e, goToPrev)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white transition-all"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      
                      {/* Right Navigation */}
                      <button
                        onClick={(e) => handleNavButtonClick(e, goToNext)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-white transition-all"
                        aria-label="Next image"
                      >
                        <ChevronRight size={24} />
                      </button>
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-md">
                        {activeMediaIndex + 1} / {allMedia.length}
                      </div>
                    </>
                  )}
                </div>
                
                {/* Thumbnail Navigation - show if more than 1 image */}
                {allMedia.length > 1 && (
                  <div className="flex mt-3 gap-2 overflow-x-auto pb-2 snap-x">
                    {allMedia.map((media, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveMediaIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden snap-start ${
                          index === activeMediaIndex
                            ? "ring-2 ring-blue-500"
                            : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={media}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Blog Details */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                  {blog.category}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{blog.date}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                {blog.avatarImage && (
                  <img
                    src={blog.avatarImage}
                    alt={blog.author}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <span className="font-medium">{blog.author}</span>
              </div>

              {/* Blog Content */}
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>
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
    </AnimatePresence>
  );
};

export default BlogModal;