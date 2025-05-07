import React, { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { createProject } from "../../../../services/projectService";
import toast from "react-hot-toast";

interface Event {
  srNo: string;
  title: string;
  description: string;
  location: string;
  status: "ongoing" | "completed" | "";
  date: string;
  visibility: boolean;
  images?: File[];
  imagesPreview?: string[];
  video?: File[];
  videoPreview?: string[];
}

interface AddEventModalProps {
  onClose: () => void;
  onSubmit: (event: any) => void;
  eventsLength: number;
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

export const AddProjectModal: React.FC<AddEventModalProps> = ({
  onClose,
  onSubmit,
  eventsLength,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Event>({
    srNo: (eventsLength + 1).toString().padStart(2, "0"),
    title: "",
    description: "",
    location: "",
    status: "",
    date: "",
    visibility: true,
    images: [],
    imagesPreview: [],
    video: [],
    videoPreview: [],
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Project title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Project location is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // if (selectedDate < today) {
      //   newErrors.date = "Date cannot be in the past";
      // }
    }

    if (!formData.status) {
      newErrors.status = "Project status is required";
    }

    if (!formData.images || !formData.video || formData.images.length === 0) {
      newErrors.images = "At least one image or a video is required";
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

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("visibility", String(formData.visibility));

      // Append images (plural)
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file: File) => {
          formDataToSend.append("images", file);
        });
      }

      // Append video (singular)
      if (formData.video && formData.video.length > 0) {
        formDataToSend.append("video", formData.video[0]);
      }

      const res = await createProject(formDataToSend);

      if (res?.data) {
        onSubmit(res.data);
        toast.success("Project added successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      // Clear previous errors
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.images;
        delete newErrors.video;
        return newErrors;
      });

      const newImages: File[] = [...(formData.images || [])];
      const newVideos: File[] = [...(formData.video || [])];
      const newImagePreviews: string[] = [...(formData.imagesPreview || [])];
      const newVideoPreviews: string[] = [...(formData.videoPreview || [])];

      Array.from(selectedFiles).forEach((file) => {
        if (file.type.startsWith("image/")) {
          // if (file.size > 5 * 1024 * 1024) {
          //   // 5MB limit for images
          //   toast.error(`Image ${file.name} exceeds 5MB limit`);
          //   return;
          // }
          newImages.push(file);
          newImagePreviews.push(URL.createObjectURL(file));
        } else if (file.type.startsWith("video/")) {
          // if (file.size > 50 * 1024 * 1024) {
          //   // 50MB limit for videos
          //   toast.error(`Video ${file.name} exceeds 50MB limit`);
          //   return;
          // }
          newVideos.push(file);
          newVideoPreviews.push(URL.createObjectURL(file));
        }
      });

      setFormData((prev) => ({
        ...prev,
        images: newImages,
        video: newVideos,
        imagesPreview: newImagePreviews,
        videoPreview: newVideoPreviews,
      }));
    }
  };

  const removeFile = (type: "image" | "video", index: number) => {
    if (type === "image") {
      const newImages = [...(formData.images || [])];
      const newPreviews = [...(formData.imagesPreview || [])];
      newImages.splice(index, 1);
      newPreviews.splice(index, 1);

      setFormData((prev) => ({
        ...prev,
        images: newImages,
        imagesPreview: newPreviews,
      }));
    } else {
      const newVideos = [...(formData.video || [])];
      const newPreviews = [...(formData.videoPreview || [])];
      newVideos.splice(index, 1);
      newPreviews.splice(index, 1);

      setFormData((prev) => ({
        ...prev,
        video: newVideos,
        videoPreview: newPreviews,
      }));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles && droppedFiles.length > 0) {
      handleFileSelect({ target: { files: droppedFiles } } as any);
    }
  };

  useEffect(() => {
    return () => {
      // Clean up object URLs
      formData.imagesPreview?.forEach((url) => URL.revokeObjectURL(url));
      formData.videoPreview?.forEach((url) => URL.revokeObjectURL(url));
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

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Title & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-black mb-1">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full p-2 bg-[#CACACA6B] bg-opacity-[42%] text-[#696969] border rounded text-sm sm:text-base ${
                      errors.title ? "border-red-500" : ""
                    }`}
                    placeholder="Enter project title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-black mb-1">
                    Project Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full p-2 bg-[#CACACA6B] bg-opacity-[42%] text-[#696969] border rounded text-sm sm:text-base ${
                      errors.location ? "border-red-500" : ""
                    }`}
                    placeholder="Enter project location"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Event Date & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-black mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`w-full p-2 bg-[#CACACA6B] bg-opacity-[42%] text-[#696969] border rounded text-sm sm:text-base ${
                      errors.date ? "border-red-500" : ""
                    }`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-medium text-black mb-1">
                    Project Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className={`w-full p-2 bg-[#CACACA6B] bg-opacity-[42%] text-[#696969] border rounded text-sm sm:text-base ${
                      errors.status ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select Status</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-xs mt-1">{errors.status}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-black mb-1">
                  Project Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full p-2 bg-[#CACACA6B] bg-opacity-[42%] text-[#696969] border rounded h-24 text-sm sm:text-base ${
                    errors.description ? "border-red-500" : ""
                  }`}
                  placeholder="Enter project description"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Visibility Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="visibility"
                  name="visibility"
                  checked={formData.visibility}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="visibility"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Visible to public
                </label>
              </div>

              {/* Upload Media */}
              <div className="w-full">
                <label className="block text-sm sm:text-base font-medium text-black mb-1">
                  Upload Media <span className="text-red-500">*</span>
                </label>
                <div
                  className={`border-2 border-dashed rounded p-4 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors ${
                    errors.images ? "border-red-500" : "border-blue-300"
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={handleUploadClick}
                >
                  <Upload size={24} className="text-blue-500 mb-2" />
                  <p className="text-sm text-blue-500 text-center">
                    Click or Drag and Drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    (Max 5 images • 1 video)
                  </p>
                  <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple
                    accept="image/*,video/*"
                  />
                </div>
                {errors.images && (
                  <p className="text-red-500 text-xs mt-1">{errors.images}</p>
                )}
                {errors.video && (
                  <p className="text-red-500 text-xs mt-1">{errors.video}</p>
                )}

                {/* Media Previews */}
                <div className="mt-3 space-y-3">
                  {/* Image Previews */}
                  {formData.imagesPreview &&
                    formData.imagesPreview.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Images ({formData.imagesPreview.length}/5)
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {formData.imagesPreview.map((preview, index) => (
                            <div key={`img-${index}`} className="relative">
                              <img
                                src={preview}
                                alt={`Preview ${index}`}
                                className="w-20 h-20 object-cover rounded"
                              />
                              <button
                                type="button"
                                onClick={() => removeFile("image", index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Video Previews */}
                  {formData.videoPreview &&
                    formData.videoPreview.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Video</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.videoPreview.map((preview, index) => (
                            <div key={`vid-${index}`} className="relative">
                              <video
                                src={preview}
                                className="w-20 h-20 object-cover rounded"
                                muted
                                loop
                                playsInline
                              />
                              <button
                                type="button"
                                onClick={() => removeFile("video", index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>

              <div className="flex justify-end space-x-2 sm:space-x-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-3 sm:px-4 py-2 h-10 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-3 sm:px-4 py-2 h-10 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm sm:text-base ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="hidden lg:block">
              <div className="flex justify-center mb-1">
                <label className="block text-sm text-center font-medium text-gray-700">
                  Sample Preview*
                </label>
              </div>
              <div className="rounded-lg p-3 border h-full">
                <div className="relative mb-4">
                  {formData.imagesPreview &&
                  formData.imagesPreview.length > 0 ? (
                    <img
                      src={formData.imagesPreview[0]}
                      alt="Preview"
                      className="w-full h-[280px] object-cover border bg-gray-100 rounded-lg"
                    />
                  ) : formData.videoPreview &&
                    formData.videoPreview.length > 0 ? (
                    <video
                      src={formData.videoPreview[0]}
                      className="w-full h-[280px] object-cover border bg-gray-100 rounded-lg"
                      controls
                      muted
                    />
                  ) : (
                    <div className="w-full h-[280px] flex items-center justify-center bg-gray-100 rounded-lg">
                      <span className="text-gray-500">No media selected</span>
                    </div>
                  )}
                </div>

                <div className="text-xs sm:text-sm text-gray-600 mb-1">
                  {formData.location || "Location not specified"} •{" "}
                  {formData.date
                    ? formatDate(formData.date)
                    : "Date not specified"}
                </div>
                <h3 className="font-semibold text-sm sm:text-lg mb-2">
                  {formData.title || "Project Title"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-3">
                  {formData.description || "No description provided"}
                </p>
                <div className="text-xs sm:text-sm">
                  Status:{" "}
                  <span className="capitalize">
                    {formData.status || "Not specified"}
                  </span>
                </div>
                <div className="text-xs sm:text-sm mt-1">
                  {formData.visibility ? "Public Project" : "Private Project"}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
