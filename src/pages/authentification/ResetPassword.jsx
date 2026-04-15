import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        { password, confirmPassword }
      );

      setMessage(res.data.message || "Mot de passe réinitialisé avec succès.");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setMessage("Une erreur s'est produite. Essayez à nouveau.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#cad2c5] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-2xl font-bold text-center text-[#2f3e46] mb-6">
          Réinitialiser le mot de passe
        </h1>

        {message && (
          <p className="text-center text-sm text-[#52796f] mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#52796f]"
            required
          />

          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#52796f]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#52796f] text-white py-3 rounded-lg hover:bg-[#354f52] transition"
          >
            Réinitialiser
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full border border-[#52796f] text-[#52796f] py-3 rounded-lg hover:bg-[#52796f] hover:text-white transition"
          >
            Retour
          </button>
        </form>
      </div>
    </div>
  );
}