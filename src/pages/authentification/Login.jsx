import { useState, useEffect } from 'react';
import { useAuth } from '../../contex/AuthContext';
import { useNavigate,useSearchParams, Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'; 
import "../../styles/login.css"

const LoginForm =() => {
  
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [infoMessage, setInfoMessage] = useState('');
const { setIsAuthenticated } = useAuth();
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post('/users/login', { email, password });
      alert(res.data.message);
      setIsAuthenticated(true)
      navigate('/'); 
    } catch (err) {
      console.error('Erreur lors du login :', err);
      alert('Échec de la connexion');
    }
  };

  return (

    <form className="login-container" onSubmit={handleSubmit}>
      {infoMessage && (
  <div className="info-message">
    {infoMessage}
  </div>
)}
  <h1>Connexion</h1>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email"
    required
  />
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Mot de passe"
    required
  />
  <div >
        <Link to="/forgot-password" className="forgot-password">
          Mot de passe oublié ?
        </Link>
      </div>
  <div className="bouttons-rows">
<button type="submit">Connexion</button>
  <button type="button" onClick={() => navigate('/')}>Retour à l'Accueil</button>
  </div>
  
</form>
  );
}

export default LoginForm;