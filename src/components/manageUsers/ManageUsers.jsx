import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShowAll from "./ShowAll";
import { BASE_API_URL } from "../../api/request";
import {
  deleteUserById,
  fetchUsersPage,
} from "../../api/request/admin/user/main.api";
import { notifyInfo, notifySuccess } from "../../helper/toast";

const DOTS = "...";

const getPaginationRange = (currentPage, totalPages, siblingCount = 1) => {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  let pages = [];

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    pages = [...leftRange, DOTS, totalPages];
  } else if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1,
    );
    pages = [firstPageIndex, DOTS, ...rightRange];
  } else if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i,
    );
    pages = [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  return pages;
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  const [page, setPage] = useState(0);
  const [size] = useState(10);

  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("ASC");
  const [sortBy, setSortBy] = useState("id");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchUsersPage(
          page,
          size,
          query,
          order,
          sortBy,
        );

        setUsers(response.data.users);
        setCount(response.data.count);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [page, size, query, order, sortBy]);

  const totalPages = Math.ceil(count / size);
  const currentPage = page + 1;
  const paginationRange = getPaginationRange(currentPage, totalPages);

  const deleteUer = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    deleteUserById(userId);
    notifySuccess("Successfully deleted");
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value?.trim());
    setPage(0);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    setPage(0);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    setPage(0);
  };

  return (
    <section className="user-manage-section">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          User Management ({count})
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 shadow-md rounded-lg">
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder="Search users..."
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-60"
            />
            <label className="text-gray-700 text-sm font-medium">
              <select
                value={order}
                onChange={handleOrderChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </select>
            </label>
            <label className="text-gray-700 text-sm font-medium">
              <select
                value={sortBy}
                onChange={handleSortByChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="id">Id</option>
                <option value="joinedAt">Joined</option>
              </select>
            </label>
          </div>
          <div className="flex items-center gap-3">
            <Link
              onClick={() => {
                notifyInfo("Download successfully");
              }}
              download
              className="bg-amber-400 text-amber-900 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-amber-500 transition-all duration-300"
              to={`${BASE_API_URL}/api/v1/user/download-excel`}
            >
              Export
            </Link>
          </div>
        </div>

        <ShowAll deleteUser={deleteUer} users={users} />

        {users?.length > 0 && (
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
                  className={`px-3 py-1 rounded ${currentPage === pageNumber
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
        )}
      </div>
    </section>
  );
};

export default ManageUsers;
