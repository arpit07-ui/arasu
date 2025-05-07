import React, { useEffect, useState } from "react";
import { FiTrash2, FiEdit2, FiPlus } from "react-icons/fi";
import { Trash2 } from "lucide-react";
import { AddProjectModal } from "./modals/AddProjectModal";
import { EditProjectModal } from "./modals/EditProjectModal";
import { DeleteModal } from "./modals/DeleteModal"; // 🆕 Import
import {
  deleteAllProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "../../../services/projectService";
import toast from "react-hot-toast";

interface Event {
  id: number;
  srNo: string;
  title: string;
  description: string;
  dateTime: string;
  visibility: any | boolean;
  selected?: boolean;
  visible?: boolean;
}

const Project: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<Event | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getAllProjects();
      const items = res.data?.map((item: any) => {
        const formattedDate = item.date
          ? new Date(item.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "No date specified";

        return {
          ...item,
          formattedDate,
          date: formattedDate,
        };
      });
      setEvents(items);
    };
    fetchProjects();
  }, [isAddModalOpen, isEditModalOpen]);

  const upadteCheckbox = (idToUpdate: number, e: any) => {
    const updatedCheckbox = events.map((prev) =>
      prev.id === idToUpdate ? { ...prev, selected: e } : prev
    );
    setEvents(updatedCheckbox);
  };

  const updateCheck = (event: boolean) => {
    const updatedCheck = events.map((prev) => {
      return { ...prev, selected: event };
    });
    setEvents(updatedCheck);
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
        const ids = events.filter((e) => e.selected).map((e) => e.id);
        if (ids.length === 0) {
          toast.error("No projects selected");
          return;
        }
        await deleteAllProject(ids);
        const selectedIdsSet = new Set(ids);
        setEvents((prev) => prev.filter((e) => !selectedIdsSet.has(e.id)));
        toast.success("Selected projects deleted!");
      } else if (deleteId !== null) {
        await deleteProject(deleteId);
        setEvents((prev) => prev.filter((e) => e.id !== deleteId));
        toast.success("Project deleted!");
      }
    } catch (error) {
      console.error("Error deleting project(s):", error);
      toast.error("Failed to delete!");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const handleEdit = (member: Event) => {
    setCurrentMember(member);
    setIsEditModalOpen(true);
  };

  const openModal = () => {
    setIsAddModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddEvent = (newEvent: Omit<Event, "id" | "srNo" | "visible">) => {
    const newId =
      events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;
    const newSrNo = newId.toString().padStart(2, "0");

    const eventToAdd: Event = {
      id: newId,
      srNo: newSrNo,
      ...newEvent,
      visible: true,
    };

    setEvents([...events, eventToAdd]);
    closeModal();
  };

  const handleVisibilityToggle = async (blog: Event) => {
    const updatedBlog = {
      ...blog,
      visibility: !blog.visibility,
    };

    try {
      await updateProject(updatedBlog);

      const updatedBlogs = events.map((b) =>
        b.id === blog.id ? { ...b, visibility: updatedBlog.visibility } : b
      );

      setEvents(updatedBlogs);
    } catch (error) {
      console.error("Failed to update visibility", error);
    }
  };

  const handleUpdateBlog = (updatedBlog: Event) => {
    setEvents((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Project Management</h1>
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50"
        >
          <FiPlus size={16} />
          <span>Add Project</span>
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="w-12 px-4 py-3">
                <input
                  onChange={(e) => {
                    updateCheck(e.target.checked);
                  }}
                  type="checkbox"
                  className="h-4 w-4"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Sr.No
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Project Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Project Description
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Visibility
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Action
              </th>
              <th className="p-2 sm:p-3 text-left text-xs sm:text-sm">
                <button
                  onClick={handleDeleteAllClick}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={17} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={event.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <input
                    onChange={(e) => upadteCheckbox(event.id, e.target.checked)}
                    checked={Boolean(event.selected)}
                    type="checkbox"
                    className="h-4 w-4"
                  />
                </td>
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm">{event.title}</td>
                <td className="p-2 sm:p-3">
                  <div
                    className="max-w-[100px] sm:max-w-[200px] truncate cursor-pointer text-xs sm:text-sm"
                    title={event.description}
                  >
                    {event.description}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  <span>{event.formattedDate}</span>
                </td>
                <td className="px-4 py-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={event.visibility}
                      onChange={() => handleVisibilityToggle(event)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </td>
                <td className="px-4 py-3 flex items-center space-x-2">
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={17} />
                  </button>
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEdit2 size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <AddProjectModal
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddEvent}
          eventsLength={events.length}
        />
      )}

      {isEditModalOpen && currentMember && (
        <EditProjectModal
          eventData={currentMember}
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
            ? "Are you sure you want to delete selected projects?"
            : "Are you sure you want to delete this project?"
        }
      />
    </div>
  );
};

export default Project;
