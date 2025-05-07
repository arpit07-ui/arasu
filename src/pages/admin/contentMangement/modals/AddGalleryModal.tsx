import React, { useEffect, useRef, useState } from "react";
import { createGallery } from "../../../../services/galleryService";
import toast from "react-hot-toast";

// Define types
export interface GalleryItem {
  srNo: string;
  title: string;
  visibility: any | boolean;
  images?: any[] | undefined;
  imagesPreview?: any[] | undefined;
  selected?: boolean;
}

interface AddGalleryModalProps {
  onClose: () => void;
  onSubmit: (event: any) => void;
  eventsLength: number;
}

const AddGalleryModal: React.FC<AddGalleryModalProps> = ({
  onClose,
  onSubmit,
  eventsLength,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    images: "",
  });

  const [formData, setFormData] = useState<GalleryItem>({
    srNo: (eventsLength + 1).toString().padStart(2, "0"),
    title: "",
    visibility: true,
    images: [],
    imagesPreview: [],
  });

  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      title: "",
      images: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      valid = false;
    }

    if (!formData.images || formData.images.length === 0) {
      newErrors.images = "At least one image is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle input change for form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a new FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("visibility", String(formData.visibility));

      // Append image files
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file: File) => {
          formDataToSend.append("images", file);
        });
      }

      // Make the API request
      const res = await createGallery(formDataToSend);

      if (res?.data) {
        toast.success("Gallery created successfully!");
        onSubmit(res.data);
        onClose();
      }
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Failed to create gallery. Please try again.");
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
      // Check if adding these files would exceed the 5-image limit
      const currentImageCount = formData.images?.length || 0;
      const remainingSlots = 5 - currentImageCount;

      if (remainingSlots <= 0) {
        toast.error("You can upload a maximum of 5 images");
        return;
      }

      const filesArray = Array.from(selectedFiles).slice(0, remainingSlots);

      // Validate file size and type
      const validFiles = filesArray.filter((file) => {
        const isValidType = file.type.startsWith("image/");

        if (!isValidType) {
          toast.error(`File ${file.name} is not a valid image`);
        }

        return isValidType;
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
      // Check if adding these files would exceed the 5-image limit
      const currentImageCount = formData.images?.length || 0;
      const remainingSlots = 5 - currentImageCount;

      if (remainingSlots <= 0) {
        toast.error("You can upload a maximum of 5 images");
        return;
      }

      const filesArray = Array.from(droppedFiles).slice(0, remainingSlots);

      // If user dropped more files than remaining slots, show a message
      if (droppedFiles.length > remainingSlots) {
        toast.error(`You can only upload ${remainingSlots} more image(s)`);
      }

      // Validate file size and type
      const validFiles = filesArray.filter((file) => {
        const isValidType = file.type.startsWith("image/");

        if (!isValidType) {
          toast.error(`File ${file.name} is not a valid image`);
        }

        return isValidType;
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white overflow-y-auto max-h-[90%] rounded-lg p-6 w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm text-center font-medium text-gray-700">
              Sample Preview*
            </label>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close preview"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
          </div>

          {/* Centered Image Preview */}
          <div className="flex justify-center">
            <div className="relative rounded-lg overflow-hidden border border-gray-200 min-h-32 max-w-xs">
              {formData.imagesPreview && formData.imagesPreview.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-2 p-3">
                  {formData.imagesPreview.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-28 h-32 object-cover rounded"
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
              ) : (
                <div className="h-28 flex items-center justify-center text-gray-400">
                  No images selected
                </div>
              )}
            </div>
          </div>

          {/* Error message for images */}
          {errors.images && (
            <p className="text-red-500 text-sm text-center -mt-4">
              {errors.images}
            </p>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Image Title Field */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">Image Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${
                  errors.title ? "border-red-500" : "bg-gray-100"
                }`}
                required
                placeholder="CS / Lawyer / Environmentalist"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            {/* Upload Image Area */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">Upload Image</label>
              <div
                className={`border-2 border-dashed ${
                  errors.images ? "border-red-500" : "border-blue-400"
                } rounded-lg p-4 h-16 flex items-center justify-center cursor-pointer bg-blue-50`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleUploadClick}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*"
                  multiple
                />
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-blue-500">
                    Click to upload or drag and drop
                  </span>
                </div>
              </div>
            </div>

            {/* Hidden isVisible field */}
            <input
              type="hidden"
              name="visibility"
              checked={formData.visibility}
              onChange={handleInputChange}
            />
          </div>

          {/* Action Buttons - Centered */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-8 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 font-medium disabled:opacity-50 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGalleryModal;
