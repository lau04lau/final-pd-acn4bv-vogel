import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import PacienteForm from "../../forms/PacienteForm"

function EditarPaciente({ pacientes, onPacienteGuardado }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const paciente = pacientes.find(p => String(p.id) === id)

  const manejarGuardado = () => {
    onPacienteGuardado()
    navigate("/pacientes")
  }

  if (!paciente) {
    return <p className="text-[#ffd1d1]">Paciente no encontrado.</p>
  }

  return (
    <div className="bg-[#3c5a85] rounded-[14px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
      <h1 className="text-2xl font-semibold mb-6 text-center text-[#edf8f9]">
        Editar paciente
      </h1>
      <PacienteForm paciente={paciente} onPacienteCreado={manejarGuardado} />
    </div>
  )
}

export default EditarPaciente
