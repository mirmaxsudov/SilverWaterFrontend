import { useState } from "react";
import { $api, BASE_API_URL } from "../../api/request";
import { notifyError, notifySuccess } from "../../helper/toast";

const AddInnModal = ({ onClose }) => {
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            console.error("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await $api.post(`${BASE_API_URL}/api/v1/inn/excel`, formData);
            console.log(res.data, res);

            if (res.status === 200) {
                notifySuccess("Muvaffaqiyatli qo'shildi.")
                onClose();
            }

        } catch (err) {
            if (err.response.status >= 400 && err.response.status < 500)
                notifyError("Excel fileni tekshirib qayta urinib ko'ring.")
        }
    };


    const handleFileChange = e => setFile(e.target.files[0]);

    return (<>
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50 z-50">
            <div className="w-[600px] rounded-lg p-4 bg-white">
                <h1 className="text-2xl font-bold mb-10">Add by Excel</h1>
                <form onSubmit={e => handleSubmit(e)} method="post" className="mb-10">
                    <label>
                        <input
                            onChange={e => handleFileChange(e)}
                            type="file"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            className="mt-1 block w-full text-sm text-gray-500
             file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
             file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
             hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                </form>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onClose}
                        className="bg-orange-300 text-orange-700 font-semibold py-2 rounded px-4 hover:bg-orange-600 transition-all duration-300 hover:text-[#fff]">Close</button>
                    <button onClick={handleSubmit} type="submit" className="bg-green-300 text-green-700 font-semibold py-2 rounded px-4 hover:bg-green-600 transition-all duration-300 hover:text-[#fff]">Add</button>
                </div>
            </div>
        </div>
    </>)
}

export default AddInnModal;