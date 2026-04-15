import { useState } from "react";
import { useAuth } from "../../contex/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated, fetchUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      setIsAuthenticated(true);
      await fetchUser();

      alert(res.data.message);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Échec de la connexion");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#cad2c5] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >    
        <h1 className="text-3xl font-bold text-center text-[#2f3e46] mb-6">
          Connexion
        </h1>    
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52796f]"
        />

       
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52796f]"
        />

        
        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            className="text-sm text-[#52796f] hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>
        <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
                Pas encore de compte ?
            </p>

          <Link to="/register" className="text-[#52796f] font-semibold hover:underline">
            Créer un compte
          </Link>
        </div>
       
        <div className="flex flex-col gap-3 mt-4">
          <button
            type="submit"
            className="w-full bg-[#52796f] text-white py-3 rounded-lg font-semibold hover:bg-[#354f52] transition"
          >
            Connexion
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full border border-[#52796f] text-[#52796f] py-3 rounded-lg font-semibold hover:bg-[#52796f] hover:text-white transition"
          >
            Retour à l'accueil
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;