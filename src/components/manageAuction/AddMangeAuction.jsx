import { useState, useEffect } from "react";
import { fetchAuctionProductsSearch, saveNewAuction } from "../../api/request/admin/auction/main.api";
import { notifyError, notifySuccess } from "../../helper/toast";

const AddManageAuction = ({ onClose, initialData }) => {
    const [name, setName] = useState(initialData?.name || "");
    const [gift, setGift] = useState(initialData?.giftProduct || "");
    const [isActive, setIsActive] = useState(initialData?.isActive || false);
    const [count, setCount] = useState(initialData?.productCount || "");
    const [startTime, setStartTime] = useState(initialData?.startTime || "");
    const [endTime, setEndTime] = useState(initialData?.endTime || "");

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSearchId, setSelectedSearchId] = useState(-1);

    const [selectedDummyItem, setSelectedDummyItem] = useState(
        initialData?.selectedDummyItem || null
    );

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setGift(initialData.giftProduct || "");
            setIsActive(initialData.isActive || false);
            setCount(initialData.productCount || "");
            setStartTime(initialData.startTime || "");
            setEndTime(initialData.endTime || "");
            setSelectedDummyItem(initialData.selectedDummyItem || null);
        }
    }, [initialData]);

    useEffect(() => {
        (async () => {
            const res = await fetchAuctionProductsSearch("");
            setSearchResults(res.data);
        })()
    }, [])

    const handleAddAuction = async () => {
        if (!name.trim() || !gift.trim() || !count || !startTime || !endTime || selectedSearchId === -1) {
            alert("Iltimos, Name, Sovg'a, Nechta, Boshlanish va Tugash vaqtlarini to'ldiring!");
            return;
        }

        const data = {
            orderOfCount: +count,
            uniqueAuctionName: name.trim(),
            gift: gift.trim(),
            isActive: true,
            startTime,
            endTime,
            productId: selectedSearchId
        }

        try {
            const res = await saveNewAuction(data);

            if (res.status === 200) {
                notifySuccess("Aksiya muvaffaqiyatli qo'shildi!");
            }
        } catch (error) {
            notifyError("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring!");
            console.log(error);
        }

        onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target.id === "modal-overlay") {
            onClose();
        }
    };

    const handleCheckboxChange = ({ productId }) => {
        if (selectedSearchId === productId) {
            setSelectedSearchId(null);
        } else {
            setSelectedSearchId(productId);
        }
    };

    const handleAuctionProduct = async (searchTerm) => {
        const res = await fetchAuctionProductsSearch(searchTerm);
        setSearchTerm(searchTerm);
        setSearchResults(res.data);
    }

    return (
        <div
            id="modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
            onClick={handleOverlayClick}>
            <div className="bg-white w-full max-w-4xl mx-4 rounded shadow-lg p-6 relative">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">
                        {initialData ? "Edit Aksiya" : "Aksiya Qo'shish"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl font-bold">
                        &times;
                    </button>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 mb-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Auction nomi..."
                        />

                        <label className="block mb-1 font-medium">Sovg'a</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 mb-3"
                            value={gift}
                            onChange={(e) => setGift(e.target.value)}
                            placeholder="Sovg'a nomi..."
                        />

                        <div className="flex items-center mb-3">
                            <span className="mr-2 font-medium">Active</span>
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={() => setIsActive(!isActive)}
                                className="toggle-checkbox"
                            />
                        </div>

                        <label className="block mb-1 font-medium">Nechta</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2 mb-3"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            placeholder="Mahsulot soni..."
                        />

                        <label className="block mb-1 font-medium">Boshlanish Vaqti</label>
                        <input
                            type="datetime-local"
                            className="w-full border rounded px-3 py-2 mb-3"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />

                        <label className="block mb-1 font-medium">Tugash Vaqti</label>
                        <input
                            type="datetime-local"
                            className="w-full border rounded px-3 py-2 mb-3"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>

                    <div>
                        <div className="flex items-center mb-3">
                            <input
                                type="text"
                                className="flex-1 border rounded px-3 py-2 mr-2"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => handleAuctionProduct(e.target.value)}
                            />
                            <button className="bg-slate-800 text-white px-4 py-2 rounded">
                                Search
                            </button>
                        </div>
                        <div className="border rounded h-64 overflow-y-auto p-2">
                            {searchResults?.length > 0 &&
                                searchResults.map((item) => {
                                    const isChecked = item.productId === selectedSearchId;

                                    return (
                                        <label
                                            key={item.productId}
                                            className="border-b last:border-b-0 py-2 px-1 text-sm flex justify-between items-center cursor-pointer">
                                            <span>{item.productName}</span>
                                            <input
                                                key={item.productId}
                                                type="checkbox"
                                                className="ml-2"
                                                checked={isChecked}
                                                onChange={() => handleCheckboxChange(item)}
                                            />
                                        </label>
                                    );
                                })}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded hover:bg-gray-100">
                        Close
                    </button>
                    <button
                        onClick={handleAddAuction}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        {initialData ? "Update" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddManageAuction;