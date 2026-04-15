import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");     
      setUsers(res.data);
    } catch (err) {
       console.error("ERROR AXIOS:", err);
    console.error("DETAIL:", err.response);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;

    try {
      await axiosInstance.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <table className="w-full bg-white rounded-xl shadow">
        <thead className="bg-gray-100">
          <tr>
            
            <th className="p-3 text-left">Prenom</th>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.customer_id} className="border-t">
              
              <td className="p-3">{user.userName}</td>
              <td className="p-3">{user.userLastName}</td>
              <td className="p-3">{user.userEmail}</td>
              <td className="p-3">{user.role}</td>

              <td className="p-3 flex justify-center gap-4">
                <Link
                  to={`/admin/users/edit/${user.customer_id}`}
                  className="text-blue-500 hover:underline"
                >
                edit
                </Link>

                <button
                  onClick={() => handleDelete(user.customer_id)}
                  className="text-red-500 hover:underline"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
  to="/"
  className="inline-block bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
>
  ← Back to home
</Link>
    </div>
  );
};

export default UsersList;