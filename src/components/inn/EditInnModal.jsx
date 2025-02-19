import { useRef } from "react";
import { editInn } from "../../api/request/admin/inn/main.api";
import { notifyError, notifyInfo } from "../../helper/toast";

const EditInnModal = ({ inn, onClose, editInns }) => {
  const innRef = useRef();
  const storeRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newInn = innRef.current.value;
    const newStore = storeRef.current.value;

    if (!newInn || !newStore) {
      notifyError("Malumot kitilishi shart");
      return;
    }

    try {
      const res = await editInn(inn.id, {
        inn: newInn.trim(),
        storeName: newStore.trim(),
      });

      if (res.status === 200) {
        notifyInfo("O'zgartirildi");
      }

      const editedInn = res.data;
      editInns(editedInn);
      onClose();
    } catch (error) {
      console.log(error);

      if (error.response.status >= 400 && error.response.status < 500) {
        notifyError("Bu nom bilan INN mavjud");
        return;
      }

      notifyError("Error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50 z-50">
      <div className="rounded-lg p-6 grid grid-cols-1 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col h-full">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit</h1>
          <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
            <label className="block text-gray-700 font-medium">
              INN
              <input
                ref={innRef}
                type="text"
                required
                defaultValue={inn?.name}
                placeholder="Enter INN"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </label>
            <label className="block text-gray-700 font-medium">
              Store Name
              <input
                ref={storeRef}
                type="text"
                required
                defaultValue={inn?.storeName}
                placeholder="Enter store name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </label>
            <label className="block text-gray-700 font-medium">
              Qo'shilgan vaqti
              <input
                type="date"
                disabled
                value={inn?.createdAt ? inn.createdAt.split("T")[0] : ""}
                placeholder="Enter store name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </label>
          </form>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="w-full bg-slate-500 text-white font-semibold py-2 rounded-md mt-4 hover:bg-slate-600 transition-all duration-300"
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-2 rounded-md mt-4 hover:bg-green-600 transition-all duration-300"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInnModal;
