import React from "react"
import { useParams, useNavigate } from "react-router-dom"

function DetallePaciente({ pacientes }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const paciente = pacientes.find(p => String(p.id) === id)

  if (!paciente) {
    return (
      <div className="bg-[#3c5a85] rounded-[14px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
        <h2 className="text-lg font-semibold mb-4 text-center text-[#edf8f9]">
          Paciente no encontrado
        </h2>
        <div className="flex justify-center">
          <button
            className="px-5 py-2 rounded-full bg-[#e8f3fb] text-[#12263a] border border-[#cfe3f1] hover:bg-[#d6e8f7] transition"
            onClick={() => navigate("/pacientes")}
          >
            Volver al listado
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#3c5a85] rounded-[14px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
      <h2 className="text-lg font-semibold mb-6 text-center text-[#edf8f9]">
        Detalle del paciente
      </h2>

      <div className="bg-[#ffffff] text-[#12263a] rounded-[12px] p-5 space-y-2">
        <p><span className="font-semibold">Nombre:</span> {paciente.nombre} {paciente.apellido}</p>
        <p><span className="font-semibold">DNI:</span> {paciente.dni}</p>
        <p><span className="font-semibold">Teléfono:</span> {paciente.telefono}</p>
        <p><span className="font-semibold">Fecha de nacimiento:</span> {paciente.fechaNac}</p>
        <p><span className="font-semibold">Género:</span> {paciente.genero}</p>
        <p><span className="font-semibold">Nivel educativo:</span> {paciente.nivelEducativo}</p>
        <p><span className="font-semibold">Grado/Curso:</span> {paciente.gradoCurso}</p>
        <p><span className="font-semibold">Motivo de consulta:</span></p>
        <p className="whitespace-pre-line">{paciente.motivoConsulta}</p>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <button
          className="px-4 py-2 rounded-full bg-[#e8f3fb] text-[#12263a] border border-[#cfe3f1] hover:bg-[#d6e8f7] text-sm transition"
          onClick={() => navigate(`/pacientes/editar/${paciente.id}`)}
        >
          Editar
        </button>
        <button
          className="px-4 py-2 rounded-full bg-[#e8f3fb] text-[#12263a] border border-[#cfe3f1] hover:bg-[#d6e8f7] text-sm transition"
          onClick={() => navigate("/pacientes")}
        >
          Volver al listado
        </button>
      </div>
    </div>
  )
}

export default DetallePaciente
