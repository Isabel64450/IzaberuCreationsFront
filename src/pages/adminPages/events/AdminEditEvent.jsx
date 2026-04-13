import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Link ,useParams, useNavigate } from "react-router-dom";

function AdminEditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    event_date: "",
    location: ""
   
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  async function fetchEvent() {
    const res = await axiosInstance.get(`/events/${id}`);
    setForm(res.data);
    setPreview(res.data.image_url);
  }
console.log("PARAMS:", useParams());
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
   function handleImage(e) {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {

      await axiosInstance.put(`/events/${id}`, form);

     
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        await axiosInstance.post(`/events/${id}/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      }

      navigate("/admin/events");
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Modifier événement</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="event_date"
          type="date"
          value={form.event_date}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full"
        />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-32 h-32 object-cover mt-2 rounded"
          />
        )}

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Modifier
        </button>
      </form>
      <Link to="/admin/events" className="text-blue-600 hover:underline mb-4 inline-block">
       ← Retour aux événements
      </Link>
    </div>
  );
}

export default AdminEditEvent;