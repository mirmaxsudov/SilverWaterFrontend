import { useState } from "react";
import PropTypes from "prop-types";
import { $api, BASE_API_URL } from "../../api/request";
import { notifyError } from "../../helper/toast";

const Web3ProductAddModal = ({ onClose, handleWeb3ProductAdded }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
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
            const response = await $api.post(
                `${BASE_API_URL}/api/v1/attachment/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status !== 200) throw new Error("Image upload failed");

            setAttachmentId(response.data);
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
            await $api.delete("/api/v1/attachment/" + attachmentId);
            setAttachmentId(null);
            setPreviewUrl(null);
        } catch (err) {
            notifyError("Qo'shimcha rasmini o'chirishda xatolik yuz berdi.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !attachmentId) {
            setError("Product name and image are required.");
            return;
        }

        const response = await $api.post(`${BASE_API_URL}/api/v1/web3-product`, {
            name,
            price,
            imageId: attachmentId,
        });

        handleWeb3ProductAdded(response.data);
        onClose();

    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded p-6 w-[500px] flex flex-col gap-5">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="mb-4 flex flex-col gap-4">
                        <label>
                            Mahsulot nomi
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border rounded p-2"
                                placeholder="Mahsulot nomi"
                                required
                            />
                        </label>
                        <label>
                            Mahsulot narxi
                            <input
                                type="number"
                                min={0}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full border rounded p-2"
                                placeholder="Mahsulot narxi"
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
                                className="border rounded p-2 mt-1 block w-full text-sm text-gray-500
             file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
             file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
             hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

Web3ProductAddModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onCategoryAdded: PropTypes.func.isRequired,
};

export default Web3ProductAddModal;