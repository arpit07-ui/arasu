import { useState } from "react";
import { updateTeam } from "../../../../services/teamService";

interface TeamMember {
  id: number;
  srNo: string;
  name: string;
  role: string;
  designation: string;
  description: string;
  uploadDateTime: string;
  visibility: any | boolean;
  images?: File[];
}

interface EditMemberModalProps {
  team: TeamMember;
  onClose: () => void;
  onSubmit: (blog: TeamMember) => void;
}

export const EditTeamModal: React.FC<EditMemberModalProps> = ({
  team,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<TeamMember>({
    ...team,
    srNo: team.srNo,
    name: team.name,
    role: team.role,
    designation: team.designation,
    description: team.description,
    uploadDateTime: team.uploadDateTime,
    visibility: team.visibility,
    images: team.images || [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTeam(formData);
      onSubmit(formData);
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Team Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-sm sm:text-base"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-sm sm:text-base h-48"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-3 sm:px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
