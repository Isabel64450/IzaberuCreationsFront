import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Vérification en cours...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PORT_BACK}/auth/verify/${token}`
        );
       
        setMessage(
          res.data.message || "Votre compte a été vérifié avec succès."
        );
       if (res.status === 200) {
         setSuccess(true);
} else {
  setSuccess(false);
}

        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        console.error(err);
   

        setMessage(
          err.response?.data?.message || "Lien invalide ou expiré."
        );
        setSuccess(false);
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#cad2c5] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">

        <h2
          className={`text-2xl font-bold mb-4 ${
            success ? "text-[#52796f]" : "text-red-500"
          }`}
        >
          {success ? "Succès" : "Échec"}
        </h2>

        <p className="text-gray-700 mb-3">{message}</p>

        <p className="text-sm text-gray-500">
          {success
            ? "Redirection vers la page de connexion..."
            : "Retour vers l'inscription..."}
        </p>

        {!success && (
          <button
            onClick={() => navigate("/register")}
            className="mt-6 w-full bg-[#52796f] text-white py-3 rounded-lg hover:bg-[#354f52] transition"
          >
            Retour à l'inscription
          </button>
        )}

        {success && (
          <div className="mt-6 w-full h-1 bg-gray-200 overflow-hidden rounded-full">
            <div className="h-full bg-[#52796f] animate-pulse w-full"></div>
          </div>
        )}

      </div>
    </div>
  );
};

export default VerifyEmailPage;