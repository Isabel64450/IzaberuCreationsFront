import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmailPage = () => {
  const { token } = useParams();
  console.log("Token récupéré:", token);
  const navigate = useNavigate();
  const [message, setMessage] = useState("Vérification en cours...");
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    console.log("Token récupéré depuis l'URL:", token);
    const verify = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_PORT_BACK}/users/verify/${token}`);
        setMessage(res.data.message || "Votre compte a été vérifié avec succès.");
        setSuccess(true);
        setTimeout(() => navigate("/login"), 3000);  
      } catch (err) {
        console.error("Erreur de vérification:", err);
        setMessage(err.response?.data?.message || "Lien invalide ou expiré.");
        setSuccess(false);
        
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <div style={{ maxWidth: 500, margin: "80px auto", textAlign: "center", fontFamily: "sans-serif" }}>
      <h2>{success ? " Succès !" : "Échec"}</h2>
      <p>{message}</p>
      <p>{success ? "Redirection vers la page de connexion..." : "Retour vers l'inscription..."}</p>
    </div>
  );
};

export default VerifyEmailPage;