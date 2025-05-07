import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { createTeam } from "../../../../services/teamService";
import toast from "react-hot-toast";

interface TeamMember {
  srNo: string;
  name: string;
  role: string;
  designation: string;
  description: string;
  uploadDateTime: string;
  visibility: any | boolean;
  images?: any[] | undefined;
  imagesPreview?: any[] | undefined;
}

interface AddMemberModalProps {
  onClose: () => void;
  onSubmit: (event: any) => void;
  eventsLength: number;
}

export const AddTeamModal: React.FC<AddMemberModalProps> = ({
  onClose,
  onSubmit,
  eventsLength,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<Omit<TeamMember, "id">>({
    srNo: (eventsLength + 1).toString().padStart(2, "0"),
    name: "",
    role: "",
    designation: "",
    description: "",
    uploadDateTime: "",
    visibility: "",
    images: [],
    imagesPreview: [],
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Profile name is required";
    } else if (formData.name.length > 50) {
      newErrors.name = "Profile name must be less than 50 characters";
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = "Team category is required";
    }

    // Designation validation
    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required";
    } else if (formData.designation.length > 100) {
      newErrors.designation = "Designation must be less than 100 characters";
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    // Visibility validation
    if (formData.visibility === "") {
      newErrors.visibility = "Visibility is required";
    }

    // Image validation
    if (!formData.images || formData.images.length === 0) {
      newErrors.images = "Please upload an image";
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

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("visibility", formData.visibility);
      formDataToSend.append("description", formData.description);

      if (formData.designation) {
        formDataToSend.append("designation", formData.designation);
      }

      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file: File) => {
          formDataToSend.append("images", file);
        });
      }

      const res = await createTeam(formDataToSend);

      if (res?.data) {
        onSubmit(res.data);
        onClose();
        toast.success("Team member added successfully!");
      } else {
        throw new Error("No data returned from server");
      }
    } catch (error) {
      console.error("Error creating team member:", error);
      toast.error("Failed to add team member. Please try again.");
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
      // Take only the first file if multiple are selected
      const file = selectedFiles[0];

      // Validate it's an image
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }

      // Validate file size (e.g., 5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const preview = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        images: [file], // Replace with new single file
        imagesPreview: [preview], // Replace with new single preview
      }));

      // Clear image error if any
      if (errors.images) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.images;
          return newErrors;
        });
      }

      // Show success message
      toast.success("Image selected successfully");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles && droppedFiles.length > 0) {
      // Take only the first file if multiple are dropped
      const file = droppedFiles[0];

      // Validate it's an image
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }

      // Validate file size (e.g., 5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const preview = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        images: [file], // Replace with new single file
        imagesPreview: [preview], // Replace with new single preview
      }));

      // Clear image error if any
      if (errors.images) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.images;
          return newErrors;
        });
      }

      // Show success message
      toast.success("Image uploaded successfully");
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

    // Set image error when removing the only image
    if (newImages.length === 0) {
      setErrors((prev) => ({
        ...prev,
        images: "Please upload an image",
      }));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-h-[100%] max-w-2xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Sample Preview*
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleAddSubmit} className="space-y-6">
            {/* Preview Section */}
            <div className="flex justify-center">
              <div className="w-36 h-36 bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200">
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
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                  <p className="font-medium text-sm text-center truncate">
                    {formData.name || "Name"}
                  </p>
                  <p className="text-xs text-center truncate">
                    {formData.role || "Role"}
                  </p>
                  <p className="text-xs text-center truncate">
                    {formData.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Profile Name */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder=""
                  className={`w-full p-2.5 bg-gray-50 border ${
                    errors.name ? "border-red-500" : "border-gray-200"
                  } rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Team Category */}
              <div className="space-y-1 relative">
                <label className="block text-sm font-medium text-gray-700">
                  Team Category
                </label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full p-2.5 pr-8 bg-gray-50 border ${
                      errors.role ? "border-red-500" : "border-gray-200"
                    } rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none`}
                    required
                  >
                    <option value="" disabled hidden>
                      Please select a category
                    </option>
                    <option value="founder">Founder</option>
                    <option value="boa">BOA</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                )}
              </div>

              {/* Visibility */}
              <div className="space-y-1 relative">
                <label className="block text-sm font-medium text-gray-700">
                  Visibility
                </label>
                <div className="relative">
                  <select
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                    className={`w-full p-2.5 pr-8 bg-gray-50 border ${
                      errors.visibility ? "border-red-500" : "border-gray-200"
                    } rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none`}
                    required
                  >
                    <option value="" disabled hidden>
                      Select visibility
                    </option>
                    <option value="true">Visible</option>
                    <option value="false">Hidden</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                {errors.visibility && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.visibility}
                  </p>
                )}
              </div>

              {/* Designation */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="CS / Lawyer / Environmentalist"
                  className={`w-full p-2.5 bg-gray-50 border ${
                    errors.designation ? "border-red-500" : "border-gray-200"
                  } rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                  required
                />
                {errors.designation && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.designation}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write a brief description"
                  className={`w-full p-2.5 bg-gray-50 border ${
                    errors.description ? "border-red-500" : "border-gray-200"
                  } rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                  rows={3}
                  required
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Upload Image - Full width on mobile, half on desktop */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <div
                  className={`border-2 border-dashed ${
                    errors.images ? "border-red-500" : "border-blue-300"
                  } rounded-md p-6 flex flex-col items-center justify-center ${
                    errors.images ? "bg-red-50" : "bg-blue-50"
                  } cursor-pointer hover:bg-blue-100 transition-colors`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={handleUploadClick}
                >
                  <Upload size={24} className="text-blue-500 mb-2" />
                  <p className="text-sm text-blue-600 font-medium text-center">
                    Drag and drop your image here
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    or click to browse files
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*"
                    multiple
                  />
                </div>
                {errors.images && (
                  <p className="text-red-500 text-xs mt-1">{errors.images}</p>
                )}
              </div>
            </div>
            {/* Fixed Footer with Buttons */}
            <div className="pt-4 flex justify-center gap-4 border-t border-gray-200 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-medium"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium disabled:bg-green-400 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
