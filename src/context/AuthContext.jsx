import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Recupera usuario de localStorage si existe
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate()

  const login = async (correo, contraseña) => {
    try {
      const res = await axios.get('http://localhost:4000/users');
      const usuarios = res.data;
      const usuario = usuarios.find(
        u => u.correo === correo && u.contraseña === contraseña
      );
      if (usuario) {
        setUser(usuario);
        localStorage.setItem('user', JSON.stringify(usuario));
        toast.success('Login exitoso!')
        navigate('/usuarios')
        return true;
      } else {
        toast.error('Credenciales incorrectas')
        return false;
      }
    } catch (error) {
      console.error('Error al consultar usuarios:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

