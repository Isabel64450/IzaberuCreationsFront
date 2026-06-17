import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Hacienda_mexicana from "../images/Hacienda mexicana.jpg";



function Artist() {
 const [events, setEvents] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await axiosInstance.get("/events");
       
        setEvents(res.data);
      } catch (error) {
        console.error("Erreur events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Chargement des événements...
    </div>
  );
}
  return (
    <div className="bg-[#cad2c5] text-[#2f3e46] min-h-screen">

     
 <section className="relative h-[60vh] flex flex-col justify-center items-center text-center px-6 text-white overflow-hidden">

  
  <div className="absolute inset-0">
    <img
      src={Hacienda_mexicana}
      alt="background"
      className="w-full h-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-black/30"></div> 
  </div>

 
  <div className="relative z-10">
    <h1 className="text-5xl font-bold mb-4">Izaberu Creations</h1>
    <p className="max-w-xl text-lg">
      Une approche sensible et contemporaine mêlant textures et émotions.
    </p>
  </div>

</section>    
      <section className="w-full py-20 px-10">
           <div className="max-w-5xl ml-auto">
             <h2  className="text-3xl font-bold text-right mb-6">À propos</h2>
           </div>
       
       
        <p className="leading-relaxed text-lg">
          Passionnée depuis petite par l’Art en général vivant dans le sud ouest de la France. Je peins suivant les sujets donnée par mon professeur, ou ce que je trouve sur  internet ou encore des paysages, des animaux etc...
          Si vous avez une idée paysage, photo pour offrir ou pour vous même je serai ravis de vous proposer mes services.
          Je vous invite également à découvrir mes œuvres, reflet de ma passion et de mon expérience, et à partager ce voyage artistique avec moi.
        </p>
      </section>     
  <section className="w-full pb-20 px-6">
  <div className="max-w-6xl mx-auto">

  
    <h2 className="texte-center">
      Événements
    </h2>
  
    <div className="mb-16">
      <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">
        À venir
      </h3>

      {events.upcoming.length === 0 ? (
        <p className="text-center">Aucun événement prévu</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.upcoming.map(event => (
            <div key={event.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
              {event.image_url && (
                <img src={event.image_url} className="w-full h-48 object-cover" />
              )}
              <div className="p-5">
                <h4 className="text-lg font-bold">{event.title}</h4>
                <p className="text-sm text-gray-500">{event.event_date?.split("T")[0]}</p>
                <p className="text-sm">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

   
    <div>
      <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">
        Passés
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.past.map(event => (
          <div key={event.id} className="bg-gray-100 rounded-2xl shadow-sm opacity-80">
            {event.image_url && (
              <img src={event.image_url} className="w-full h-48 object-cover" />
            )}
            <div className="p-5">
              <h4 className="text-lg font-bold">{event.title}</h4>
              <p className="text-sm text-gray-500">{event.event_date?.split("T")[0]}</p>
              <p className="text-sm">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>
    </div>
  );
}

export default Artist;