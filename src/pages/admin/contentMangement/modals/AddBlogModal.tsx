import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Upload } from "lucide-react";
import { createBlog } from "../../../../services/blogService";
import toast from "react-hot-toast";

interface Blog {
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
  imagesPreview?: any[] | undefined;
}

interface AddBlogModalProps {
  onClose: () => void;
  onSubmit: (blog: any) => void;
  blogsLength: number;
}

interface ValidationErrors {
  title?: string;
  author?: string;
  date?: string;
  blogCategory?: string;
  readTime?: string;
  content?: string;
  images?: string;
}

const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};

export const AddBlogModal: React.FC<AddBlogModalProps> = ({
  onClose,
  onSubmit,
  blogsLength,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [formData, setFormData] = useState<Blog>({
    srNo: (blogsLength + 1).toString().padStart(2, "0"),
    author: "",
    blogId: "",
    title: "",
    content: "",
    date: "",
    visibility: true,
    blogCategory: "",
    readTime: "",
    images: [],
    imagesPreview: [] as string[],
  });

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Blog title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author name is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.blogCategory) {
      newErrors.blogCategory = "Blog category is required";
    }

    if (!formData.readTime) {
      newErrors.readTime = "Read time is required";
    }

    if (!formData.content || formData.content.trim().length < 10) {
      newErrors.content = "Blog description should be at least 10 characters";
    }

    if (!formData.images || formData.images.length === 0) {
      newErrors.images = "At least one image is required";
    } else if (formData.images.length > 5) {
      newErrors.images = "Maximum 5 images allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleReadTimeSelect = (time: string) => {
    // Clear error for readTime when user selects a value
    if (errors.readTime) {
      setErrors({
        ...errors,
        readTime: undefined,
      });
    }

    setFormData({
      ...formData,
      readTime: time,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      const inputDate = formData.date;
      const dateObj = new Date(inputDate);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = dateObj.getFullYear();
      const formattedDate = `${month}-${day}-${year}`;

      // Create a new FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("date", formattedDate);
      formDataToSend.append("readTime", formData.readTime);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("blogCategory", formData.blogCategory);
      formDataToSend.append("visibility", String(formData.visibility));

      // Append images using 'images[]' key
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file: File) => {
          formDataToSend.append("images", file);
        });
      }

      // Submit form data
      const res = await createBlog(formDataToSend);

      if (res?.data) {
        toast.success("Blog created successfully!");
        onSubmit(res.data);
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      toast.error("Failed to create blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const currentImageCount = formData.images?.length || 0;
      const remainingSlots = Math.max(0, 5 - currentImageCount);

      if (remainingSlots === 0) {
        toast.error("Maximum limit of 5 images reached");
        return;
      }

      const filesArray = Array.from(selectedFiles).slice(0, remainingSlots);

      // Validate file type and size (2MB limit example)
      const validFiles = filesArray.filter((file) => {
        const isValidType = file.type.startsWith("image/");

        if (!isValidType) {
          toast.error(`File ${file.name} is not a valid image`);
          return false;
        }

        return true;
      });

      if (validFiles.length > 0) {
        const previews = validFiles.map((file) => URL.createObjectURL(file));

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...validFiles],
          imagesPreview: [...prev.imagesPreview, ...previews],
        }));
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles && droppedFiles.length > 0) {
      const currentImageCount = formData.images?.length || 0;
      const remainingSlots = Math.max(0, 5 - currentImageCount);

      if (remainingSlots === 0) {
        toast.error("Maximum limit of 5 images reached");
        return;
      }

      const filesArray = Array.from(droppedFiles).slice(0, remainingSlots);

      // Validate file type and size (2MB limit example)
      const validFiles = filesArray.filter((file) => {
        const isValidType = file.type.startsWith("image/");

        if (!isValidType) {
          toast.error(`File ${file.name} is not a valid image`);
          return false;
        }

        return true;
      });

      if (validFiles.length > 0) {
        const previews = validFiles.map((file) => URL.createObjectURL(file));

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...validFiles],
          imagesPreview: [...prev.imagesPreview, ...previews],
        }));
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    const newPreviews = [...formData.imagesPreview];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      images: newImages,
      imagesPreview: newPreviews,
    }));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    return () => {
      // Clean up object URLs when component unmounts
      formData.imagesPreview?.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full h-[95vh] sm:h-[90vh] overflow-y-auto max-w-6xl relative">
        {/* Close button at top-right corner */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4 sm:space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Author Name & Blog Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-black mb-1">
                    Author Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    placeholder="Enter author name"
                    value={formData.author}
                    onChange={handleInputChange}
                    className={`w-full p-2 bg-[#CACACA6B] bg-opacity-[42%] text-[#696969] border rounded text-sm sm:text-base ${
                      errors.author ? "border-red-500" : ""
                    }`}
                  />
                  {errors.author && (
                    <p className="text-red-500 text-xs mt-1">{errors.author}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-black mb-1">
                    Blog Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="blogCategory"
                      value={formData.blogCategory}
                      onChange={handleInputChange}
                      className={`w-full p-2 bg-[#CACACA6B] bg-opacity-[42%] text-[#696969] border rounded appearance-none text-sm sm:text-base ${
                        errors.blogCategory ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select Category</option>
                      <option value="Conservation">Conservation</option>
                      <option value="Wildlife">Wildlife</option>
                      <option value="Culinary">Culinary</option>
                      <option value="Agriculture">Agriculture</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                  {errors.blogCategory && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.blogCategory}
                    </p>
                  )}
                </div>
              </div>

              {/* Read Time & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="">
                  <label className="block text-sm sm:text-base font-medium text-black mb-1">
                    Read Time <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-1">
                    {["5min", "10min", "15min"].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleReadTimeSelect(time)}
                        className={`px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm ${
                          formData.readTime === time
                            ? "bg-green-500 text-white"
                            : "bg-[#CACACA6B] bg-opacity-[42%] text-[#696969]"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {errors.readTime && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.readTime}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-black mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      const newDate = e.target.value;
                      setSelectedDate(newDate);
                      const formattedDate = formatDate(newDate);

                      // Clear error when user selects a date
                      if (errors.date) {
                        setErrors({
                          ...errors,
                          date: undefined,
                        });
                      }

                      setFormData({
                        ...formData,
                        date: formattedDate ? formattedDate : newDate,
                      });
                    }}
                    className={`w-full p-2 bg-[#CACACA6B] bg-opacity-[42%] text-[#696969] border rounded text-sm sm:text-base ${
                      errors.date ? "border-red-500" : ""
                    }`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                  )}
                </div>
              </div>

              {/* Blog Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter blog title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full p-2 bg-[#CACACA6B] bg-opacity-[42%] text-[#696969] border rounded text-sm sm:text-base ${
                    errors.title ? "border-red-500" : ""
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              {/* Blog Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  placeholder="Enter description"
                  value={formData.content}
                  onChange={handleInputChange}
                  className={`w-full p-2 bg-[#CACACA6B] bg-opacity-[42%] text-[#696969] border rounded h-24 text-sm sm:text-base ${
                    errors.content ? "border-red-500" : ""
                  }`}
                />
                {errors.content && (
                  <p className="text-red-500 text-xs mt-1">{errors.content}</p>
                )}
              </div>

              <div className="w-full">
                {/* Upload Image */}
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Image
                    </label>

                    <div
                      className="border-2 border-dashed border-blue-300 rounded p-4 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={handleUploadClick}
                    >
                      <Upload size={24} className="text-blue-500 mb-2" />
                      <p className="text-sm text-blue-500 text-center">
                        Click or Drag and Drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        (Max 5 images)
                      </p>
                      <input
                        type="file"
                        id="fileUpload"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        multiple
                        accept="image/*"
                      />
                    </div>

                    {/* Image Previews */}
                    {formData.imagesPreview.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.imagesPreview.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${index}`}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 sm:space-x-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 sm:px-4 py-2 h-10 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm sm:text-base disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-3 sm:px-4 py-2 h-10 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm sm:text-base disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="hidden lg:block">
              <label className="block text-sm text-center font-medium text-gray-700 mb-1">
                Sample Preview*
              </label>
              <div className="rounded-lg p-3 border">
                <div className="relative mb-4">
                  {formData.imagesPreview &&
                  formData.imagesPreview.length > 0 ? (
                    <img
                      src={formData.imagesPreview[0]}
                      alt="Preview"
                      className="w-full h-[280px] object-cover border bg-gray-100 rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-[280px] flex items-center justify-center bg-gray-100 rounded-lg">
                      <span className="text-gray-500">No image selected</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-[50%] text-white p-1 px-2 rounded-xl border-[1.1px] border-white text-xs">
                    {formData.blogCategory}
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mb-1">
                  {formData.date} - {formData.readTime}
                </div>
                <h3 className="font-semibold text-sm sm:text-lg mb-2">
                  {formData.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-3">
                  {formData.content}
                </p>
                <div className="text-xs sm:text-sm font-medium">
                  {formData.author}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
