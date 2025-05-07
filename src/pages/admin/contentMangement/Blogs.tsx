import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { AddBlogModal } from "./modals/AddBlogModal";
import { EditBlogModal } from "./modals/EditBlogModal";
import {
  deleteAllBlog,
  deleteBlog,
  getAllBlog,
  updateBlog,
} from "../../../services/blogService";
import { DeleteModal } from "./modals/DeleteModal";
import toast from "react-hot-toast";

// Removed: import { Helmet } from "react-helmet-async";

interface Blog {
  id: number;
  srNo: string;
  author: string;
  blogId: string;
  title: string;
  content?: string;
  date: string;
  visibility: any | boolean;
  blogCategory?: string;
  readTime?: string;
  images?: any[] | undefined;
  selected?: boolean;
}

const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ✅ Set dynamic title for SEO
  useEffect(() => {
    document.title = "Blog Management | Admin Dashboard";
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await getAllBlog();
      const items = res.data?.map((item: any) => {
        const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return { ...item, date: formattedDate };
      });
      setBlogs(items);
    };
    fetchBlogs();
  }, [isAddModalOpen, isEditModalOpen]);

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
          toast.error("No blogs selected");
          return;
        }
        await deleteAllBlog(ids);
        const selectedIdsSet = new Set(ids);
        setBlogs((prev) => prev.filter((e) => !selectedIdsSet.has(e.id)));
        toast.success("Selected blogs deleted!");
      } else if (deleteId !== null) {
        await deleteBlog(deleteId);
        setBlogs((prev) => prev.filter((e) => e.id !== deleteId));
        toast.success("Blogs deleted!");
      }
    } catch (error) {
      console.error("Error deleting blog(s):", error);
      toast.error("Failed to delete!");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsEditModalOpen(true);
  };

  const handleAddNewClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddBlog = (newBlog: any) => {
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
    setIsAddModalOpen(false);
  };

  const handleUpdateBlog = (updatedBlog: Blog) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
    setIsEditModalOpen(false);
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

  const handleVisibilityToggle = async (blog: Blog) => {
    const updatedBlog = {
      ...blog,
      visibility: !blog.visibility,
    };

    try {
      await updateBlog(updatedBlog);
      const updatedBlogs = blogs.map((b) =>
        b.id === blog.id ? { ...b, visibility: updatedBlog.visibility } : b
      );
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error("Failed to update visibility", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
          <h2 className="text-xl sm:text-3xl font-bold">Blog Management</h2>
          <button
            onClick={handleAddNewClick}
            className="bg-white border border-gray-300 rounded px-4 py-2 text-sm flex items-center w-full sm:w-auto justify-center"
          >
            <span className="mr-1">+</span> Add Blog
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
                        onChange={(e) => updateCheck(e.target.checked)}
                        type="checkbox"
                        className="h-4 w-4"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Sr.No</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Author</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Blog ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date/Time</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Visibility</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Action</th>
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
                  {blogs.map((blog, index) => (
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
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">{index + 1}</td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">{blog.author}</td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">{blog.blogId}</td>
                      <td className="p-2 sm:p-3">
                        <div
                          className="max-w-[100px] sm:max-w-[200px] truncate cursor-pointer text-xs sm:text-sm"
                          title={blog.title}
                        >
                          {blog.title}
                        </div>
                      </td>
                      <td className="p-2 text-xs sm:text-sm">{blog.date}-{blog.readTime}</td>
                      <td key={blog.id} className="p-2 sm:p-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={blog.visibility}
                            onChange={() => handleVisibilityToggle(blog)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </td>
                      <td className="p-2 sm:p-3">
                        <div className="flex space-x-1 sm:space-x-2">
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={17} />
                          </button>
                          <button
                            onClick={() => handleEdit(blog)}
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

        {/* Modals */}
        {isAddModalOpen && (
          <AddBlogModal
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddBlog}
            blogsLength={blogs.length}
          />
        )}

        {isEditModalOpen && currentBlog && (
          <EditBlogModal
            blog={currentBlog}
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
              ? "Are you sure you want to delete selected blogs?"
              : "Are you sure you want to delete this blog?"
          }
        />
      </div>
    </div>
  );
};

export default BlogManagement;
