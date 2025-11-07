import React from "react"
import { useParams, useNavigate } from "react-router-dom"

function DetalleTerapeuta({ terapeutas }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const terapeuta = terapeutas.find(t => String(t.id) === id)

  if (!terapeuta) {
    return <p className="text-[#ffd1d1]">Terapeuta no encontrado.</p>
  }

  return (
    <div className="bg-[#3c5a85] rounded-[14px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
      <h2 className="text-lg font-semibold mb-6 text-center text-[#edf8f9]">Detalle del terapeuta</h2>
      <div className="bg-[#ffffff] text-[#12263a] rounded-[12px] p-5 space-y-2">
        <p><span className="font-semibold">Usuario:</span> {terapeuta.usuario}</p>
        <p><span className="font-semibold">Contraseña:</span> {terapeuta.contrasenia}</p>
      </div>
      <div className="flex justify-end mt-4 gap-2">
        <button
          className="px-4 py-2 rounded-full bg-[#e8f3fb] text-[#12263a] border border-[#cfe3f1] hover:bg-[#d6e8f7] text-sm transition"
          onClick={() => navigate(`/terapeutas/editar/${terapeuta.id}`)}
        >
          Editar
        </button>
        <button
          className="px-4 py-2 rounded-full bg-[#e8f3fb] text-[#12263a] border border-[#cfe3f1] hover:bg-[#d6e8f7] text-sm transition"
          onClick={() => navigate("/terapeutas")}
        >
          Volver
        </button>
      </div>
    </div>
  )
}

export default DetalleTerapeuta
