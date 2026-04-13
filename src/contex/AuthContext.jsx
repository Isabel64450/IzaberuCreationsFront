import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

const logout = async () => {
  try {
    await axiosInstance.get("/users/logout");
  } catch (err) {
    console.error(err);
  }

  setIsAuthenticated(false);
  setUser(null); 
};


 const fetchUser = async () => {
  try {
    const res = await axiosInstance.get("/users/me");
    setUser(res.data);
    setIsAuthenticated(true);
  } catch {
    setUser(null);
    setIsAuthenticated(false);
  } finally {
    setLoading(false);
  }
};
    
   useEffect(() => {
  fetchUser();
}, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, fetchUser,logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}