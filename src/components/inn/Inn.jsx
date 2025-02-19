import { useEffect, useState } from "react";
import AddInnModal from "./AddInnModal";
import { deleteInnById, fetchInnsByPage } from "../../api/request/admin/inn/main.api";
import { dateFormater } from './../../helper/dateFormater';
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../../api/request";
import { notifyInfo } from "../../helper/toast";
import EditInnModal from "./EditInnModal";

const DOTS = "...";

const Inn = () => {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [inns, setInns] = useState([]);
    const [totalInns, setTotalInns] = useState(0);
    const [editInn, setEditInn] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchInnsByPage(page, limit, search);
                setInns(data.inns);
                setTotalInns(data.total);
            } catch (error) {
                console.error("Error fetching inns:", error);
            }
        };

        fetchData();
    }, [page, limit, search]);

    const addToInns = (newInn) => setInns([...inns, newInn]);

    const handleCloseAddModal = () => setIsOpenAddModal(false);
    const handleCloseEditModal = () => setIsOpenEditModal(false);
    const openEditModal = () => setIsOpenEditModal(true);

    const editInns = (editedInn) => {
        setInns(inns.map(inn => {
            if (inn.id === editedInn.id) {
                return editedInn
            } else {
                return inn;
            }
        }))
    }

    const handleInnDelete = id => {
        deleteInnById(id);
        setInns(inns.filter(inn => inn.id !== id));
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(0); // Reset to first page when search changes
    };

    return (
        <section className="inn-section py-10">
            <div className="container mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">INN</h1>
                    <div className="flex items-center gap-5">
                        <Link onClick={() => {
                            notifyInfo("Successfully downloaded")
                        }} download={true} to={`${BASE_API_URL}/api/v1/inn/download-excel`} className="bg-blue-300 text-blue-700 font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-all duration-300 hover:text-white">
                            Download
                        </Link>
                        <button
                            onClick={() => setIsOpenAddModal(true)}
                            className="bg-green-300 text-green-700 font-semibold py-2 px-4 rounded hover:bg-green-600 transition-all duration-300 hover:text-white"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Search and Limit Selector */}
                <InnSearch
                    search={search}
                    onSearchChange={handleSearchChange}
                    limit={limit}
                    setLimit={setLimit}
                    setPage={setPage}
                />

                {/* Table with INN records */}
                <ShowAll openEditModal={openEditModal} handleInnDelete={handleInnDelete} setToEdit={setEditInn} inns={inns} />

                {/* Pagination */}
                <Pagination page={page} setPage={setPage} totalInns={totalInns} limit={limit} />

                {/* Add Modal */}
                {isOpenAddModal && <AddInnModal addToInns={addToInns} onClose={handleCloseAddModal} />}
                {/* Edit Modal */}
                {isOpenEditModal && <EditInnModal editInns={editInns} inn={editInn} onClose={handleCloseEditModal} />}
            </div>
        </section>
    );
};

const ShowAll = ({ inns, handleInnDelete, openEditModal, setToEdit }) => {
    return (
        <div className="py-10">
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="border">
                        <th className="p-2">INN</th>
                        <th className="p-2">Store Name</th>
                        <th className="p-2">Added At</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inns.length > 0 ? (
                        inns.map((inn) => (
                            <tr key={inn.id} className="border text-center">
                                <td className="p-2">{inn.name}</td>
                                <td className="p-2 truncate">{inn.storeName}</td>
                                <td className="p-2">{dateFormater(inn.createdAt)}</td>
                                <td className="p-2">
                                    {/* Placeholder buttons for Edit/Delete */}
                                    <button onClick={() => {
                                        openEditModal();
                                        setToEdit(inn);
                                    }} className="bg-yellow-300 text-yellow-700 py-1 px-2 rounded">
                                        Edit
                                    </button>
                                    <button onClick={() => handleInnDelete(inn.id)} className="bg-red-300 text-red-700 py-1 px-2 rounded ml-2">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center p-4">
                                No INNs found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const InnSearch = ({ search, onSearchChange, limit, setLimit, setPage }) => {
    return (
        <div className="inn-search py-10 grid grid-cols-12 items-center gap-4">
            <div className="col-span-10">
                <input
                    type="text"
                    placeholder="Search ..."
                    value={search}
                    onChange={onSearchChange}
                    className="shadow w-full p-2 border border-gray-300 rounded-lg placeholder:tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="col-span-2">
                <select
                    value={limit}
                    onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setPage(0); // Reset to first page when limit changes
                    }}
                    className="shadow w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="1000">1000</option>
                </select>
            </div>
        </div>
    );
};

/**
 * Returns an array of page numbers and DOTS ("...") that should be rendered.
 *
 * @param {number} currentPage - current active page (1-indexed)
 * @param {number} totalPages - total number of pages
 * @param {number} pageNeighbours - number of page numbers to show on each side of current page
 */
const getPaginationRange = (currentPage, totalPages, pageNeighbours = 2) => {
    // Calculate total numbers to show (first, last, current, neighbours, and two dots)
    const totalPageNumbers = pageNeighbours * 2 + 5;

    // Case 1: total pages less than the page numbers we want to show
    if (totalPages <= totalPageNumbers) {
        return [...Array(totalPages)].map((_, index) => index + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - pageNeighbours, 1);
    const rightSiblingIndex = Math.min(currentPage + pageNeighbours, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    const pages = [];

    if (!showLeftDots && showRightDots) {
        // No left dots, but right dots
        const leftItemCount = 3 + 2 * pageNeighbours;
        const leftRange = [...Array(leftItemCount)].map((_, index) => index + 1);
        pages.push(...leftRange);
        pages.push(DOTS);
        pages.push(totalPages);
    } else if (showLeftDots && !showRightDots) {
        // Left dots, but no right dots
        const rightItemCount = 3 + 2 * pageNeighbours;
        const rightRange = [...Array(rightItemCount)]
            .map((_, index) => totalPages - rightItemCount + 1 + index);
        pages.push(1);
        pages.push(DOTS);
        pages.push(...rightRange);
    } else if (showLeftDots && showRightDots) {
        // Both left and right dots to be shown
        pages.push(1);
        pages.push(DOTS);
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
            pages.push(i);
        }
        pages.push(DOTS);
        pages.push(totalPages);
    }

    return pages;
};

const Pagination = ({ page, setPage, totalInns, limit }) => {
    const totalPages = Math.ceil(totalInns / limit);
    if (totalPages <= 1) return null;

    // Convert 0-indexed page to 1-indexed for the pagination range calculation
    const currentPage = page + 1;
    const paginationRange = getPaginationRange(currentPage, totalPages, 2);

    return (
        <div className="flex justify-center mt-6">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                className="px-4 py-2 border border-gray-300 rounded-l hover:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
                Prev
            </button>
            {paginationRange.map((item, index) => {
                if (item === DOTS) {
                    return (
                        <span
                            key={index}
                            className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-500"
                        >
                            {DOTS}
                        </span>
                    );
                }
                return (
                    <button
                        key={index}
                        onClick={() => setPage(item - 1)}
                        className={`px-4 py-2 border-t border-b border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white focus:outline-none transition-colors duration-200 ${currentPage === item ? "bg-blue-500 text-white" : ""
                            }`}
                    >
                        {item}
                    </button>
                );
            })}
            <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages - 1}
                className="px-4 py-2 border border-gray-300 rounded-r hover:bg-gray-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
                Next
            </button>
        </div>
    );
};

export default Inn;