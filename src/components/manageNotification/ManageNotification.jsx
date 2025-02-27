import { useState } from "react";
import NotificationAddModal from "./NotificationAddModal";

const ManageNotification = () => {
    const [isAddOpenModal, setIsAddOpenModal] = useState(!false);

    const handleCloseAddModal = () => setIsAddOpenModal(false);

    return (
        <section className="manage-notifications">
            <div className="container mx-auto">
                <div className="top flex items-center justify-between">
                    <h1 className="font-bold text-3xl ">Manage Notifications</h1>
                    <button
                        onClick={() => setIsAddOpenModal(true)}
                        className="bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg shadow-green-200">Add</button>
                </div>
                {
                    isAddOpenModal && (<NotificationAddModal onClose={handleCloseAddModal} />)
                }
            </div>
        </section>
    )
}

export default ManageNotification;