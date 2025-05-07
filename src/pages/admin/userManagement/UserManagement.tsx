import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  deleteAllUser,
  deleteUserTrack,
  getAllUserTrack,
} from "../../../services/userManagementService";
import toast from "react-hot-toast";
import { DeleteModal } from "../contentMangement/modals/DeleteModal";

interface Blog {
  id: number;
  srNo: string;
  ip: string;
  name: string;
  city: string;
  region: string;
  country: string;
  postal: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  selected?: boolean;
}

const UserManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res: any = await getAllUserTrack();

      console.log(res);
      const payload = res?.data?.data?.map((item: any, index: number) => ({
        id: item.id,
        srNo: (index + 1).toString(),
        ip: item.ip,
        name: item.name || "unknown",
        city: item.city,
        region: item.region,
        country: item.country,
        postal: item.postal,
        latitude: item.latitude,
        longitude: item.longitude,
        timeZone: item.timeZone,
        selected: false,
      }));

      setBlogs(payload);
    };

    fetchBlogs();
  }, []);

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
        const ids = blogs.filter((e) => e.selected).map((e) => e.id);
        if (ids.length === 0) {
          toast.error("No users selected");
          return;
        }
        await deleteAllUser(ids);
        const selectedIdsSet = new Set(ids);
        setBlogs((prev) => prev.filter((e) => !selectedIdsSet.has(e.id)));
        toast.success("Selected users deleted!");
      } else if (deleteId !== null) {
        await deleteUserTrack(deleteId);
        setBlogs((prev) => prev.filter((e) => e.id !== deleteId));
        toast.success("Users deleted!");
      }
    } catch (error) {
      console.error("Error deleting user(s):", error);
      toast.error("Failed to delete!");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const upadteCheckbox = (idToUpdate: number, e: any) => {
    const updatedCheckbox = blogs.map((prev) =>
      prev.id === idToUpdate ? { ...prev, selected: e } : prev
    );
    setBlogs(updatedCheckbox);
  };

  const updateCheck = (event: boolean) => {
    const updatedCheck = blogs.map((prev) => {
      return { ...prev, selected: event };
    });
    setBlogs(updatedCheck);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
          <h2 className="text-xl sm:text-3xl font-bold">User Management</h2>
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
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      City
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Region
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Country
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      IP Address
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
                  {blogs?.map((blog, index) => (
                    <tr key={blog.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 sm:p-3">
                        <input
                          onChange={(e) =>
                            upadteCheckbox(blog.id, e.target.checked)
                          }
                          checked={Boolean(blog.selected)}
                          type="checkbox"
                          className="h-4 w-4"
                        />
                      </td>

                      <td className="p-2 sm:p-3 text-xs sm:text-sm">
                        {index + 1}
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">
                        {blog.name}
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">
                        {blog.city}
                      </td>

                      <td className="p-2 text-xs sm:text-sm">{blog.region}</td>

                      <td key={blog.id} className="p-2 text-xs sm:text-sm">
                        {blog.country}
                      </td>
                      <td key={blog.id} className="p-2 text-xs sm:text-sm">
                        {blog.ip}
                      </td>
                      <td className="p-2 sm:p-3">
                        <div className="flex space-x-1 sm:space-x-2">
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={17} />
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
      </div>
      {/* Delete modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Confirmation"
        description={
          deleteAll
            ? "Are you sure you want to delete selected users?"
            : "Are you sure you want to delete this user?"
        }
      />
    </div>
  );
};

export default UserManagement;
