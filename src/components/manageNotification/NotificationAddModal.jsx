import { useEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { notifyError, notifySuccess } from "../../helper/toast";
import { sendMessage } from "../../api/request/botNotification/botNotification.api";

const NotificationAddModal = ({ onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const messageRef = useRef();

    useEffect(() => {
        messageRef.current.focus();
    }, []);

    if (!onClose) return;

    const handleSendToAllUsers = async (e) => {
        e.preventDefault();

        if (!message) {
            notifyError("Xabar kiritilishi shart.");
            return;
        }

        if (message.length > 4000) {
            notifyError("Xabar 4000 belgidan oshmasligi shart.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await sendMessage(message);

            if (response.status !== 200) {
                notifyError("Xatolik yuz berdi, qaytadan urinib ko'ring.");
                return;
            }

            notifySuccess("Xabar muvaffaqiyatli yuborildi.");
            onClose();
        } catch (error) {
            notifyError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-md gap-4"
            onKeyDown={(e) => e.key === "Escape" && onClose()}
            onClick={onClose}
            tabIndex={0}
        >
            <div
                className="bg-white rounded-lg w-full max-w-4xl max-h-screen overflow-auto p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="top flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Add New Notification</h2>
                    <button className="text-2xl border-black border-[2px] shadow rounded-full p-2 transition-all duration-300">
                        <MdOutlineClose onClick={onClose} />
                    </button>
                </div>
                <div className="body py-5">
                    <label>
                        <textarea
                            ref={messageRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Notification message"
                            className="w-full h-32 border rounded p-2"
                        ></textarea>
                    </label>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleSendToAllUsers}
                            className="bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg shadow-green-200 mt-3"
                            disabled={isLoading}
                        >
                            Send To All Users
                        </button>
                        <p className={`text-right text-sm ${message.length > 4000 ? "text-red-600" : "text-gray-500"} mt-1`}>
                            {message.length} characters
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationAddModal;