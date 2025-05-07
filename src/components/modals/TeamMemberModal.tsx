import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  designation: string | null;
  description: string | null;
  images: string[];
  visibility: boolean;
  //   type: "founder" | "advisor";
  achievements?: string[];
  positions?: string[];
};

type TeamMemberModalProps = {
  member: TeamMember | null;
  onClose: () => void;
};

const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  member,
  onClose,
}) => {
  if (!member) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            {/* Close Button */}
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
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
              </motion.button>
            </div>

            {/* Member Profile Section */}
            <div className="flex flex-col">
              {/* Name and Title with basic info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-800">{member.role}</p>
              </div>

              {/* Main Content Area */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Section - Image */}
                <div className="w-full md:w-1/3">
                  <img
                    src={
                      member.images.length > 0
                        ? member.images[0]
                        : "/images/default-avatar.jpg"
                    }
                    alt={member.name}
                    className="w-full object-cover rounded-md border border-gray-200 shadow-sm"
                  />
                </div>

                {/* Right Section - Biography */}
                <div className="w-full md:w-2/3">
                  <div className="prose max-w-none">
                    {member.description && (
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {member.description}
                      </p>
                    )}

                    {member.achievements && member.achievements.length > 0 && (
                      <div className="mt-4">
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {member.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {member.positions && member.positions.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                          Positions
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {member.positions.map((position, index) => (
                            <li key={index}>{position}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TeamMemberModal;
