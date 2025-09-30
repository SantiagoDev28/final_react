import { useState } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Login() {
  const [alias, setAlias] = useState("")
  const [contraseña, setContraseña] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login( alias , contraseña)
    if (result) {
      toast.success("Login exitoso! Redirigiendo...", { position: "top-right" })
      setTimeout(() => {
        navigate("/tasks")
      }, 1500)
    } else {
      toast.error("Usuario o contraseña incorrectos", { position: "top-right" })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <h2 className="text-3xl font-extrabold text-blue-700 text-center mb-2">Iniciar Sesión</h2>
          <label className="font-semibold text-gray-700" htmlFor="username">Usuario:</label>
          <input
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="text"
            id="username"
            placeholder="Ingresa tu usuario"
            autoComplete="username"
          />
          <label className="font-semibold text-gray-700" htmlFor="password">Contraseña:</label>
          <input
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
          />
          <button
            className="bg-blue-600 text-white rounded-xl p-3 font-bold text-lg hover:bg-blue-700 transition-all shadow"
            type="submit"
          >
            Ingresar
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}