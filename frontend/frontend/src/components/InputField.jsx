import React from "react"

function InputField({ label, name, type = "text", value, onChange }) {
  return (
    <div className="flex flex-col gap-1 max-w-md mx-auto">
      <label className="text-sm font-medium text-[#edf8f9] text-left">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 rounded-xl border-2 border-[#edf8f9] bg-[#3d5a80] text-[#edf8f9] placeholder:text-[#edf8f9aa] outline-none transition focus:ring-2 focus:ring-[#edf8f9] focus:ring-offset-2 focus:ring-offset-[#3c5a85]"
      />
    </div>
  )
}

export default InputField
