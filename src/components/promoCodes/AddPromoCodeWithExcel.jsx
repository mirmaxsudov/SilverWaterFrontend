import { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const AddPromoCodeWithExcel = ({ onClose, onPromoCodeAdded }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an Excel file.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/promo-codes/import",
        {
          method: "POST",
          body: formData,
        },
      );
      if (!response.ok) {
        throw new Error("Failed to import promo codes");
      }
      onPromoCodeAdded();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to import promo codes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">
        {t("promoCodes.addPromoCode.sTitle")}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="font-medium">
          File <br />
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </label>
        {error && <p className="text-red-500">{error}</p>}
        <div className="self-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-300 text-green-700 font-medium py-2 rounded px-4 hover:bg-green-600 transition-all duration-300 hover:text-white mt-[105px]"
          >
            {loading
              ? t("promoCodes.addPromoCode.importing")
              : t("promoCodes.addPromoCode.addWithExcel")}
          </button>
        </div>
      </form>
    </div>
  );
};

AddPromoCodeWithExcel.propTypes = {
  onClose: PropTypes.func.isRequired,
  onPromoCodeAdded: PropTypes.func.isRequired,
};

export default AddPromoCodeWithExcel;
