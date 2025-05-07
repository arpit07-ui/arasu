import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  deleteAllTeam,
  deleteTeam,
  getAllTeams,
  updateTeam,
} from "../../../services/teamService";
import { AddTeamModal } from "./modals/AddTeamModal";
import { EditTeamModal } from "./modals/EditTeamModal";
import toast from "react-hot-toast";
import { DeleteModal } from "./modals/DeleteModal";

interface TeamMember {
  id: number;
  srNo: string;
  name: string;
  role: string;
  designation: string;
  description: string ;
  uploadDateTime: string;
  visibility: any | boolean;
  images?: any[] | undefined;
  imageFile?: File | null;
  selected?: boolean;
}

const formatDateTime = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleDateString("en-US", options);
};

const TeamManagement: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const res = await getAllTeams();

      // Combine 'data' and 'baos' arrays
      const combined = [...(res.data?.data || []), ...(res.data?.boas || [])];
      const items = combined.map((item: any, index: number) => {
        const formattedDateTime = formatDateTime(item.updatedAt || new Date());
        return {
          ...item,
          srNo: (index + 1).toString().padStart(2, "0"),
          uploadDateTime: formattedDateTime,
        };
      });

      setTeamMembers(items);
    };

    fetchTeams();
  }, [isAddModalOpen, isEditModalOpen]);

  const handleEdit = (member: TeamMember) => {
    setCurrentMember(member);
    setIsEditModalOpen(true);
  };

  const handleUpdateBlog = (updatedBlog: TeamMember) => {
    setTeamMembers((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
    setIsEditModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setDeleteAll(false);
    setDeleteModalOpen(true);
  };

  const handleDeleteAllClick = () => {
    setDeleteId(null);
    setDeleteAll(true);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteAll) {
        const ids = teamMembers.filter((e) => e.selected).map((e) => e.id);
        if (ids.length === 0) {
          toast.error("No teams selected");
          return;
        }
        await deleteAllTeam(ids);
        const selectedIdsSet = new Set(ids);
        setTeamMembers((prev) => prev.filter((e) => !selectedIdsSet.has(e.id)));
        toast.success("Selected teams deleted!");
      } else if (deleteId !== null) {
        await deleteTeam(deleteId);
        setTeamMembers((prev) => prev.filter((e) => e.id !== deleteId));
        toast.success("Teams deleted!");
      }
    } catch (error) {
      console.error("Error deleting team(s):", error);
      toast.error("Failed to delete!");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const handleAddNewClick = () => {
    setIsAddModalOpen(true);
  };

  const updateCheckbox = (idToUpdate: number, e: any) => {
    const updatedCheckbox = teamMembers.map((prev) =>
      prev.id === idToUpdate ? { ...prev, selected: e } : prev
    );
    setTeamMembers(updatedCheckbox);
  };

  const updateAllChecks = (event: boolean) => {
    const updatedCheck = teamMembers.map((prev) => {
      return { ...prev, selected: event };
    });
    setTeamMembers(updatedCheck);
  };

  const handleVisibilityToggle = async (team: TeamMember) => {
    const updatedTeam = {
      ...team,
      visibility: !team.visibility,
    };

    try {
      const res = await updateTeam(updatedTeam);

      // Update local state with new visibility
      const updatedTeams = teamMembers.map((b) =>
        b.id === team.id ? { ...b, visibility: updatedTeam.visibility } : b
      );

      setTeamMembers(updatedTeams); // Trigger re-render
    } catch (error) {
      console.error("Failed to update visibility", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Team Management</h1>
          <button
            onClick={handleAddNewClick}
            className="bg-white border border-gray-300 rounded px-4 py-2 text-sm flex items-center w-full sm:w-auto justify-center"
          >
            <span className="mr-1">+</span> Add Member
          </button>
        </div>

        <div className="overflow-x-hidden">
          <div className="min-w-full bg-white rounded-lg shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 sm:p-3 text-left w-8">
                      <input
                        onChange={(e) => {
                          updateAllChecks(e.target.checked);
                        }}
                        type="checkbox"
                        className="h-4 w-4"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Sr.No
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Profile Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Team Category
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Designation
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Upload Date/Time
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Visibility
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Action
                    </th>
                    <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">
                      <button
                        onClick={() => handleDeleteAllClick()}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={17} />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member, index) => (
                    <tr key={member.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 sm:p-3">
                        <input
                          onChange={(e) =>
                            updateCheckbox(member.id, e.target.checked)
                          }
                          checked={Boolean(member.selected)}
                          type="checkbox"
                          className="h-4 w-4"
                        />
                      </td>

                      <td className="p-2 sm:p-3 text-xs sm:text-sm">
                        {index + 1}
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">
                        {member.name}
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm uppercase">
                        {member.role}
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">
                        {member.designation}
                      </td>
                      <td className="p-2 sm:p-3">
                        <div
                          className="max-w-[100px] sm:max-w-[200px] truncate cursor-pointer text-xs sm:text-sm"
                          title ={member.description}
                        >
                          {member.description}
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">
                        {member.uploadDateTime}
                      </td>

                      <td className="p-2 sm:p-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            name="visibility"
                            checked={member.visibility}
                            onChange={() => handleVisibilityToggle(member)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </td>
                      <td className="p-2 sm:p-3">
                        <div className="flex space-x-1 sm:space-x-2">
                          <button
                            onClick={() => handleDelete(member.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={17} />
                          </button>
                          <button
                            onClick={() => handleEdit(member)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Pencil size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Render Modals */}
        {isAddModalOpen && (
          <AddTeamModal
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddNewClick}
            eventsLength={teamMembers.length}
          />
        )}

        {isEditModalOpen && currentMember && (
          <EditTeamModal
            team={currentMember}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleUpdateBlog}
          />
        )}

        {/* Delete modal */}
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Confirmation"
          description={
            deleteAll
              ? "Are you sure you want to delete selected teams?"
              : "Are you sure you want to delete this team?"
          }
        />
      </div>
    </div>
  );
};

export default TeamManagement;
