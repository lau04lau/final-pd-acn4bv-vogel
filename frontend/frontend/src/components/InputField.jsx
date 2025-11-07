import React from "react"

function InputField({ label, name, type = "text", value, onChange }) {
  return (
    <div className="flex flex-col gap-1 md:flex-row md:items-center">
      <label className="md:w-40 md:text-right text-sm font-medium text-[#edf8f9] mb-1 md:mb-0">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="flex-1 px-3 py-2 rounded-full border-2 border-[#edf8f9] bg-[#3d5a80] text-[#edf8f9] placeholder:text-[#edf8f9aa] outline-none transition focus:ring-2 focus:ring-[#edf8f9] focus:ring-offset-2 focus:ring-offset-[#3c5a85]"
      />
    </div>
  )
}

export default InputField
