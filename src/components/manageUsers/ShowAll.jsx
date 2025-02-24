import { Link } from "react-router-dom";
import { dateFormater } from "../../helper/dateFormater";

const ShowAll = ({ users, deleteUser }) => {
  if (!users || users.length === 0)
    return (
      <p className="text-[50px] mt-10 text-center font-semibold text-gray-500">
        No users found.
      </p>
    );

  const handleDelete = (id) => deleteUser(id);

  return (
    <div className="overflow-x-auto mt-4 rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">First Name</th>
            <th className="p-2 border">Phone Number</th>
            <th className="p-2 border">Added At</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 text-center">
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">{user.firstName}</td>
              <td className="p-2 border">{user.phoneNumber}</td>
              <td className="p-2 border">{dateFormater(user.addedAt)}</td>
              <td className="p-2 border flex gap-4 items-center justify-evenly">
                <button
                  onClick={() => {
                    handleDelete(user.id);
                  }}
                  className="w-full bg-red-400 text-re-900 font-semibold py-2 px-4 rounded-lg shadow-md hover:text-white hover:bg-red-500 transition-all duration-300"
                >
                  Delete
                </button>
                <Link
                  to={`${user.id}`}
                  className="w-full bg-stone-400 text-stone-900 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-stone-500 hover:text-stone-200 transition-all duration-300"
                >
                  Show
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowAll;
