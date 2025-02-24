import { useEffect, useState } from "react";
import {
  fetchAllWebUsers,
  createWebUser,
  updateWebUser,
  deleteWebUser,
} from "../../api/request/admin/webUser/main.api";
import { notifySuccess, notifyError } from "../../helper/toast";

const WebUser = () => {
  const [webUsers, setWebUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", role: "" });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    username: "",
    password: "",
    role: "USER",
  });

  const fetchWebUsersData = async () => {
    try {
      const response = await fetchAllWebUsers();
      setWebUsers(response.data);
    } catch (error) {
      notifyError("Xatolik yuz berdi, qaytadan urinib ko'ring.");
    }
  };

  useEffect(() => {
    fetchWebUsersData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Rostdan ham o'chirmoqchimisiz?")) return;
    try {
      await deleteWebUser(id);
      notifySuccess("Foydalanuvchi o'chirildi");
      fetchWebUsersData();
    } catch (error) {
      console.log(error);

      if (error.response.status >= 400 && error.response.status < 500) {
        notifyError(error.response.data.message);
        return;
      }

      notifyError("Xatolik yuz berdi, qaytadan urinib ko'ring.");
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditForm({ username: user.username, role: user.role });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateWebUser(selectedUser.id, editForm);
      notifySuccess("Foydalanuvchi muvaffaqiyatli o'zgartirildi");
      setIsEditModalOpen(false);
      setSelectedUser(null);
      fetchWebUsersData();
    } catch (error) {
      if (error.response.status >= 400 && error.response.status < 500) {
        notifyError(error.response.data.message);
        return;
      }

      notifyError("Xatolik yuz berdi, qaytadan urinib ko'ring.");
    }
  };

  const openAddModal = () => {
    setAddForm({ username: "", password: "", role: "USER" });
    setIsAddModalOpen(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await createWebUser(addForm);
      notifySuccess("Foydalanuvchi muvaffaqiyatli qo'shildi");
      setIsAddModalOpen(false);
      fetchWebUsersData();
    } catch (error) {
      if (error.response.status >= 400 && error.response.status < 500) {
        notifyError(error.response.data.message);
        return;
      }

      notifyError("Xatolik yuz berdi, qaytadan urinib ko'ring.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Web Users boshqarish</h1>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Qo'shish
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {webUsers.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-center">
                    <button
                      onClick={() => handleEdit(user)}
                      className="border-[1px] py-1 px-3 rounded-lg hover:bg-blue-500 border-blue-600 transition-all duration-300  text-blue-600 hover:text-blue-50 mr-4"
                    >
                      O'zgartirish
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 border-[1px] border-red-600 font-semibold py-1 rounded-lg px-3 hover:bg-red-600 transition-all duration-300 hover:text-[#fff]"
                    >
                      O'chirish
                    </button>
                  </td>
                </tr>
              ))}
              {webUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsEditModalOpen(false)}
          ></div>
          <div className="bg-white rounded-lg shadow-lg z-10 w-96 p-6">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select
                  name="role"
                  value={editForm.role}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsAddModalOpen(false)}
          ></div>
          <div className="bg-white rounded-lg shadow-lg z-10 w-96 p-6">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={addForm.username}
                  onChange={handleAddChange}
                  placeholder="Username"
                  className="mt-1 block py-2 px-4 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={addForm.password}
                  onChange={handleAddChange}
                  placeholder="Parol"
                  className="mt-1 block py-2 px-4 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select
                  name="role"
                  value={addForm.role}
                  onChange={handleAddChange}
                  className="mt-1 block w-full py-2 px-4 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebUser;
