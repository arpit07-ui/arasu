import { useState, useEffect } from "react";
import { getAllBlog } from "../services/blogService";
import BlogCard from "./BlogCard";
import BlogModal from "./modals/BlogModal";

export default function BlogsPage() {
  const [filter, setFilter] = useState("All Blogs");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await getAllBlog();
        const visibleBlogs = response.data
          .filter((blog: any) => blog.visibility)
          .map((blog: any) => ({
            id: blog.id,
            images: blog.images,
            title: blog.title,
            content: blog.content,
            date: new Date(blog.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            readTime: blog.readTime,
            author: blog.author,
            avatarImage: `https://avatars.dicebear.com/api/avataaars/${blog.author}.svg`,
            category: blog.blogCategory,
            fullDate: blog.date,
          }));

        setBlogs(visibleBlogs);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  const openModal = (blog: any) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const sortedBlogs = () => {
    if (!blogs || blogs.length === 0) return [];

    switch (filter) {
      case "Newest to Oldest":
        return [...blogs].sort((a, b) => {
          const dateA = new Date(a.fullDate);
          const dateB = new Date(b.fullDate);
          return dateB.getTime() - dateA.getTime();
        });
      case "Oldest to Newest":
        return [...blogs].sort((a, b) => {
          const dateA = new Date(a.fullDate);
          const dateB = new Date(b.fullDate);
          return dateA.getTime() - dateB.getTime();
        });
      default:
        return blogs;
    }
  };

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="font-rethink max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">Blogs</h1>
      <p className="text-center text-gray-600 mt-2 mb-8">
        Quick insights on saving species, ecosystems, and our planet.
      </p>

      {/* Filter buttons */}
      <div className="flex justify-start gap-3 mb-8">
        <button
          onClick={() => setFilter("All Blogs")}
          className={`px-4 py-2 rounded-full border-[1.5px] ${
            filter === "All Blogs"
              ? "bg-black text-white"
              : "bg-white text-black border border-black"
          }`}
        >
          All Blogs
        </button>
        <button
          onClick={() => setFilter("Newest to Oldest")}
          className={`px-4 py-2 rounded-full border-[1.5px] ${
            filter === "Newest to Oldest"
              ? "bg-black text-white"
              : "bg-white text-black border border-black"
          }`}
        >
          Newest to Oldest
        </button>
        <button
          onClick={() => setFilter("Oldest to Newest")}
          className={`px-4 py-2 rounded-full border-[1.5px] ${
            filter === "Oldest to Newest"
              ? "bg-black text-white"
              : "bg-white text-black border border-black"
          }`}
        >
          Oldest to Newest
        </button>
      </div>

      {/* Blog grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBlogs().map((blog: any) => (
          <BlogCard key={blog.id} blog={blog} onClick={() => openModal(blog)} />
        ))}
      </div>

      {/* Blog Modal */}
      {isModalOpen && selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={closeModal} />
      )}
    </div>
  );
}
