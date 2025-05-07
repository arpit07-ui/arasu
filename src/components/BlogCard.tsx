import { Blog } from "../types/blogType";

interface BlogCardProps {
  blog: Blog;
  onClick: () => void;
}

function BlogCard({ blog, onClick }: BlogCardProps) {
  return (
    <div 
      className="rounded-lg overflow-hidden h-[100%] border shadow-md hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={blog.images[0] || "https://dummyimage.com/400x200/cccccc/969696.png&text=No+Image"}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-xl"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-black bg-opacity-70 text-white text-xs px-3 py-1 rounded-full">
            {blog.category}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>{blog.date}</span>
          <span>{blog.readTime}</span>
        </div>

        <h2 className="text-lg font-bold mb-2">{blog.title}</h2>

        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
          {blog.content.replace(/<[^>]*>/g, '')}
        </p>

        <div className="flex items-center mt-auto">
          <img
            src={blog.avatarImage}
            alt={blog.author}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm font-medium">{blog.author}</span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;