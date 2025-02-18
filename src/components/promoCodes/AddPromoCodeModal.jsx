import { useState } from "react";
import PropTypes from "prop-types";
import AddPromoCodeWithExcel from "./AddPromoCodeWithExcel";
import { useTranslation } from "react-i18next";

const AddPromoCodeModal = ({ onClose, onPromoCodeAdded }) => {
  const [code, setCode] = useState("");
  const [gift, setGift] = useState("");
  const [maxUsage, setMaxUsage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || !gift || !maxUsage) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("${BASE_API_URL}/api/v1/promo-codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          gift,
          maxUsage: Number(maxUsage),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add promo code");
      }
      onPromoCodeAdded();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to add promo code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded p-6 w-[600px] flex flex-row gap-10 shadow-2xl overflow-hidden">
        <div>
          <h2 className="text-xl font-bold mb-4"></h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder={t("promoCodes.code")}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder={t("promoCodes.gift")}
              value={gift}
              onChange={(e) => setGift(e.target.value)}
              className="border rounded p-2"
              required
            />
            <input
              type="number"
              placeholder={t("promoCodes.maxUsage")}
              value={maxUsage}
              onChange={(e) => setMaxUsage(e.target.value)}
              className="border rounded p-2"
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-end gap-2 mt-10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
              >
                {t("promoCodes.addPromoCode.cancel")}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded bg-green-300 text-green-700 hover:bg-green-600 transition hover:text-white"
              >
                {loading
                  ? t("promoCodes.addPromoCode.adding")
                  : t("promoCodes.addPromoCode.add")}
              </button>
            </div>
          </form>
        </div>
        <AddPromoCodeWithExcel />
      </div>
    </div>
  );
};

AddPromoCodeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onPromoCodeAdded: PropTypes.func.isRequired,
};

export default AddPromoCodeModal;
