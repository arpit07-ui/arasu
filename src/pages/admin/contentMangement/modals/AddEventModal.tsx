import React, { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { createEvent } from "../../../../services/eventsService";
import toast from "react-hot-toast";

interface Event {
  srNo: string;
  title: string;
  description: string;
  location: string;
  googleMap: string;
  eventDate: string;
  eventTime: string;
  visibility: boolean;
  images?: File[];
  imagesPreview?: string[];
}

interface AddEventModalProps {
  onClose: () => void;
  onSubmit: (event: any) => void;
  eventsLength: number;
}

interface FormErrors {
  title?: string;
  description?: string;
  location?: string;
  googleMap?: string;
  eventDate?: string;
  eventTime?: string;
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

export const AddEventModal: React.FC<AddEventModalProps> = ({
  onClose,
  onSubmit,
  eventsLength,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<Event>({
    srNo: (eventsLength + 1).toString().padStart(2, "0"),
    title: "",
    description: "",
    location: "",
    googleMap: "",
    eventDate: "",
    eventTime: "",
    visibility: true,
    images: [],
    imagesPreview: [],
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } 

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if(!formData.googleMap.trim()) {
      newErrors.googleMap= "Url is required";
    }


    if (formData.googleMap && !/^https?:\/\//i.test(formData.googleMap)) {
      newErrors.googleMap =
        "Please enter a valid URL starting with http:// or https://";
    }

    if (!formData.eventDate) {
      newErrors.eventDate = "Event date is required";
    } else {
      const selectedDate = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // if (selectedDate < today) {
      //   newErrors.eventDate = "Event date cannot be in the past";
      // }
    }

    if (!formData.eventTime) {
      newErrors.eventTime = "Event time is required";
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

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
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
      // Create a new FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("googleMap", formData.googleMap);
      formDataToSend.append("eventDate", formData.eventDate);
      formDataToSend.append("eventTime", formData.eventTime);
      formDataToSend.append("visibility", String(formData.visibility));

      // Append image files
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file: File) => {
          formDataToSend.append("images", file);
        });
      }

      // Make the API request
      const res = await createEvent(formDataToSend);

      if (res?.data) {
        onSubmit(res.data);
      }

      toast.success("Event created successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Failed to create event. Please try again.");
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
    const newImages = [...(formData.images || [])];
    const newPreviews = [...(formData.imagesPreview || [])];
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
      // Clean up object URLs
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

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Title & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-black mb-1">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter event title"
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

                <div>
                  <label className="block text-sm sm:text-base font-medium text-black mb-1">
                   Event Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter event location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full p-2 bg-[#CACACA6B] bg-opacity-[42%] text-[#696969] border rounded text-sm sm:text-base ${
                      errors.location ? "border-red-500" : ""
                    }`}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm sm:text-base font-medium text-black mb-1">
                    Location Url
                  </label>
                  <input
                    type="text"
                    name="googleMap"
                    value={formData.googleMap}
                    onChange={handleInputChange}
                    className={`w-full p-2 bg-[#CACACA6B] bg-opacity-[42%] text-[#696969] border rounded text-sm sm:text-base ${
                      errors.googleMap ? "border-red-500" : ""
                    }`}
                    placeholder="https://maps.google.com/..."
                  />
                  {errors.googleMap && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.googleMap}
                    </p>
                  )}
                </div>
              </div>

              {/* Event Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-black mb-1">
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className={`w-full p-2 bg-[#CACACA6B] bg-opacity-[42%] text-[#696969] border rounded text-sm sm:text-base ${
                      errors.eventDate ? "border-red-500" : ""
                    }`}
                  />
                  {errors.eventDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.eventDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-black mb-1">
                    Event Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleInputChange}
                    className={`w-full p-2 bg-[#CACACA6B] bg-opacity-[42%] text-[#696969] border rounded text-sm sm:text-base ${
                      errors.eventTime ? "border-red-500" : ""
                    }`}
                  />
                  {errors.eventTime && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.eventTime}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-black mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Enter event description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full p-2 bg-[#CACACA6B] bg-opacity-[42%] text-[#696969] border rounded h-24 text-sm sm:text-base ${
                    errors.description ? "border-red-500" : ""
                  }`}
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

              {/* Upload Image */}
              <div className="w-full">
                <label className="block text-sm sm:text-base font-medium text-black mb-1">
                  Upload Image <span className="text-red-500">*</span>
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
                {errors.images && (
                  <p className="text-red-500 text-xs mt-1">{errors.images}</p>
                )}

                {/* Image Previews */}
                {formData.imagesPreview &&
                  formData.imagesPreview.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-1">
                        {formData.imagesPreview.length} image(s) selected
                      </p>
                      <div className="flex flex-wrap gap-2">
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
                    </div>
                  )}
              </div>

              <div className="flex justify-end space-x-2 sm:space-x-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 sm:px-4 py-2 h-10 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm sm:text-base"
                  disabled={isSubmitting}
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
              <label className="block text-sm text-center font-medium text-gray-700 mb-1">
                Sample Preview*
              </label>
              <div className="rounded-lg p-3 border max-h-full">
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
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mb-1">
                  {formData.location || "Location not specified"} •{" "}
                  {formData.eventDate
                    ? formatDate(formData.eventDate)
                    : "Date not specified"}{" "}
                  {formData.eventTime && `at ${formData.eventTime}`}
                </div>
                <h3 className="font-semibold text-sm sm:text-lg mb-2">
                  {formData.title || "Event Title"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-3">
                  {formData.description || "No description provided"}
                </p>
                <div className="text-xs sm:text-sm">
                  {formData.visibility ? "Public Event" : "Private Event"}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
