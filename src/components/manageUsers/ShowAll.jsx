import { useState } from "react";

const ShowAll = ({ users, deleteUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleShowDetails = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chat ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.chatId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(user.joinedAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleShowDetails(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                  >
                    Show
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for showing full user details */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleCloseModal}
          ></div>
          <div className="bg-white rounded-lg p-6 z-10 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <div className="space-y-2">
              <p>
                <strong>ID:</strong> {selectedUser.id}
              </p>
              <p>
                <strong>Chat ID:</strong> {selectedUser.chatId}
              </p>
              <p>
                <strong>First Name:</strong> {selectedUser.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {selectedUser.lastName}
              </p>
              <p>
                <strong>Username:</strong> {selectedUser.username}
              </p>
              <p>
                <strong>Joined At:</strong>{" "}
                {new Date(selectedUser.joinedAt).toLocaleString()}
              </p>
              <p>
                <strong>Active:</strong>{" "}
                {selectedUser.isActive ? "Yes" : "No"}
              </p>
              <p>
                <strong>District:</strong> {selectedUser.district}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
              <p>
                <strong>Language:</strong> {selectedUser.language}
              </p>
              {selectedUser.inn && (
                <>
                  <p>
                    <strong>INN:</strong> {selectedUser.inn}
                  </p>
                  <p>
                    <strong>Store Name:</strong> {selectedUser.storeName}
                  </p>
                </>
              )}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowAll;