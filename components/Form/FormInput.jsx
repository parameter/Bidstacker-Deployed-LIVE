import React, { useState } from 'react';

const FormInput = (props) => {
  const {
    name,
    label,
    errorMessage,
    onChange,
    value,
    defaultValue,
    type,
    pattern,
    required,
    min,
  } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="relative">
      <input
        id={name}
        className={`w-[100%] h-[60px] px-4 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#F9B300] peer
            ${focused ? 'invalid:border invalid:border-red-600' : ''}`}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        pattern={pattern}
        required={required}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
        placeholder=" "
        min={min}
      />
      <label
        htmlFor={name}
        className="absolute text-sm text-gray-900 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {label}
      </label>
      {focused && (
        <p className="absolute hidden peer-invalid:block font-light text-xs text-red-600 pl-2 pt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormInput;
