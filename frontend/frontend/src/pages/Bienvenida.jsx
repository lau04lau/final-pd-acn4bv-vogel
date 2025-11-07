import React from "react"
import { useNavigate } from "react-router-dom"

function Bienvenida() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-[#3c5a85] rounded-[14px] shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
      <img
        src="/logo.png"
        alt="Logo"
        className="h-20 w-20 rounded-full border-2 border-[#edf8f9] mb-4 object-cover"
      />
      <h1 className="text-3xl font-semibold text-[#edf8f9] mb-3">
        Bienvenido/a al Gestor Psicopedagógico
      </h1>
      <p className="text-[#edf8f9cc] max-w-xl mb-8">
        Desde aquí podés administrar tus <strong>pacientes</strong> y <strong>terapeutas</strong>, 
        registrar consultas y mantener toda la información organizada de manera segura.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => navigate("/pacientes")}
          className="px-5 py-2 rounded-full border border-[#cfe3f1] bg-[#e8f3fb] text-[#12263a] font-medium hover:bg-[#d6e8f7] transition"
        >
          Ver pacientes
        </button>
        <button
          onClick={() => navigate("/terapeutas")}
          className="px-5 py-2 rounded-full border border-[#cfe3f1] bg-[#e8f3fb] text-[#12263a] font-medium hover:bg-[#d6e8f7] transition"
        >
          Ver terapeutas
        </button>
      </div>
    </div>
  )
}

export default Bienvenida
