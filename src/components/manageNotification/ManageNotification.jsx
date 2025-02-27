import { useEffect, useState } from "react";
import NotificationAddModal from "./NotificationAddModal";
import { notifyError, notifySuccess } from "../../helper/toast";
import { fetchAll, resend } from "../../api/request/botNotification/botNotification.api";
import { useNavigate } from "react-router-dom";

const ManageNotification = () => {
    const [isAddOpenModal, setIsAddOpenModal] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetchAll();

                if (response.status !== 200) {
                    notifyError("Xatolik yuz berdi. qaytadan urinib ko'ring.")
                    return;
                }

                setIsLoading(false);
                setNotifications(response.data);
            } catch (error) {
                if (error?.response?.status >= 400 && error?.response?.status < 500)
                    notifyError(error?.response?.data?.message);
                else
                    notifyError("Xatolik yuz berdi, qaytadan urinib ko'ring.")
            }
        }

        fetchNotifications();
    }, []);

    const handleCloseAddModal = () => setIsAddOpenModal(false);

    const addToNotifications = newNotifications => setNotifications([...notifications, newNotifications]);

    const handleResend = async notificationId => {
        try {
            const response = await resend(notificationId);

            if (response.status !== 200) {
                notifyError("Xatolik yuz berdi. Qayta xarakat qilib ko'ring.")
                return;
            }

            notifySuccess(response.data);
        } catch (error) {
            const status = error?.response?.status;

            if (status === 404)
                notifyError(error?.response?.data?.message);
            else
                notifyError("Xatolik yuz berdi.")
        }
    }

    return (
        <section className="manage-notifications">
            <div className="container mx-auto">
                <div className="top flex items-center justify-between">
                    <h1 className="font-bold text-3xl ">Manage Notifications</h1>
                    <button
                        onClick={() => setIsAddOpenModal(true)}
                        className="bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg shadow-green-200">Add</button>
                </div>
                <div className="body">
                    {!isLoading && <ShowAllNotifications handleResend={handleResend} notifications={notifications} />}
                </div>
                {
                    isAddOpenModal && (<NotificationAddModal onClose={handleCloseAddModal} addToNotifications={addToNotifications} />)
                }
            </div>
        </section>
    )
}

const ShowAllNotifications = ({ notifications, handleResend }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow rounded-lg p-4 overflow-x-auto mt-10">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Message
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sent By
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sent At
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resend
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {notifications.map((notification) => (
                        <tr
                            onClick={() => {
                                navigate("/admin/notifications/" + notification.id);
                            }}
                            key={notification.id}
                            className="hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {notification.id}
                            </td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                                {notification.message}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {notification.sentBy}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(notification.sentAt).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleResend(notification.id);
                                    }}
                                    className="bg-emerald-400 text-white py-2 px-5 rounded-lg hover:bg-emerald-700 transition-all duration-300">Resend</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageNotification;