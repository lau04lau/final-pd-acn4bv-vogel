import React from "react"
import PacienteForm from "../components/PacienteForm"

function CargarPaciente({ onPacienteCreado }) {
  return (
    <div className="bg-[#3c5a85] rounded-[14px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
      <h2 className="text-lg font-semibold mb-6 text-center text-[#edf8f9]">
        Nuevo paciente
      </h2>
      <PacienteForm onPacienteCreado={onPacienteCreado} />
    </div>
  )
}

export default CargarPaciente
