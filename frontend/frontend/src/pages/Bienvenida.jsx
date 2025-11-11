import React from "react"

function Bienvenida() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-[#3c5a85] rounded-[14px] shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
      <img
        src="/logo.png"
        alt="Logo"
        className="h-24 w-24 rounded-full border-2 border-[#edf8f9] mb-6 object-cover"
      />
      <h1 className="text-3xl md:text-4xl font-semibold text-[#edf8f9] mb-3">
        Bienvenido/a al Gestor Psicopedagógico
      </h1>
      <p className="text-[#edf8f9cc] max-w-xl text-base md:text-lg leading-relaxed">
        Un espacio digital pensado para acompañar, registrar y potenciar los procesos de
        intervención psicopedagógica de manera simple y organizada.
      </p>
    </div>
  )
}

export default Bienvenida
