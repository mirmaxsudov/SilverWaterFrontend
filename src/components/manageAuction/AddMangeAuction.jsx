import { useEffect, useState } from "react";
import { fetchAuctionProductsSearch, saveNewAuction } from "../../api/request/admin/auction/main.api";
import { notifyError, notifySuccess } from "../../helper/toast";

const AddManageAuction = ({ onClose }) => {
  const [searchProducts, setSearchProducts] = useState([]);
  const [giftProducts, setGiftProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Auction details (left section)
  const [auctionName, setAuctionName] = useState("");
  const [auctionActive, setAuctionActive] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Gift details (right section top)
  const [selectedGiftId, setSelectedGiftId] = useState("");
  const [giftCount, setGiftCount] = useState("");
  const [countOrder, setCountOrder] = useState("");

  const handleOverlayClick = () => onClose();

  const handleSelectedProduct = (productId) => setSelectedProductId(productId);

  // Validate and submit new auction data
  const handleAddNewAuction = async () => {
    // Basic validations with Uzbek messages
    if (!auctionName.trim()) {
      notifyError("Aksiya nomi kiritilishi kerak.");
      return;
    }
    if (!startDate || !endDate) {
      notifyError("Boshlanish va tugash sanalari kiritilishi kerak.");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      notifyError("Tugash sanasi, boshlanish sanasidan keyin bo'lishi kerak.");
      return;
    }
    if (!selectedGiftId) {
      notifyError("Iltimos, sovg'a mahsuloti tanlang.");
      return;
    }
    if (!giftCount || isNaN(giftCount) || Number(giftCount) <= 0) {
      notifyError("Sovg'a soni musbat son bo'lishi kerak.");
      return;
    }
    if (!countOrder || isNaN(countOrder)) {
      notifyError("Aksiya tartibi haqiqiy raqam bo'lishi kerak.");
      return;
    }
    if (!selectedProductId) {
      notifyError("Iltimos, aksiya uchun mahsulot tanlang.");
      return;
    }

    const auctionData = {
      auctionName: auctionName.trim(),
      isActive: auctionActive,
      startTime: startDate,
      endTime: endDate,
      giftId: selectedGiftId,
      giftCount: Number(giftCount),
      countOrder: Number(countOrder),
      productId: selectedProductId,
    };

    try {
      await saveNewAuction(auctionData);
      notifySuccess("Aksiya muvaffaqiyatli yaratildi!");
      onClose();
    } catch (error) {
      if (error.response.status === 400) {
        notifyError(error.response.data.message);
        return;
      }

      notifyError("Aksiyani yaratishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
    }
  };

  useEffect(() => {
    const fetchGiftProduct = async () => {
      try {
        const response = await fetchAuctionProductsSearch("");
        if (response.status !== 200) {
          notifyError("Mahsulotlarni yuklashda xatolik yuz berdi. Qaytadan urinib ko'ring.");
          return;
        }
        setGiftProducts(response.data);
      } catch (error) {
        notifyError("Mahsulotlarni yuklashda xatolik yuz berdi. Qaytadan urinib ko'ring.");
      }
    };
    fetchGiftProduct();
  }, []);

  useEffect(() => {
    const fetchSearchProduct = async (query) => {
      try {
        const response = await fetchAuctionProductsSearch(query);
        if (response.status !== 200) {
          notifyError("Mahsulotlarni qidirishda xatolik yuz berdi. Qaytadan urinib ko'ring.");
          return;
        }
        setSearchProducts(response.data);
      } catch (error) {
        notifyError("Mahsulotlarni qidirishda xatolik yuz berdi. Qaytadan urinib ko'ring.");
      }
    };
    fetchSearchProduct(query);
  }, [query]);

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOverlayClick}
      tabIndex={0}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-4xl mx-4 p-8 rounded-lg shadow-xl overflow-y-auto max-h-screen"
      >
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Left Section: Auction and Gift Details */}
          <div className="md:w-2/3">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Yangi Aksiya
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Auction Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Auction Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter auction name"
                    value={auctionName}
                    onChange={(e) => setAuctionName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={auctionActive}
                    onChange={(e) => setAuctionActive(e.target.checked)}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Active / InActive
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              {/* Gift Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sovg'a
                  </label>
                  <select
                    name="gift"
                    id="gift"
                    value={selectedGiftId}
                    onChange={(e) => setSelectedGiftId(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tanlang</option>
                    {giftProducts?.map((giftProduct) => (
                      <option
                        key={giftProduct.productId}
                        value={giftProduct.productId}
                      >
                        {giftProduct.productName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gift Count
                  </label>
                  <input
                    type="number"
                    placeholder="Enter gift count"
                    value={giftCount}
                    onChange={(e) => setGiftCount(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Count Order
                  </label>
                  <input
                    type="number"
                    placeholder="Enter auction count order"
                    value={countOrder}
                    onChange={(e) => setCountOrder(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Right Section: Product Search & ADD Button */}
          <div className="md:w-1/3">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Mahsulot
            </h1>
            <div className="space-y-6">
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search ..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="border border-gray-200 rounded-lg p-4 h-48 overflow-y-auto">
                {(!searchProducts || searchProducts.length === 0) ? (
                  <h3 className="text-center text-gray-500">Topilmadi</h3>
                ) : (
                  <ul>
                    {searchProducts.map((product) => (
                      <li
                        key={product.productId}
                        className="flex items-center justify-between py-2 border-b last:border-0"
                      >
                        <input
                          type="checkbox"
                          checked={product.productId === selectedProductId}
                          onChange={() => handleSelectedProduct(product.productId)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-800">
                          {product.productName}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                onClick={handleAddNewAuction}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition shadow"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddManageAuction;