import { useState } from "react"
import { $api, BASE_API_URL } from "../../api/request"
import { notifySuccess } from "../../helper/toast"
import AddInnModal from "./AddInnModal"

const Inn = () => {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false)

    const handleCloseAddModal = () => {
        setIsOpenAddModal(false)
    }

    return (
        <section className="inn-section">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">INN</h1>
                    <button onClick={() => setIsOpenAddModal(true)} className="bg-green-300 text-green-700 font-semibold py-2 rounded px-4 hover:bg-green-600 transition-all duration-300 hover:text-[#fff]">Add</button>
                </div>
                {
                    isOpenAddModal && <AddInnModal onClose={handleCloseAddModal} />
                }
            </div>
        </section>
    )
}

export default Inn