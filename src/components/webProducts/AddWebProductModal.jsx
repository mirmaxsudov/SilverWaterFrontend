import { useState } from "react";
import PropTypes from "prop-types";
import { $api, BASE_API_URL } from "../../api/request";

const AddWebProductModal = ({ onClose, onCategoryAdded }) => {
  const [name, setName] = useState("");
  const [attachmentId, setAttachmentId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const formData = new FormData();
    formData.append("img", file);

    try {
      setUploading(true);
      const response = await $api.post(`${BASE_API_URL}/attachment/upload`, {
        img: file,
      });
      if (!response.ok) throw new Error("Image upload failed");

      const data = response.data;
      setAttachmentId(data);
    } catch (err) {
      console.error("Image upload error:", err);
      setError("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!attachmentId) return;
    try {
      const response = await fetch(
        `${BASE_API_URL}/attachment/${attachmentId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Image deletion failed");

      setAttachmentId(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error("Delete image error:", err);
      setError("Failed to delete image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !attachmentId) {
      setError("Product name and image are required.");
      return;
    }
    try {
      const response = await $api.post(`${BASE_API_URL}/api/v1/web-product`, {
        name,
        attachmentId,
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      onCategoryAdded();
      onClose();
    } catch (err) {
      console.error("Failed to add product:", err);
      setError("Failed to add product.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded p-6 w-[500px] flex flex-col gap-5">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-4">
            <label>
              Mahsulot nomi
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Mahsulot rasimi
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded p-2"
                required={!attachmentId}
              />
            </label>
          </div>
          {uploading && <p>Uploading image...</p>}
          {previewUrl && (
            <div className="relative mb-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-[300px] h-[300px] object-cover border rounded"
              />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-300 text-green-700 hover:bg-green-600 transition hover:text-white"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddWebProductModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCategoryAdded: PropTypes.func.isRequired,
};

export default AddWebProductModal;
