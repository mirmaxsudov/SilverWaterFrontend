import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AddMangeAuction from "./AddMangeAuction";
import {
  deleteById,
  fetchAuctionsPage,
} from "../../api/request/admin/auction/main.api";
import {
  dateFormater,
  dateFormatterWithTime,
} from "./../../helper/dateFormater";
import { notifySuccess } from "../../helper/toast";

const DOTS = "...";

const getPaginationRange = (currentPage, totalPages, siblingCount = 1) => {
  const totalPageNumbers = siblingCount * 2 + 5;
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;
  let pages = [];

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from(
      { length: leftItemCount },
      (_, index) => index + 1,
    );
    pages = [...leftRange, DOTS, totalPages];
  } else if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, index) => totalPages - rightItemCount + index + 1,
    );
    pages = [firstPageIndex, DOTS, ...rightRange];
  } else if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, index) => leftSiblingIndex + index,
    );
    pages = [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  return pages;
};

const ManageAuction = () => {
  const { t } = useTranslation();

  // States for auctions and pagination
  const [auctions, setAuctions] = useState([]);
  const [page, setPage] = useState(0); // zero-indexed
  const [size] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal & editing states
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [editingAuction, setEditingAuction] = useState(null);

  const fetchPage = async (pageNumber, query) => {
    try {
      const response = await fetchAuctionsPage(pageNumber, size, query);
      // Expected response: { count: number, auctions: [...] }
      setAuctions(response.data.auctions);
      setTotalCount(response.data.total);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  const reFetchAuctions = () => {
    fetchPage(page, searchQuery);
  };

  useEffect(() => {
    fetchPage(page, searchQuery);
  }, [page, searchQuery]);

  const handleCloseAddModal = () => {
    setIsOpenAddModal(false);
    setEditingAuction(null);
  };

  const handleAuctionAdded = (newAuction) => {
    if (editingAuction) {
      setAuctions(
        auctions.map((auction) =>
          auction.id === editingAuction.id ? newAuction : auction,
        ),
      );
    } else {
      fetchPage(page, searchQuery);
    }
  };

  const handleOpenEdit = (item) => {
    setEditingAuction(item);
    setIsOpenAddModal(true);
  };

  const handleDeleteAuction = (id) => {
    setAuctions(auctions.filter((item) => item.id !== id));
    deleteById(id);
    notifySuccess("Aksiya o'chirib tashlandi");
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / size);
  const currentPageDisplay = page + 1; // converting to 1-indexed for display

  // Generate pagination range (with dots)
  const paginationRange = getPaginationRange(currentPageDisplay, totalPages, 1);

  // Handler for search button
  const handleSearch = () => {
    setPage(0);
    fetchPage(0, searchQuery);
  };

  return (
    <>
      <section className="auction-section">
        <div className="container mx-auto">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{t("auction.title")}</h1>
              <button
                onClick={() => {
                  setEditingAuction(null);
                  setIsOpenAddModal(true);
                }}
                className="bg-green-300 text-green-700 font-semibold py-2 rounded px-4 hover:bg-green-600 transition-all duration-300 hover:text-white"
              >
                Add
              </button>
            </div>
            <div className="flex flex-col items-center py-4">
              <div className="w-full">
                <div className="relative flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm 
                      border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 
                      ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm 
                      focus:shadow"
                    placeholder="Search auctions..."
                  />
                  <button
                    onClick={handleSearch}
                    className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm 
                      text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 
                      hover:bg-slate-700 active:bg-slate-700 ml-2"
                    type="button"
                  >
                    Search
                  </button>
                </div>
              </div>

              <table className="w-full mt-5 border-collapse border">
                <thead>
                  <tr className="text-center border">
                    <th className="font-semibold border p-2">ID</th>
                    <th className="font-semibold border p-2">
                      {t("auction.name")}
                    </th>
                    <th className="font-semibold border p-2">
                      {t("auction.gift")}
                    </th>
                    <th className="font-semibold border p-2">
                      {t("auction.count")}
                    </th>
                    <th className="font-semibold border p-2">
                      {t("auction.startAuction")}
                    </th>
                    <th className="font-semibold border p-2">
                      {t("auction.endAuction")}
                    </th>
                    <th className="font-semibold border p-2">
                      {t("auction.edit")}
                    </th>
                    <th className="font-semibold border p-2">
                      {t("auction.delete")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {auctions.map((item) => (
                    <tr key={item.id} className="text-center border">
                      <td className="p-2">{item.id}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.gift}</td>
                      <td className="p-2">{item.countOrder}</td>
                      <td className="p-2">
                        {dateFormatterWithTime(item.startTime)}
                      </td>
                      <td className="p-2">
                        {dateFormatterWithTime(item.endTime)}
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="bg-blue-300 text-blue-700 font-semibold py-2 px-4 rounded 
                          hover:bg-blue-600 transition-all duration-300 hover:text-white"
                        >
                          {t("auction.edit")}
                        </button>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => handleDeleteAuction(item.id)}
                          className="bg-red-300 text-red-700 font-semibold py-2 px-4 rounded 
                          hover:bg-red-600 transition-all duration-300 hover:text-white"
                        >
                          {t("auction.delete")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-center mt-5 gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                {paginationRange.map((pageNumber, index) => {
                  if (pageNumber === DOTS) {
                    return (
                      <span key={index} className="px-3 py-1 text-gray-700">
                        {DOTS}
                      </span>
                    );
                  }
                  return (
                    <button
                      key={index}
                      onClick={() => setPage(pageNumber - 1)}
                      className={`px-3 py-1 rounded ${
                        page + 1 === pageNumber
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages - 1))
                  }
                  disabled={page === totalPages - 1 || totalPages === 0}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isOpenAddModal && (
        <AddMangeAuction
          reFetchAuctions={reFetchAuctions}
          onClose={handleCloseAddModal}
          onAuctionAdded={handleAuctionAdded}
        />
      )}
    </>
  );
};

export default ManageAuction;
