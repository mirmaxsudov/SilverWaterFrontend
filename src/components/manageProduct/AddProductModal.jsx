import { useEffect, useState } from "react";
import {
  fetchCategories,
  saveProduct,
} from "../../api/request/admin/product/main.api";
import { $api } from "../../api/request";

const AddProductModal = ({ onClose, addProductToState }) => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [onePrice, setOnePrice] = useState("");
  const [blogPrice, setBlogPrice] = useState("");
  const [blogCount, setBlogCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [imageId, setImageId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
    formData.append("img", file);
    try {
      const response = await $api.post("/api/v1/attachment/upload", formData);
      setImageId(response.data);
      setImagePreview(URL.createObjectURL(file));
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const handleDeleteImage = async () => {
    if (!imageId) return;
    try {
      await $api.delete(`/api/v1/attachment/${imageId}`);
      setImageId(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !quantity ||
      !onePrice ||
      !blogPrice ||
      !description ||
      !selectedCategoryId ||
      !imageId ||
      imageId === 0
    ) {
      alert("To'liq kiriting");
      return;
    }

    const productRequest = {
      name,
      quantity: Number(quantity),
      onePrice: Number(onePrice),
      blogPrice: Number(blogPrice),
      blogCount: Number(blogCount), // use the blogCount state here
      isAvailable: !isDisabled,
      description,
      imageId: imageId || 0,
      categoryId: selectedCategoryId,
    };

    try {
      const response = await saveProduct(productRequest);
      const newProduct = response.data;

      addProductToState(newProduct);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-md gap-4"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      tabIndex={0}
    >
      <div
        className="bg-white rounded-lg w-full max-w-4xl max-h-screen overflow-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Quantity</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">One Price</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  required
                  value={onePrice}
                  onChange={(e) => setOnePrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Blog Price</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  required
                  value={blogPrice}
                  onChange={(e) => setBlogPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Blog Count</label>
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
                <label htmlFor="isDisabled" className="text-sm font-medium text-gray-700">
                  Is Disabled
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Description
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500"
                placeholder="Mahsulot haqida ma'lumot kiriting ..."
                required
                rows={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-end justify-between gap-4 mt-6">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <label className="block text-sm font-medium mb-1 text-gray-700">Photo</label>
                <input
                  type="file"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            <div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-300"
                >
                  Yopish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Qo'shish
                </button>
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
                className="w-5 h-5 text-blue-600"
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

export default AddProductModal;
