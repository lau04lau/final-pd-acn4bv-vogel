import React from "react"
import { NavLink } from "react-router-dom"

function NavBar() {
  return (
    <div className="w-full bg-[#12263a] shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-10 rounded-full border-2 border-[#e8f3fb] object-cover"
          />
          <span className="text-[#e8f3fb] font-semibold text-lg">
            Gestor Psicopedagógico
          </span>
        </div>
        <div className="flex gap-3 text-sm md:text-base">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-full transition ${
                isActive
                  ? "bg-[#e8f3fb] text-[#12263a]"
                  : "text-[#e8f3fb] hover:bg-[#3c5a85]"
              }`
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/pacientes"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full transition ${
                isActive
                  ? "bg-[#e8f3fb] text-[#12263a]"
                  : "text-[#e8f3fb] hover:bg-[#3c5a85]"
              }`
            }
          >
            Pacientes
          </NavLink>
          <NavLink
            to="/terapeutas"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full transition ${
                isActive
                  ? "bg-[#e8f3fb] text-[#12263a]"
                  : "text-[#e8f3fb] hover:bg-[#3c5a85]"
              }`
            }
          >
            Terapeutas
          </NavLink>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
