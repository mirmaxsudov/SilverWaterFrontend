import { useState, useEffect } from "react";
import { fetchCategories } from "../../api/request/admin/product/main.api";
import { $api } from "../../api/request";
import { notifyInfo, notifySuccess } from "../../helper/toast";

const EditProductModal = ({ product, onClose, onSave }) => {
  // Categories fetched from the API
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Pre-fill form field states with product data
  const [name, setName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity);
  const [onePrice, setOnePrice] = useState(product.onePrice);
  const [blogPrice, setBlogPrice] = useState(product.blogPrice);
  // New blogCount field; default to product.blogCount or 0 if missing
  const [blogCount, setBlogCount] = useState(product.blogCount || 0);
  const [isDisabled, setIsDisabled] = useState(product.isDisabled);
  // Use product.desc or product.description if available
  const [description, setDescription] = useState(
    product.desc || product.description || ""
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    product.categoryId || null
  );

  // Image states: use product.imageId and photo (if available)
  const [imageId, setImageId] = useState(product.imageId || null);
  const [imagePreview, setImagePreview] = useState(
    typeof product.photo === "string"
      ? product.photo
      : product.photo
        ? URL.createObjectURL(product.photo)
        : null
  );

  // Fetch categories based on search query
  const searchCategoriesHandler = async (query) => {
    try {
      const res = await fetchCategories(query);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    searchCategoriesHandler(searchQuery);
  }, [searchQuery]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/v1/attachment/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      // Assuming API returns { id: 21 }
      setImageId(data.id);
      setImagePreview(URL.createObjectURL(file));
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const handleDeleteImage = async () => {
    if (!imageId) return;
    try {
      await fetch(`/api/v1/attachment/${imageId}`, {
        method: "DELETE",
      });
      setImageId(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  // Handle form submission for updating the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: product.id,
      name,
      quantity: Number(quantity),
      onePrice: Number(onePrice),
      blogPrice: Number(blogPrice),
      blogCount: Number(blogCount),
      isDisabled: isDisabled,
      description,
      imageId: imageId || 0,
      categoryId: selectedCategoryId,
    };

    try {
      const res = await $api.put(
        `/api/v1/products/${product.id}`,
        updatedProduct
      );

      onSave(res.data);
      onClose();

      notifySuccess("Mahsulot muvaffaqiyatli o'zgartirildi");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        notifyInfo("Hamma maydonlarni to'ldiring");
      }
    }
  };

  return (
    <div
      className="fixed gap-4 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-filter backdrop-blur-md"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      tabIndex={0}
    >
      <div
        className="bg-white rounded-lg w-full h-full max-w-4xl max-h-screen overflow-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    One Price
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
                    required
                    value={onePrice}
                    onChange={(e) => setOnePrice(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Blog Price
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
                    required
                    value={blogPrice}
                    onChange={(e) => setBlogPrice(e.target.value)}
                  />
                </div>
                {/* New Blog Count Input */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Blog Count
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      className="w-20 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                      value={blogCount}
                      onChange={(e) => setBlogCount(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setBlogCount(Number(blogCount) + 1)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isDisabled"
                    className="rounded border-gray-300"
                    checked={isDisabled}
                    onChange={(e) => setIsDisabled(e.target.checked)}
                  />
                  <label htmlFor="isDisabled" className="text-sm font-medium">
                    Is Disabled
                  </label>
                </div>
              </div>
              <div className="h-full">
                <div className="h-full">
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full border rounded p-4 h-[80%] focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product description..."
                    required
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between gap-4 mt-5">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <label className="block text-sm font-medium mb-1">
                    Photo
                  </label>
                  <input
                    type="file"
                    className="w-full border rounded p-2 mt-1 block text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
                      file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                {imagePreview && (
                  <div className="relative">
                    <img
                      alt="Preview"
                      src={imagePreview}
                      className="w-32 h-32 rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-sm hover:bg-red-600 focus:outline-none"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
              <div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded text-red-500 border-red-500 hover:bg-red-50 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="category-container bg-white w-96 rounded-lg h-full overflow-auto p-6 shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Categories
        </h1>
        <input
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul className="mt-4 divide-y divide-gray-200">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex items-center justify-between py-3"
            >
              <span className="text-gray-700">{category.name}</span>
              <input
                type="radio"
                name="category"
                className="w-5 h-5 text-blue-600 rounded focus:ring focus:ring-blue-500"
                checked={selectedCategoryId === category.id}
                onChange={() => setSelectedCategoryId(category.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EditProductModal;