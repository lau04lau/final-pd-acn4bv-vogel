import React from "react"
import PacienteList from "../components/PacienteList"

function ListarPacientes({ pacientes, cargando, error, onEliminar }) {
  return (
    <div className="bg-[#3c5a85] rounded-[14px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
      <h2 className="text-lg font-semibold mb-4 text-[#edf8f9]">
        Listado de pacientes
      </h2>
      {cargando && <p className="mb-2 text-[#edf8f9]">Cargando...</p>}
      {error && <p className="mb-2 text-[#ffd1d1]">{error}</p>}
      <PacienteList pacientes={pacientes} onEliminar={onEliminar} />
    </div>
  )
}

export default ListarPacientes
