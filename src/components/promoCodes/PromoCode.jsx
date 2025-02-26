import { useState, useEffect } from "react";
import { dateFormater } from "../../helper/dateFormater";
import { useTranslation } from "react-i18next";
import { BASE_API_URL, $api } from "../../api/request";
import AddPromoCodeModal from "./AddPromoCodeModal";
import "./PromoCode.css";

const PromoCodePage = () => {
  const { t } = useTranslation();

  const [promoCodes, setPromoCodes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isDeletedFilter, setIsDeletedFilter] = useState("ALL");

  // Pagination state (using 1-based UI; backend uses 0-based index)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Modal & dropdown states
  const [showAddModal, setShowAddModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // New state for checkboxes (selected promo code IDs)
  const [selectedPromoCodes, setSelectedPromoCodes] = useState([]);

  const fetchPromoCodes = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", currentPage - 1); // convert to 0-indexed for backend
      queryParams.append("size", pageSize);
      if (searchTerm.trim().length > 0) {
        queryParams.append("query", searchTerm.trim());
      }
      if (statusFilter !== "ALL") {
        queryParams.append("active", statusFilter);
      }
      if (isDeletedFilter !== "ALL") {
        queryParams.append("delete", isDeletedFilter);
      }
      const res = await $api.get(`/api/v1/promo-codes/page?${queryParams.toString()}`);
      console.log(res);
      setPromoCodes(res.data.promoCodes);
      setTotal(res.data.total);
      // Clear selected items when new data is loaded
      setSelectedPromoCodes([]);
    } catch (err) {
      console.error("Error fetching promo codes:", err);
      setError("Error fetching promo codes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromoCodes();
    window.scrollTo(0, 0);
  }, [currentPage, searchTerm, statusFilter, isDeletedFilter]);

  const totalPages = Math.ceil(total / pageSize);

  const downloadExcel = async (all) => {
    let url;
    if (all) {
      url = `${BASE_API_URL}/api/v1/promo-codes/download?all=true`;
    } else {
      const query = new URLSearchParams();
      if (searchTerm) query.append("query", searchTerm);
      if (statusFilter && statusFilter !== "ALL")
        query.append("active", statusFilter);
      if (isDeletedFilter && isDeletedFilter !== "ALL")
        query.append("delete", isDeletedFilter);
      url = `${BASE_API_URL}/api/v1/promo-codes/download?${query.toString()}`;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "promo_codes.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const handlePromoCodeAdded = () => {
    fetchPromoCodes();
  };

  // Toggle selection of a single promo code
  const toggleSelectPromoCode = (id) => {
    setSelectedPromoCodes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Toggle selection for all promo codes on current page
  const toggleSelectAll = () => {
    if (selectedPromoCodes.length === promoCodes.length) {
      setSelectedPromoCodes([]);
    } else {
      setSelectedPromoCodes(promoCodes.map((pc) => pc.id));
    }
  };

  // Delete a single promo code
  const deletePromoCode = async (id) => {
    try {
      await $api.delete(`/api/v1/promo-codes/${id}`);
      fetchPromoCodes();
    } catch (err) {
      console.error("Error deleting promo code:", err);
    }
  };

  // Delete selected promo codes in bulk
  const deleteSelectedPromoCodes = async () => {
    if (selectedPromoCodes.length === 0) return;
    try {
      // Assuming your backend expects a DELETE with a JSON body containing an array of IDs.
      await $api.delete("/api/v1/promo-codes/delete-by-ids", {
        data: selectedPromoCodes,
      });
      fetchPromoCodes();
    } catch (err) {
      console.error("Error deleting selected promo codes:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">
          {t("promoCodes.title", { count: total })}
        </h1>
        <div className="flex space-x-4">
          {/* Global Delete Button: shows when any promo code is selected */}
          {selectedPromoCodes.length > 0 && (
            <button
              onClick={deleteSelectedPromoCodes}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
            >
              O'chirib yuborish
            </button>
          )}
          <div className="relative">
            {/* <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="bg-blue-300 text-blue-700 font-semibold py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition"
            >
              {t("promoCodes.download")}
            </button> */}
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                <button
                  onClick={() => {
                    downloadExcel(true);
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  {t("promoCodes.downloadAll")}
                </button>
                <button
                  onClick={() => {
                    downloadExcel(false);
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  {t("promoCodes.downloadFiltered")}
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-300 text-green-700 font-semibold py-2 px-4 rounded hover:bg-green-600 hover:text-white transition"
          >
            {t("promoCodes.add")}
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder={t("promoCodes.filter.searchPlaceHolder")}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded p-2 w-[400px]"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded p-2"
        >
          <option value="ALL">{t("promoCodes.filter.all")}</option>
          <option value="ACTIVE">{t("promoCodes.filter.active")}</option>
          <option value="INACTIVE">{t("promoCodes.filter.inactive")}</option>
        </select>
        <select
          value={isDeletedFilter}
          onChange={(e) => {
            setIsDeletedFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded p-2"
        >
          <option value="ALL">{t("promoCodes.filter.all")}</option>
          <option value="NOT_DELETED">{t("promoCodes.filter.notDeleted")}</option>
          <option value="DELETED">{t("promoCodes.filter.deleted")}</option>
        </select>
      </div>

      {loading ? (
        <div>{t("promoCodes.loading")}</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <>
          {/* Promo Codes Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* Checkbox Column */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={
                        promoCodes.length > 0 &&
                        selectedPromoCodes.length === promoCodes.length
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("promoCodes.code")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("promoCodes.gift")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("promoCodes.maxUsage")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("promoCodes.createdAt")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("promoCodes.status")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("promoCodes.deleted")}
                  </th>
                  {/* Actions Column for single deletion */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("promoCodes.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {promoCodes && promoCodes.length > 0 ? (
                  promoCodes.map((pc) => (
                    <tr
                      key={pc.id}
                      className="hover:bg-gray-100 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedPromoCodes.includes(pc.id)}
                          onChange={() => toggleSelectPromoCode(pc.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pc.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pc.gift}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pc.maxUsage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {dateFormater(pc.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        <div
                          className={`rounded py-1 ${pc.status === "ACTIVE"
                            ? "bg-green-400"
                            : "bg-orange-500"
                            }`}
                        >
                          {pc.status === "ACTIVE"
                            ? t("promoCodes.filter.active")
                            : t("promoCodes.filter.inactive")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        <div
                          className={`rounded py-1 ${pc.deleted ? "bg-yellow-400" : "bg-red-600 text-white"
                            }`}
                        >
                          {pc.deleted
                            ? t("promoCodes.filter.deleted")
                            : t("promoCodes.filter.notDeleted")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        <button
                          disabled={pc.deleted}
                          onClick={() => deletePromoCode(pc.id)}
                          className="disabled:bg-red-300 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-300"
                        >
                          O'chirib
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      {t("promoCodes.noData")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              {t("promoCodes.preview")}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-500 text-white" : ""
                  }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              {t("promoCodes.next")}
            </button>
          </div>
        </>
      )}

      {showAddModal && (
        <AddPromoCodeModal
          onClose={() => setShowAddModal(false)}
          onPromoCodeAdded={handlePromoCodeAdded}
        />
      )}
    </div>
  );
};

export default PromoCodePage;