import { useState, useEffect, useRef } from "react";

export default function ProjectShowcase() {
  // Sample project data with both images and videos
  const projects = [
    {
      title: "Green Initiative",
      description:
        "A sustainable environmental project focused on urban green spaces and community gardens.",
      completedPercent: 85,
      happyPercent: 92,
      media: [
        {
          type: "image",
          url: "/public/project1/NAT_5291.jpg",
          alt: "marathon",
        },
        {
          type: "image",
          url: "/public/project1/NAT_5852.jpg",
          alt: "marathon",
        },
        {
          type: "image",
          url: "/public/project1/NAT_5865.jpg",
          alt: "marathon",
        },
        {
          type: "image",
          url: "/public/project1/SB233281.jpg",
          alt: "marathon",
        },
        {
          type: "image",
          url: "/public/project1/SB233652.jpg",
          alt: "marathon",
        },
        {
          type: "video",
          url: "/public/project1/WhatsApp Video 2025-05-06 at 22.04.59.mp4",
          alt: "Project video",
        },
      ],
    },
    {
      title: "Eco Housing Development",
      description:
        "Energy-efficient housing using sustainable materials and renewable energy solutions.",
      completedPercent: 70,
      happyPercent: 88,
      media: [
        {
          type: "image",
          url: "/public/project2/img1.jpeg",
          alt: "Eco house design",
        },
        {
          type: "image",
          url: "/public/project2/img2.jpeg",
          alt: "Eco house design",
        },
        {
          type: "image",
          url: "/public/project2/img3.jpeg",
          alt: "Eco house design",
        },
        {
          type: "image",
          url: "/public/project2/img4.jpeg",
          alt: "Eco house design",
        },
        {
          type: "image",
          url: "/public/project2/img5.jpeg",
          alt: "Eco house design",
        },
        {
          type: "image",
          url: "/public/project2/img6.jpeg",
          alt: "Eco house design",
        },
        {
          type: "video",
          url: "/public/project2/WhatsApp Video 2025-03-28 at 17.54.58.mp4",
          alt: "Housing development video",
        },
      ],
    },
    {
      title: "Upcoming Project",
      description:
        "Urban farming initiative promoting local food production and community engagement.",
      completedPercent: 95,
      happyPercent: 96,
      media: [
        {
          type: "image",
          url: "/public/upcomingProject3/img1.jpeg",
          alt: "Community garden",
        },
        {
          type: "image",
          url: "/public/upcomingProject3/img2.jpeg",
          alt: "Community garden",
        },

        {
          type: "image",
          url: "/public/upcomingProject3/img3.jpeg",
          alt: "Harvest event",
        },
      ],
    },
  ];

  // State for fullscreen media viewer
  const [selectedMedia, setSelectedMedia] = useState(null);

  return (
    <>
      <div className="grid md:grid-cols-1 gap-10">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`w-full flex ${
              idx % 2 === 1 ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex flex-col md:flex-row gap-6 pl-4 items-start max-w-5xl w-full">
              <MediaCarousel
                media={project.media}
                onMediaClick={(media: any) => setSelectedMedia(media)}
              />
              <div className="text-start w-[100%] md:pr-10">
                <div className="text-xs text-gray-500 mb-1">
                  — PROJECT SHOWCASE {idx + 1}
                </div>
                <div className="bg-gradient-to-r from-green-600 via-green-900 to-green-950 text-white font-medium rounded-md px-3 py-3 inline-block text-sm mb-2">
                  {project.title}
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {project.description}
                </p>

                <div className="mb-2 relative">
                  <div className="text-xs mb-1">Project Completed</div>
                  <div className="bg-gray-200 h-2 rounded-full relative">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${project.completedPercent}%` }}
                    ></div>
                    <p className="text-xs absolute right-0 -top-5 text-green-600 font-semibold">
                      {project.completedPercent}%
                    </p>
                  </div>
                </div>

                <div className="mb-2 relative">
                  <div className="text-xs mb-1">Happy Members</div>
                  <div className="bg-gray-200 h-2 rounded-full relative">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${project.happyPercent}%` }}
                    ></div>
                    <p className="text-xs absolute right-0 -top-5 text-green-600 font-semibold">
                      {project.happyPercent}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Media Viewer */}
      {selectedMedia && (
        <FullscreenMediaViewer
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </>
  );
}

// Component for auto-sliding carousel of images and videos
function MediaCarousel({ media, onMediaClick }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Start or stop auto-sliding based on isPaused state
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only create a new interval if not paused
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === media.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change slide every 5 seconds
    }

    // Cleanup on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, media.length]);

  const handleMediaClick = (item: any) => {
    console.log("Media clicked:", item);
    setIsPaused(true); // Pause carousel when media is clicked
    onMediaClick(item);
  };

  return (
    <div
      className="relative w-full h-48 rounded-xl shadow-md overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {media.map((item: any, index: any) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          {item.type === "video" ? (
            <div
              className="w-full h-full"
              onClick={(e) => {
                e.stopPropagation();
                handleMediaClick(item);
              }}
            >
              <video
                src={item.url}
                controls
                className="w-full h-full object-cover cursor-pointer"
                alt={item.alt}
                onClick={(e) => e.stopPropagation()}
                onPlay={() => setIsPaused(true)}
                onPause={() => setIsPaused(false)}
              />
              {/* Overlay for click handling */}
              <div
                className="absolute inset-0 cursor-pointer z-10"
                onClick={() => handleMediaClick(item)}
              ></div>
            </div>
          ) : (
            <>
              <img
                src={item.url}
                className="w-full h-full object-cover cursor-pointer"
                alt={item.alt}
              />
              {/* Transparent overlay for better click handling */}
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={() => handleMediaClick(item)}
              ></div>
            </>
          )}
        </div>
      ))}

      {/* Carousel indicator dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-30">
        {media.map((_, index: any) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Fullscreen Media Viewer Component
function FullscreenMediaViewer({ media, onClose }: any) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling when viewer is open
    document.body.style.overflow = "hidden";

    // Reset loading state when media changes
    setIsLoading(true);

    // Allow scrolling when viewer is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [media]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full p-2 z-20"
          aria-label="Close fullscreen view"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Media content container */}
        <div className="relative max-w-screen-xl w-full h-full flex items-center justify-center">
          {media.type === "video" ? (
            <video
              key={media.url}
              src={media.url}
              controls
              autoPlay
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain shadow-lg"
              onLoadedData={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <img
                key={media.url}
                src={media.url}
                alt={media.alt || "Fullscreen image"}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain shadow-lg"
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
