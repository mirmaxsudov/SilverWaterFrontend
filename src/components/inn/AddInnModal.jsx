import { useRef, useState } from "react";
import { $api, BASE_API_URL } from "../../api/request";
import { notifyError, notifySuccess } from "../../helper/toast";
import { saveSingle } from "../../api/request/admin/inn/main.api";

const AddInnModal = ({ addToInns, onClose }) => {
  const [file, setFile] = useState(null);
  const innRef = useRef();
  const storeNameRef = useRef();

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
        notifySuccess("Muvaffaqiyatli qo'shildi.");
        onClose();
      }
    } catch (err) {
      if (err.response.status >= 400 && err.response.status < 500)
        notifyError("Excel fileni tekshirib qayta urinib ko'ring.");
    }
  };

  const handleSubmitSingle = async (e) => {
    e.preventDefault();

    const inn = innRef.current.value;
    const storeName = storeNameRef.current.value;

    if (!inn || !storeName) {
      notifyError("Iltimos ma'lumotlarni to'ldiring.");
      return;
    }

    try {
      const res = await saveSingle({ inn, storeName });

      if (res.status === 200) {
        onClose();
        addToInns(res.data);
        notifySuccess("Yangi INN qo'shildi");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        notifyError("Bu INN allaqachon mavjud.");
      } else {
        notifyError("Xatolik yuz berdi, qaytadan urinib ko'ring.");
      }
    }
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50 z-50">
        <div className="w-[800px] rounded-lg p-6 bg-white grid grid-cols-2 gap-6 shadow-lg">
          {/* Left Section - Add by Excel */}
          <div className="flex flex-col h-full">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
              Add by Excel
            </h1>
            <form onSubmit={handleSubmit} method="post" className="mb-6">
              <label className="block">
                <input
                  required
                  onChange={handleFileChange}
                  type="file"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
          file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700
          hover:file:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </label>
            </form>
            <div className="flex-grow"></div> {/* Push buttons to bottom */}
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="bg-orange-500 text-white font-semibold py-2 px-5 rounded-md hover:bg-orange-600 transition-all duration-300"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-green-500 text-white font-semibold py-2 px-5 rounded-md hover:bg-green-600 transition-all duration-300"
              >
                Add
              </button>
            </div>
          </div>

          {/* Right Section - Add Single */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col h-full">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Add Single
            </h1>
            <form onSubmit={handleSubmitSingle} className="space-y-4 flex-grow">
              <label className="block text-gray-700 font-medium">
                INN
                <input
                  ref={innRef}
                  type="text"
                  placeholder="Enter INN"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </label>
              <label className="block text-gray-700 font-medium">
                Store Name
                <input
                  ref={storeNameRef}
                  type="text"
                  placeholder="Enter store name"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </label>
            </form>
            <button
              type="submit"
              onClick={handleSubmitSingle}
              className="w-full bg-green-500 text-white font-semibold py-2 rounded-md mt-4 hover:bg-green-600 transition-all duration-300"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddInnModal;
