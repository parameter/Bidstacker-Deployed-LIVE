import React from 'react'

const FormRadioBox = ({id, onChange, value, name,label, required, checked}) => {
  return (
    <>
      <input
        id={id}
        onChange={onChange}
        type="radio"
        value={value}
        name={name}
        className="w-4 h-4 bg-gray-100 accent-gray-500 border-gray-300 cursor-pointer"
        required={required}
        checked={checked}
      />
      <label htmlFor={id} className="text-md font-medium ml-2 cursor-pointer">
        {label}
      </label>
    </>
  );
}

export default FormRadioBox