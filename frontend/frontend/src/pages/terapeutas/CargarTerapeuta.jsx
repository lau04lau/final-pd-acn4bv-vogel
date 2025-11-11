import React from "react"
import TerapeutaForm from "../../forms/TerapeutaForm"

function CargarTerapeuta({ onTerapeutaCreado }) {
  return (
    <div className="bg-[#3c5a85] rounded-[14px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
      <h1 className="text-2xl font-semibold mb-6 text-center text-[#edf8f9]">
        Nuevo terapeuta
      </h1>
      <TerapeutaForm onTerapeutaCreado={onTerapeutaCreado} />
    </div>
  )
}

export default CargarTerapeuta
