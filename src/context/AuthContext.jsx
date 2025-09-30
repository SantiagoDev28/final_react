import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = async (alias, contraseña) => {
    try {
      const res = await api.get(`/users`, {
        params: { alias, contraseña },
      });

      if (res.data.length > 0) {
        const loggedUser = res.data[0];
        setUser(loggedUser);
        localStorage.setItem("user", JSON.stringify(loggedUser));
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error en login:", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
