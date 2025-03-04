import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { $api } from "../../api/request";
import { fetchProductsNoCategory } from "../../api/request/admin/category/main.api";
import { notifyError, notifySuccess } from "../../helper/toast";

const AddCategoryModal = ({ onClose, onCategoryAdded }) => {
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = fetchProductsNoCategory();
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || name.trim() === "") {
      notifyError("Malumotlarni to'liq kiriting.");
      return;
    }

    const payload = {
      name,
      productIds: selectedProductIds,
    };
    try {
      const res = await $api.post("/api/v1/category", payload);
      onCategoryAdded(res.data);
      onClose();
      notifySuccess("Yengi kategorya qo'shildi.")
    } catch (err) {
      notifyError("Xatolik yuz berdi, qaytadan urinib ko'ring.");
    }
  };

  return (
    <div className="fixed backdrop-blur-md inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">{t("category.modal.add")}</h2>
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
              {t("category.modal.products")}:
            </p>
            {products.length === 0 ? (
              <p className="text-gray-500">{t("category.modal.noProducts")}</p>
            ) : (
              products.map((product, index) => (
                <div key={index} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    id={`prod-${product.id}`}
                    checked={selectedProductIds.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`prod-${product.id}`}>{product.name}</label>
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
              className="px-4 py-2 rounded bg-green-300 text-green-700 hover:bg-green-600 transition hover:text-white"
            >
              {t("category.modal.add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;

AddCategoryModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCategoryAdded: PropTypes.func.isRequired,
};
