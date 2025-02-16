import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromoCodes } from "../../features/promoCodes/promoCodeSlice";
import AddPromoCodeModal from "./AddPromoCodeModal";
import { dateFormater } from "../../helper/dateFormater";

const PromoCodePage = () => {
    const dispatch = useDispatch();
    const promoCodes = useSelector((state) => state.promoCode.data);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isDeletedFilter, setIsDeletedFilter] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    const [showAddModal, setShowAddModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchPromoCodes());
    }, [dispatch]);

    useEffect(() => window.scrollTo(0, 1000), [])

    const filteredPromoCodes = promoCodes.filter((pc) => {
        const searchStr = searchTerm.toLowerCase();
        const matchesSearch =
            pc.code.toLowerCase().includes(searchStr) ||
            pc.gift.toLowerCase().includes(searchStr) ||
            (pc.createdAt && pc.createdAt.toLowerCase().includes(searchStr));
        const matchesStatus = statusFilter === "all" || pc.status === statusFilter;
        const matchesIsDeleted =
            isDeletedFilter === "all" || String(pc.deleted) === isDeletedFilter;
        return matchesSearch && matchesStatus && matchesIsDeleted;
    });

    const totalPages = Math.ceil(filteredPromoCodes.length / pageSize);
    const paginatedPromoCodes = filteredPromoCodes.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const downloadExcel = async (all) => {
        let url;
        if (all) {
            url = "http://localhost:8080/api/v1/promo-codes/download?all=true";
        } else {
            const query = new URLSearchParams();
            if (searchTerm) query.append("search", searchTerm);
            if (statusFilter && statusFilter !== "all")
                query.append("status", statusFilter);
            if (isDeletedFilter && isDeletedFilter !== "all")
                query.append("isDeleted", isDeletedFilter);
            console.log(query);

            url = `http://localhost:8080/api/v1/promo-codes/download?${query.toString()}`;
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
        dispatch(fetchPromoCodes());
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">PromoCodes</h1>
                <div className="flex space-x-4">
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen((prev) => !prev)}
                            className="bg-blue-300 text-blue-700 font-semibold py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition"
                        >
                            Download
                        </button>
                        {dropdownOpen && (
                            <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                                <button
                                    onClick={() => {
                                        downloadExcel(true);
                                        setDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                    Download All
                                </button>
                                <button
                                    onClick={() => {
                                        downloadExcel(false);
                                        setDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                    Download Filtered
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-green-300 text-green-700 font-semibold py-2 px-4 rounded hover:bg-green-600 hover:text-white transition"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            <div className="flex flex-wrap gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by code, gift, or createdAt"
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
                    <option value="all">All Statuses</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                </select>
                <select
                    value={isDeletedFilter}
                    onChange={(e) => {
                        setIsDeletedFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border rounded p-2"
                >
                    <option value="all">All</option>
                    <option value="false">Not Deleted</option>
                    <option value="true">Deleted</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Code
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Gift
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Max Usage
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created At
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Deleted
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedPromoCodes.map((pc) => (
                            <tr
                                key={pc.id}
                                className="hover:bg-gray-100 transition-colors duration-150"
                            >
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
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {pc.status}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {String(pc.deleted)}
                                </td>
                            </tr>
                        ))}
                        {paginatedPromoCodes.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                    No promo codes found.
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
                    Prev
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
                    Next
                </button>
            </div>

            {/* Add Promo Code Modal */}
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
