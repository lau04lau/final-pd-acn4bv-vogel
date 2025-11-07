import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import CargarPaciente from "./pages/pacientes/CargarPaciente"
import ListarPacientes from "./pages/pacientes/ListarPacientes"
import EditarPaciente from "./pages/pacientes/EditarPaciente"
import DetallePaciente from "./pages/pacientes/DetallePaciente"
import CargarTerapeuta from "./pages/terapeutas/CargarTerapeuta"
import ListarTerapeutas from "./pages/terapeutas/ListarTerapeutas"
import EditarTerapeuta from "./pages/terapeutas/EditarTerapeuta"
import DetalleTerapeuta from "./pages/terapeutas/DetalleTerapeuta"
import Bienvenida from "./pages/Bienvenida"


function App() {
  const [pacientes, setPacientes] = useState([])
  const [terapeutas, setTerapeutas] = useState([])
  const [cargandoPacientes, setCargandoPacientes] = useState(false)
  const [errorPacientes, setErrorPacientes] = useState("")
  const [cargandoTerapeutas, setCargandoTerapeutas] = useState(false)
  const [errorTerapeutas, setErrorTerapeutas] = useState("")

  const cargarPacientes = async () => {
    try {
      setCargandoPacientes(true)
      setErrorPacientes("")
      const res = await fetch("/pacientes")
      if (!res.ok) throw new Error("No se pudieron obtener los pacientes")
      const data = await res.json()
      setPacientes(data)
    } catch (err) {
      setErrorPacientes(err.message)
    } finally {
      setCargandoPacientes(false)
    }
  }

  const cargarTerapeutas = async () => {
    try {
      setCargandoTerapeutas(true)
      setErrorTerapeutas("")
      const res = await fetch("/terapeutas")
      if (!res.ok) throw new Error("No se pudieron obtener los terapeutas")
      const data = await res.json()
      setTerapeutas(data)
    } catch (err) {
      setErrorTerapeutas(err.message)
    } finally {
      setCargandoTerapeutas(false)
    }
  }

  useEffect(() => {
    cargarPacientes()
    cargarTerapeutas()
  }, [])

  const manejarPacienteGuardado = () => {
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

  const manejarTerapeutaGuardado = () => {
    cargarTerapeutas()
  }

  const manejarEliminarTerapeuta = async id => {
    try {
      const res = await fetch(`/terapeutas/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "No se pudo eliminar el terapeuta")
      }
      cargarTerapeutas()
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
            <Route path="/" element={<Bienvenida />} />
            <Route
              path="/pacientes"
              element={
                <ListarPacientes
                  pacientes={pacientes}
                  cargando={cargandoPacientes}
                  error={errorPacientes}
                  onEliminar={manejarEliminarPaciente}
                />
              }
            />
            <Route
              path="/pacientes/nuevo"
              element={<CargarPaciente onPacienteCreado={manejarPacienteGuardado} />}
            />
            <Route
              path="/pacientes/editar/:id"
              element={
                <EditarPaciente
                  pacientes={pacientes}
                  onPacienteGuardado={manejarPacienteGuardado}
                />
              }
            />
            <Route
              path="/pacientes/detalle/:id"
              element={<DetallePaciente pacientes={pacientes} />}
            />

            <Route
              path="/terapeutas"
              element={
                <ListarTerapeutas
                  terapeutas={terapeutas}
                  cargando={cargandoTerapeutas}
                  error={errorTerapeutas}
                  onEliminar={manejarEliminarTerapeuta}
                />
              }
            />
            <Route
              path="/terapeutas/nuevo"
              element={<CargarTerapeuta onTerapeutaCreado={manejarTerapeutaGuardado} />}
            />
            <Route
              path="/terapeutas/editar/:id"
              element={
                <EditarTerapeuta
                  terapeutas={terapeutas}
                  onTerapeutaGuardado={manejarTerapeutaGuardado}
                />
              }
            />
            <Route
              path="/terapeutas/detalle/:id"
              element={<DetalleTerapeuta terapeutas={terapeutas} />}
            />
          </Routes>

        </div>
      </main>
    </div>
  )
}

export default App
