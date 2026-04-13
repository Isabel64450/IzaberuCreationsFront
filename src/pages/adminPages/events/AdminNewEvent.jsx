import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

function AdminNewEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    event_date: "",
    location: ""
   
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
     
      const res = await axiosInstance.post("/events", form);

      const eventId = res.data.id || res.data.event_id;

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        await axiosInstance.post(
          `/events/${eventId}/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
           }
        );
         }
           navigate("/admin/events");
    } catch (error) {
      console.error(error);
    }
      }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Créer un événement</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          placeholder="Titre"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="event_date"
          type="date"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="location"
          placeholder="Lieu"
          onChange={handleChange}
          className="w-full border p-2"
        />

         <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Créer
        </button>
      </form>
          <Link to="/admin/events"className="text-blue-600 hover:underline mb-4 inline-block">
             ← Retour aux événements
          </Link>
    </div>
  );
}

export default AdminNewEvent;