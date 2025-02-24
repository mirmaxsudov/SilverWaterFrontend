import { useTranslation } from "react-i18next";

const SendMessageOrderModal = ({
  isOpen,
  onClose,
  onSend,
  message,
  setMessage,
  orderName,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-5 rounded shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-3">
          {orderName} {t("takenPromoCode.sendMessageModal.sendMessage")}
        </h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("takenPromoCode.sendMessageModal.placeHolder")}
          className="w-full h-32 border rounded p-2"
        />
        <div className="flex justify-end mt-3 gap-2">
          <button
            onClick={onSend}
            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
          >
            {t("takenPromoCode.sendMessageModal.send")}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400"
          >
            {t("takenPromoCode.sendMessageModal.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMessageOrderModal;
