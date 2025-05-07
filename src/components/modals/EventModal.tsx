import { motion, AnimatePresence } from "framer-motion";
import EventImageSlider from "../EventImageSlider";
import { EventItem } from "../../types/homeType";

interface EventModalProps {
  event: EventItem;
  onClose: () => void;
}

const EventModal = ({ event, onClose }: EventModalProps) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: { y: 20, opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-50 overflow-y-auto"
        style={{ pointerEvents: "auto" }}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
          onClick={onClose}
          variants={backdropVariants}
        />

        {/* Modal container - centers the modal */}
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </div>

          {/* Modal */}
          <motion.div
            className="relative inline-block w-full max-w-3xl p-0 my-8 text-left align-middle bg-white rounded-2xl shadow-2xl overflow-hidden sm:my-16"
            variants={modalVariants}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white" id="modal-headline">
                {event.title}
              </h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition p-1 rounded-full hover:bg-white hover:bg-opacity-10"
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

            {/* Body */}
            <div className="p-6 space-y-6">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <EventImageSlider images={event.images} />
              </div>

              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-2"
              >
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-800 border border-gray-200 shadow-sm">
                  {event.category}
                </span>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="font-semibold text-lg text-gray-800 mb-2">
                  About This Event
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </motion.div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Location",
                    iconPath:
                      "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                    value: event.location,
                  },
                  {
                    title: "Date & Time",
                    iconPath:
                      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                    value: event.dateTime,
                  },
                ].map(({ title, iconPath, value }, i) => (
                  <motion.div
                    key={title}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="flex items-center mb-2">
                      <svg
                        className="w-5 h-5 text-gray-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d={iconPath}
                        />
                      </svg>
                      <h4 className="font-medium text-gray-800">{title}</h4>
                    </div>
                    <p className="text-gray-600 pl-7">{value}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row-reverse sm:justify-between">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                {event.googleMap && (
                  <button
                    onClick={() => window.open(event.googleMap, "_blank")}
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors shadow-sm"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    View Location
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventModal;
