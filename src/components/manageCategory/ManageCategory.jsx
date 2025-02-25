import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import EditCategoryModal from "./EditCategoryModal.jsx";
import AddCategoryModal from "./AddCategoryModal.jsx";
import { $api, BASE_API_URL } from "../../api/request.jsx";
import { notifyError } from "../../helper/toast.js";

const ManageCategory = () => {
  // Load the initial category data (via react-router loader)
  const initialData = useLoaderData();
  console.log(initialData);

  const [categories, setCategories] = useState(initialData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { t } = useTranslation();

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Rostdan ham o'chirmoqchimisiz?"))
      return;

    try {
      await $api.delete(`${BASE_API_URL}/api/v1/category/${id}`);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      notifyError("Xatolik yuz berdi, qaytadan urinib ko'ring.")
    }
  };

  const handleOpenEdit = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleCategoryUpdated = (updatedCategory) => {
    setCategories(
      [
        ...categories.map((cat) => cat.id === updatedCategory.id ? updatedCategory : cat)
      ]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{t("category.title")}</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-300 text-green-700 font-semibold py-2 px-4 rounded hover:bg-green-600 transition-all duration-300 hover:text-white"
        >
          {t("category.add")}
        </button>
      </div>

      <table className="w-full mt-5 border-collapse border">
        <thead>
          <tr className="text-center border">
            <th className="font-semibold border p-2">ID</th>
            <th className="font-semibold border p-2">{t("category.name")}</th>
            <th className="font-semibold border p-2">{t("category.count")}</th>
            <th className="font-semibold border p-2">{t("category.edit")}</th>
            <th className="font-semibold border p-2">{t("category.delete")}</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item) => (
            <tr key={item.id} className="text-center border">
              <td className="p-2">{item.id}</td>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.productCount}</td>
              <td className="p-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="bg-blue-300 text-blue-700 font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-all duration-300 hover:text-white"
                >
                  {t("category.edit")}
                </button>
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleDeleteCategory(item.id)}
                  className="bg-red-300 text-red-700 font-semibold py-2 px-4 rounded hover:bg-red-600 transition-all duration-300 hover:text-white"
                >
                  {t("category.delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onCategoryAdded={handleCategoryAdded}
        />
      )}

      {showEditModal && selectedCategory && (
        <EditCategoryModal
          category={selectedCategory}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCategory(null);
          }}
          onCategoryUpdated={handleCategoryUpdated}
        />
      )}
    </div>
  );
};

export const manageCategoryAction = async () => {
  const res = await $api.get(`${BASE_API_URL}/api/v1/category`);
  return res.data;
};

export default ManageCategory;
