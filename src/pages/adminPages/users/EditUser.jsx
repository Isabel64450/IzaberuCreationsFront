import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    axiosInstance.get(`/users/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put(`/users/${id}`, form);
      navigate("/admin/users");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Modifier utilisateur</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Nom"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Email"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </form>
      <Link to="/admin/users" className="text-sm text-[#52796f] hover:underline">
        ← Retour à la liste
      </Link>
    </div>
  );
};

export default EditUser;