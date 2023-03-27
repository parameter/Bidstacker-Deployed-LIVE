import React, { useState } from 'react';

const FormInput = (props) => {
  const {
    name,
    label,
    errorMessage,
    onChange,
    value,
    type,
    pattern,
    required,
    maxLength
  } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div>
      <div className='relative'>
        <input
          id={name}
          className={
            focused
              ? 'bg-white dark:bg-gray-light-dark block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#F9B300] peer invalid:border invalid:border-red-600'
              : 'bg-white dark:bg-gray-light-dark block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#F9B300] peer'
          }
          name={name}
          type={type}
          value={value}
          pattern={pattern}
          required={required}
          onChange={onChange}
          onBlur={handleFocus}
          focused={focused.toString()}
          placeholder=' '
          maxLength={maxLength}
        />
        <label
          htmlFor={name}
          className='absolute text-sm text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-light-dark px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
        >
          {label}
        </label>
        {focused && (
          <p className='absolute hidden peer-invalid:block font-light text-xs text-red pl-2 pt-1'>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormInput;
