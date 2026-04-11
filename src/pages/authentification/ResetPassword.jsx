import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/login.css"; 

export default function ResetPassword() {
  const { token } = useParams(); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await axiosInstance.post(`/users/reset-password/${token}`, {
        password,
        confirmPassword,
      });
      setMessage(res.data.message || "Mot de passe réinitialisé avec succès.");
      setTimeout(() => navigate("/login"), 2000); 
    } catch (err) {
      console.error("Erreur lors de la réinitialisation :", err);
      setMessage("Une erreur s'est produite. Essayez à nouveau.");
    }
  };

  return (
    <div className="login-container-wrapper">
      <form className="login-container" onSubmit={handleSubmit}>
        <h1>Réinitialiser le mot de passe</h1>
        {message && <p style={{ color: '#52796f', fontSize: '14px' }}>{message}</p>}
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="bouttons-rows">
          <button type="submit">Réinitialiser</button>
          <button type="button" onClick={() => navigate("/")}>Retour</button>
        </div>
      </form>
    </div>
  );
}