import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Link } from "react-router-dom";

function AdminEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const res = await axiosInstance.get("/events");
 
    setEvents([...res.data.upcoming, ...res.data.past]);
  }

  async function handleDelete(id) {
  const confirmDelete = window.confirm("Supprimer cet événement ?");

  if (!confirmDelete) return;

  try {
    await axiosInstance.delete(`/events/${id}`);
    fetchEvents(); 
  } catch (error) {
    console.error("Erreur delete:", error);
  }
}

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des événements</h1>

      <Link
        to="/admin/events/new"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        + Ajouter un événement
      </Link>

      <div className="mt-6 space-y-3">
        {events.map(event => (
          <div key={event.id} className="p-4 bg-white shadow rounded">
            <h2 className="font-bold">{event.title}</h2>
            <p>{event.event_date}</p>

            <div className="flex gap-2 mt-2">
              <Link
                to={`/admin/events/${event.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
     <Link to="/artist" className="text-blue-600 hover:underline mb-4 inline-block">
      ← Retour aux événements
     </Link>



    </div>
  );
}

export default AdminEvents;