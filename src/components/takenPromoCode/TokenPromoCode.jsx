import { useEffect, useState } from "react";
import SendMessageOrderModal from "./SendMessageOrderModal";
import { fetchAllTakenPromoCodeSearch, sendMessageToUser } from "../../api/request/admin/takenPromoCode/main.api";
import { dateFormater } from "../../helper/dateFormater";
import { notifySuccess } from "../../helper/toast";
import { useTranslation } from "react-i18next";

const TokenPromoCode = () => {
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [dateFilter] = useState("");
    const [statusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [message, setMessage] = useState("");

    const { t } = useTranslation();

    const pageSize = 10;

    const fetchTakenPromoCodes = async () => {
        try {
            const response = await fetchAllTakenPromoCodeSearch(currentPage, pageSize, searchTerm);
            const { total, promoCodes } = response.data;
            setTotal(total);
            const normalizedOrders = promoCodes.map((item) => ({
                id: item.promoCodeId,
                promoCode: item.promoCode,
                gift: item.gift,
                when: item.when, // expecting a date
                userName: item.userName,
                phoneNumber: item.phoneNumber,
                acceptance: item.acceptance || "Pending",
            }));
            setOrders(normalizedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchTakenPromoCodes();
    }, [currentPage, searchTerm]);

    // Client-side filtering for date and acceptance status.
    const filteredOrders = orders.filter((order) => {
        const matchesDate = dateFilter ? order.when === dateFilter : true;
        const matchesStatus = statusFilter ? order.acceptance === statusFilter : true;
        return matchesDate && matchesStatus;
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0);
    };

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
                        <h1 className="text-3xl font-bold">
                            {t("takenPromoCode.title")}
                        </h1>
                        <button className="bg-green-300 text-green-700 font-semibold py-2 rounded px-4 hover:bg-green-600 transition-all duration-300 hover:text-white">
                            {t("takenPromoCode.download")}
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-4 mt-6 w-full">
                        <input
                            type="text"
                            placeholder={t("takenPromoCode.search")}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="flex-1 border rounded p-2"
                        />
                    </div>
                    <table className="w-full mt-5 border-collapse border">
                        <thead>
                            <tr className="text-center border">
                                <th className="font-semibold border p-2">
                                    {t("takenPromoCode.id")}
                                </th>
                                <th className="font-semibold border p-2">
                                    {t("takenPromoCode.code")}
                                </th>
                                <th className="font-semibold border p-2">
                                    {t("takenPromoCode.gift")}
                                </th>
                                <th className="font-semibold border p-2">
                                    {t("takenPromoCode.when")}
                                </th>
                                <th className="font-semibold border p-2">
                                    {t("takenPromoCode.name")}
                                </th>
                                <th className="font-semibold border p-2">
                                    {t("takenPromoCode.phone")}
                                </th>
                                <th className="font-semibold border p-2">
                                    {t("takenPromoCode.sendMessage")}
                                </th>
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
                                    <td className="p-2">
                                        <button
                                            onClick={() => openModal(item.id)}
                                            className="bg-green-300 text-green-700 font-semibold py-2 rounded px-4 hover:bg-green-600 transition-all duration-300 hover:text-white"
                                        >
                                            {t("takenPromoCode.sendMessage")}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center items-center mt-4 gap-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                            className="px-4 py-2 border rounded"
                        >
                            {t("inn.prev")}
                        </button>
                        <span>
                            Page {currentPage + 1} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage >= totalPages - 1}
                            className="px-4 py-2 border rounded"
                        >
                            {t("inn.next")}
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