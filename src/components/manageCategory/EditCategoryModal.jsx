import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { $api, BASE_API_URL } from "../../api/request";
import { fetchCategoryEdit } from "../../api/request/admin/category/main.api";

const EditCategoryModal = ({ category, onClose, onCategoryUpdated }) => {
  const [name, setName] = useState(category.name);
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetchCategoryEdit(category.id);
        const data = await res.json();

        const assigned = data.assigned.map((prod) => ({
          ...prod,
          assigned: true,
        }));
        const available = data.available.map((prod) => ({
          ...prod,
          assigned: false,
        }));
        const combined = [...assigned, ...available];
        setProducts(combined);
        setSelectedProductIds(assigned.map((prod) => prod.id));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [category.id]);

  const handleCheckboxChange = (id) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      productIds: selectedProductIds,
    };
    try {
      console.log(payload);

      const res = await fetch(
        `${BASE_API_URL}/api/v1/category/${category.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) {
        alert("Failed to update category");
        return;
      }
      const updatedCategory = await res.json();
      onCategoryUpdated(updatedCategory);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">{t("category.modal.edit")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-1">
              {t("category.modal.name")}:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-4 max-h-40 overflow-y-auto">
            <p className="font-semibold mb-2">
              {t("category.modal.selected")}:
            </p>
            {products.length === 0 ? (
              <p className="text-gray-500">{t("category.modal.noProducts")}</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    id={`edit-prod-${product.id}`}
                    checked={selectedProductIds.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`edit-prod-${product.id}`}>
                    {product.name}{" "}
                    {product.assigned
                      ? `(${t("category.modal.added")})`
                      : `(${t("category.modal.notAdded")})`}
                  </label>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
            >
              {t("category.modal.cancel")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-300 text-blue-700 hover:bg-blue-600 transition hover:text-white"
            >
              {t("category.modal.edit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditCategoryModal.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onCategoryUpdated: PropTypes.func.isRequired,
};

export default EditCategoryModal;
