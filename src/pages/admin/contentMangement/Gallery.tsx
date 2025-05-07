import React, { useState, useEffect } from "react";
import AddGalleryModal from "./modals/AddGalleryModal";
import {
  deleteAllGallery,
  deleteGallery,
  getAllGallery,
  updateGallery,
} from "../../../services/galleryService";
import { Pencil, Trash2 } from "lucide-react";
import { EditGalleryModal } from "./modals/EditGalleryModal";
import toast from "react-hot-toast";
import { DeleteModal } from "./modals/DeleteModal";

// Define types
export interface GalleryItem {
  id: number;
  title: string;
  uploadDate: string;
  visibility: any | boolean;
  srNo?: string;
  name?: string;
  role?: string;
  designation?: string;
  uploadDateTime?: string;
  images?: string;
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

const GalleryManagement: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<GalleryItem | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Fetch or initialize gallery data

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await getAllGallery();
      const items = res.data?.map((item: any, index: number) => {
        const formattedDateTime = formatDateTime(item.updatedAt || new Date());
        return {
          ...item,
          srNo: (index + 1).toString().padStart(2, "0"),
          uploadDateTime: formattedDateTime,
        };
      });
      setGalleryItems(items);
    };
    fetchBlogs();
  }, [isModalOpen, isEditModalOpen]);

  const updateCheckbox = (idToUpdate: number, e: any) => {
    const updatedCheckbox = galleryItems.map((prev) =>
      prev.id === idToUpdate ? { ...prev, selected: e } : prev
    );
    setGalleryItems(updatedCheckbox);
  };

  const updateAllChecks = (event: boolean) => {
    const updatedCheck = galleryItems.map((prev) => {
      return { ...prev, selected: event };
    });
    setGalleryItems(updatedCheck);
  };

  // Toggle visibility
  const handleVisibilityToggle = async (team: GalleryItem) => {
    const updatedTeam = {
      ...team,
      visibility: !team.visibility,
    };

    try {
      const res = await updateGallery(updatedTeam);

      // Update local state with new visibility
      const updatedTeams = galleryItems.map((b) =>
        b.id === team.id ? { ...b, visibility: updatedTeam.visibility } : b
      );

      setGalleryItems(updatedTeams); // Trigger re-render
    } catch (error) {
      console.error("Failed to update visibility", error);
    }
  };

  // Delete item
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
        const ids = galleryItems.filter((e) => e.selected).map((e) => e.id);
        if (ids.length === 0) {
          toast.error("No items selected");
          return;
        }
        await deleteAllGallery(ids);
        const selectedIdsSet = new Set(ids);
        setGalleryItems((prev) =>
          prev.filter((e) => !selectedIdsSet.has(e.id))
        );
        toast.success("Selected gallery deleted!");
      } else if (deleteId !== null) {
        await deleteGallery(deleteId);
        setGalleryItems((prev) => prev.filter((e) => e.id !== deleteId));
        toast.success("Gallery deleted!");
      }
    } catch (error) {
      console.error("Error deleting gallery(s):", error);
      toast.error("Failed to delete!");
    } finally {
      setDeleteModalOpen(false);
    }
  };
  const handleEdit = (member: GalleryItem) => {
    setCurrentMember(member);
    setIsEditModalOpen(true);
  };

  const handleAddBlog = () => {
    setIsModalOpen(true);
  };

  const handleUpdateBlog = (updatedBlog: GalleryItem) => {
    setGalleryItems((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
    setIsEditModalOpen(false);
  };

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-3xl font-bold">Gallery Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Gallery
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    updateAllChecks(e.target.checked);
                  }}
                  className="form-checkbox h-4 w-4"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Sr.No</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Images</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Images Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Upload Date/Time</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Visibility</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Action</th>
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
            {galleryItems.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  <input
                    type="checkbox"
                    onChange={(e) => updateCheckbox(item.id, e.target.checked)}
                    checked={Boolean(item.selected)}
                    className="form-checkbox h-4 w-4"
                  />
                </td>
                <td className="p-2">{index + 1}</td>
                <td className="p-2 w-5 min-h-2">
                  <img src={item.images[0]} alt="No image" />
                </td>
                <td className="p-2">{item.title}</td>
                <td className="p-2">{item.uploadDateTime}</td>
                <td className="p-2">
                  <div className="relative inline-block w-10 h-5">
                    <input
                      type="checkbox"
                      className="hidden"
                      id={`toggle-${item.id}`}
                      checked={item.visibility}
                      onChange={() => handleVisibilityToggle(item)}
                    />
                    <label
                      htmlFor={`toggle-${item.id}`}
                      className={`block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-200 ease-in ${
                        item.visibility ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-0 left-0 w-5 h-5 rounded-full bg-white transform transition-transform duration-200 ease-in ${
                          item.visibility ? "translate-x-5" : "translate-x-0"
                        }`}
                      ></span>
                    </label>
                  </div>
                </td>
                <td className="p-2 sm:p-3">
                  <div className="flex space-x-1 sm:space-x-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={17} />
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
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

      {/* Render Modal conditionally */}
      {isModalOpen && (
        <AddGalleryModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddBlog}
          eventsLength={galleryItems.length}
        />
      )}

      {isEditModalOpen && currentMember && (
        <EditGalleryModal
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
            ? "Are you sure you want to delete selected gallery?"
            : "Are you sure you want to delete this gallery?"
        }
      />
    </div>
  );
};

export default GalleryManagement;
