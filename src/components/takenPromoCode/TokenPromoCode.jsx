import { useState } from "react";
import SendMessageOrderModal from "./SendMessageOrderModal";

const TokenPromoCode = () => {
    const [orders, setOrders] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [message, setMessage] = useState("");

    const uniqueDates = [...new Set(orders.map((order) => order.promoTime))];

    const filteredOrder = orders.filter((order) => {
        const matchesSearch = order.promoCode.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = dateFilter ? order.promoTime === dateFilter : true;
        const matchesStatus = statusFilter ? order.acceptance === statusFilter : true;
        return matchesSearch && matchesDate && matchesStatus;
    });

    const handleAcceptance = (id) => {
        const updatedOrders = orders.map((order) =>
            order.id === id
                ? { ...order, acceptance: order.acceptance === "Accepted" ? "Pending" : "Accepted" }
                : order
        );
        setOrders(updatedOrders);
        console.log("Toggle acceptance for order id", id);
    };

    const openModal = (orderId) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setMessage("");
    };
    const handleSend = () => {
        console.log("Xabar yuborilmoqda...", { orderId: selectedOrderId, message });
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === selectedOrderId ? { ...order, sendMessage: "Sent" } : order
            )
        );
        closeModal();
    };

    // Tanlangan orderning ismini aniqlash (modal uchun)
    const selectedOrder = orders.find((order) => order.id === selectedOrderId);
    const selectedOrderName = selectedOrder ? selectedOrder.name : "";

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
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="flex-1 border rounded p-2"
                        />
                        <select
                            value={dateFilter}
                            onChange={(e) => {
                                setDateFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border rounded p-2"
                        >
                            <option value="">All Dates</option>
                            {uniqueDates.map((date) => (
                                <option key={date} value={date}>
                                    {date}
                                </option>
                            ))}
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border rounded p-2"
                        >
                            <option value="">All Statuses</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Pending">Pending</option>
                        </select>
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
                                <th className="font-semibold border p-2">Qabul qilish</th>
                                <th className="font-semibold border p-2">Xabar yuborish</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrder.map((item) => (
                                <tr key={item.id} className="text-center border">
                                    <td className="p-2">{item.id}</td>
                                    <td className="p-2">{item.promoCode}</td>
                                    <td className="p-2">{item.giftProduct}</td>
                                    <td className="p-2">{item.promoTime}</td>
                                    <td className="p-2">{item.name}</td>
                                    <td className="p-2">{item.phoneNumber}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleAcceptance(item.id)}
                                            className={`font-semibold py-2 px-4 rounded transition-all duration-300 ${item.acceptance === "Accepted"
                                                ? "bg-green-500 text-white"
                                                : "bg-blue-300 text-blue-700 hover:bg-blue-600 hover:text-white"
                                                }`}
                                        >
                                            {item.acceptance === "Accepted" ? "Qabul qilingan" : "Qabul qilish"}
                                        </button>
                                    </td>
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