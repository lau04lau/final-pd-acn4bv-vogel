import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import CargarPaciente from "./pages/CargarPaciente"
import ListarPacientes from "./pages/ListarPacientes"
import EditarPaciente from "./pages/EditarPaciente"
import DetallePaciente from "./pages/DetallePaciente"

function App() {
  const [pacientes, setPacientes] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState("")

  const cargarPacientes = async () => {
    try {
      setCargando(true)
      setError("")
      const res = await fetch("/pacientes")
      if (!res.ok) throw new Error("No se pudieron obtener los pacientes")
      const data = await res.json()
      setPacientes(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarPacientes()
  }, [])

  const manejarGuardadoPaciente = () => {
    cargarPacientes()
  }

  const manejarEliminarPaciente = async id => {
    try {
      const res = await fetch(`/pacientes/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "No se pudo eliminar el paciente")
      }
      cargarPacientes()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#eef7fa] text-[#12263a] flex flex-col">
      <NavBar />
      <main className="flex-grow flex justify-center items-start px-4 py-8">
        <div className="w-full max-w-5xl bg-[#344f74] text-[#edf8f9] rounded-[14px] shadow-[0_6px_16px_rgba(0,0,0,0.08)] p-6 md:p-8">
          <Routes>
            <Route
              path="/"
              element={<CargarPaciente onPacienteCreado={manejarGuardadoPaciente} />}
            />
            <Route
              path="/pacientes"
              element={
                <ListarPacientes
                  pacientes={pacientes}
                  cargando={cargando}
                  error={error}
                  onEliminar={manejarEliminarPaciente}
                />
              }
            />
            <Route
              path="/pacientes/editar/:id"
              element={
                <EditarPaciente
                  pacientes={pacientes}
                  onPacienteGuardado={manejarGuardadoPaciente}
                />
              }
            />
            <Route
              path="/pacientes/detalle/:id"
              element={<DetallePaciente pacientes={pacientes} />}
            />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
