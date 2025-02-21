import { useEffect, useState } from "react";
import SendMessageOrderModal from "./SendMessageOrderModal";
import { fetchAllTakenPromoCodeSearch, sendMessageToUser } from "../../api/request/admin/takenPromoCode/main.api";
import { dateFormater } from "../../helper/dateFormater";
import { notifySuccess } from "../../helper/toast";

const TokenPromoCode = () => {
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [message, setMessage] = useState("");

    const pageSize = 10;

    const fetchTakenPromoCodes = async () => {
        try {
            // Call the API with the current page, page size, and search term.
            const response = await fetchAllTakenPromoCodeSearch(currentPage, pageSize, searchTerm);
            // Assume response.data has the shape: { total, promoCodes: [...] }
            const { total, promoCodes } = response.data;
            setTotal(total);
            // Normalize the data if the API returns different field names.
            const normalizedOrders = promoCodes.map((item) => ({
                id: item.promoCodeId,
                promoCode: item.promoCode,
                gift: item.gift,
                when: item.when, // expecting a date/time string
                userName: item.userName,
                phoneNumber: item.phoneNumber,
                acceptance: item.acceptance || "Pending", // default to "Pending" if not provided
            }));
            setOrders(normalizedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // Re-fetch data when currentPage or searchTerm changes.
    useEffect(() => {
        fetchTakenPromoCodes();
    }, [currentPage, searchTerm]);

    // Get unique dates from the orders (using the "when" field)
    const uniqueDates = [...new Set(orders.map((order) => order.when))];

    // Client-side filtering for date and acceptance status.
    const filteredOrders = orders.filter((order) => {
        const matchesDate = dateFilter ? order.when === dateFilter : true;
        const matchesStatus = statusFilter ? order.acceptance === statusFilter : true;
        return matchesDate && matchesStatus;
    });

    // Handlers for search and filter changes.
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0); // Reset to first page on search change
    };

    const handleDateFilterChange = (e) => {
        setDateFilter(e.target.value);
        setCurrentPage(0);
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(0);
    };

    // Handler for toggling the acceptance status.
    const handleAcceptance = (id) => {
        const updatedOrders = orders.map((order) =>
            order.id === id
                ? { ...order, acceptance: order.acceptance === "Accepted" ? "Pending" : "Accepted" }
                : order
        );
        setOrders(updatedOrders);
        console.log("Toggle acceptance for order id", id);
    };

    // Handlers for the message modal.
    const openModal = (orderId) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setMessage("");
    };

    const handleSend = async () => {
        closeModal();
        

        const response = await sendMessageToUser(selectedOrderId, message);

        if (response.status === 200)
            notifySuccess("Xabar muvaffaqiyatli yuborildi");
    };

    const selectedOrder = orders.find((order) => order.id === selectedOrderId);
    const selectedOrderName = selectedOrder ? selectedOrder.userName : "";

    // Pagination controls.
    const totalPages = Math.ceil(total / pageSize);

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <section className="order-section">
            <div className="container mx-auto">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Promo</h1>
                        <button className="bg-green-300 text-green-700 font-semibold py-2 rounded px-4 hover:bg-green-600 transition-all duration-300 hover:text-white">
                            Yuklab olish
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-4 mt-6 w-full">
                        <input
                            type="text"
                            placeholder="Search by Promo Code"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="flex-1 border rounded p-2"
                        />
                        {/* <select
                            value={dateFilter}
                            onChange={handleDateFilterChange}
                            className="border rounded p-2"
                        >
                            <option value="">All Dates</option>
                            {uniqueDates.map((date, index) => (
                                <option key={index} value={date}>
                                    {date}
                                </option>
                            ))}
                        </select>
                        <select
                            value={statusFilter}
                            onChange={handleStatusFilterChange}
                            className="border rounded p-2"
                        >
                            <option value="">All Statuses</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Pending">Pending</option>
                        </select> */}
                    </div>
                    <table className="w-full mt-5 border-collapse border">
                        <thead>
                            <tr className="text-center border">
                                <th className="font-semibold border p-2">ID</th>
                                <th className="font-semibold border p-2">Promo Code</th>
                                <th className="font-semibold border p-2">Sovga</th>
                                <th className="font-semibold border p-2">Qachon</th>
                                <th className="font-semibold border p-2">Ism</th>
                                <th className="font-semibold border p-2">Tel</th>
                                {/* <th className="font-semibold border p-2">Qabul qilish</th> */}
                                <th className="font-semibold border p-2">Xabar yuborish</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((item) => (
                                <tr key={item.id} className="text-center border">
                                    <td className="p-2">{item.id}</td>
                                    <td className="p-2">{item.promoCode}</td>
                                    <td className="p-2">{item.gift}</td>
                                    <td className="p-2">{dateFormater(item.when)}</td>
                                    <td className="p-2">{item.userName}</td>
                                    <td className="p-2">{item.phoneNumber}</td>
                                    {/* <td className="p-2">
                                        <button
                                            onClick={() => handleAcceptance(item.id)}
                                            className={`font-semibold py-2 px-4 rounded transition-all duration-300 ${item.acceptance === "Accepted"
                                                ? "bg-green-500 text-white"
                                                : "bg-blue-300 text-blue-700 hover:bg-blue-600 hover:text-white"
                                                }`}
                                        >
                                            {item.acceptance === "Accepted" ? "Qabul qilingan" : "Qabul qilish"}
                                        </button>
                                    </td> */}
                                    <td className="p-2">
                                        <button
                                            onClick={() => openModal(item.id)}
                                            className="bg-green-300 text-green-700 font-semibold py-2 rounded px-4 hover:bg-green-600 transition-all duration-300 hover:text-white"
                                        >
                                            Xabar yuborish
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center mt-4 gap-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                            className="px-4 py-2 border rounded"
                        >
                            Prev
                        </button>
                        <span>
                            Page {currentPage + 1} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage >= totalPages - 1}
                            className="px-4 py-2 border rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>
                <SendMessageOrderModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSend={handleSend}
                    message={message}
                    setMessage={setMessage}
                    orderName={selectedOrderName}
                />
            </div>
        </section>
    );
};

export default TokenPromoCode;