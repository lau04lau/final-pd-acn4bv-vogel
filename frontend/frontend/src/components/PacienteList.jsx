import React from "react"
import { useNavigate } from "react-router-dom"

function PacienteList({ pacientes, onEliminar }) {
  const navigate = useNavigate()

  if (!pacientes.length) {
    return <p className="text-sm text-[#edf8f9]">No hay pacientes cargados.</p>
  }

  return (
    <div className="max-h-80 overflow-y-auto bg-[#ffffff] text-[#12263a] rounded-[12px] shadow-[0_6px_16px_rgba(0,0,0,0.08)]">
      <table className="min-w-full text-sm table-fixed">
        <thead>
          <tr className="bg-[#f2f6fb]">
            <th className="px-3 py-2 text-left">Nombre</th>
            <th className="px-3 py-2 text-left">DNI</th>
            <th className="px-3 py-2 text-left">Teléfono</th>
            <th className="px-3 py-2 text-left">Nivel</th>
            <th className="px-3 py-2 text-left w-40">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(p => (
            <tr key={p.id} className="border-b border-[#e9eef3] last:border-b-0">
              <td className="px-3 py-2 truncate">
                <button
                  className="text-left text-[#3c5a85] hover:underline"
                  onClick={() => navigate(`/pacientes/detalle/${p.id}`)}
                >
                  {p.nombre} {p.apellido}
                </button>
              </td>
              <td className="px-3 py-2 truncate">{p.dni}</td>
              <td className="px-3 py-2 truncate">{p.telefono}</td>
              <td className="px-3 py-2 truncate">{p.nivelEducativo}</td>
              <td className="px-3 py-2">
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 rounded-full text-xs bg-[#e8f3fb] text-[#12263a] border border-[#cfe3f1] hover:bg-[#d6e8f7] transition"
                    onClick={() => navigate(`/pacientes/editar/${p.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-3 py-1 rounded-full text-xs bg-[#ffd1d1] text-[#12263a] border border-[#f5aaaa] hover:bg-[#f7b9b9] transition"
                    onClick={() => onEliminar(p.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PacienteList
