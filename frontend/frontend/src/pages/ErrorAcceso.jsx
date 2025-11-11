import React from "react"
import { useNavigate } from "react-router-dom"

function ErrorAcceso() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#3c5a85] rounded-[14px] p-8 text-center text-[#edf8f9] shadow-[0_6px_16px_rgba(0,0,0,0.12)] max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Acceso restringido
      </h2>
      <p className="mb-6 text-[#edf8f9cc]">
        Para ver esta página necesitás iniciar sesión como terapeuta.
      </p>
      <div className="flex justify-center gap-3">
        <button
          className="px-5 py-2 rounded-full bg-[#e8f3fb] text-[#12263a] border border-[#cfe3f1] hover:bg-[#d6e8f7] transition text-sm font-medium"
          onClick={() => navigate("/login")}
        >
          Ir a login
        </button>
        <button
          className="px-5 py-2 rounded-full bg-transparent text-[#edf8f9] border border-[#edf8f9] hover:bg-[#2e4565] transition text-sm"
          onClick={() => navigate("/")}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  )
}

export default ErrorAcceso
