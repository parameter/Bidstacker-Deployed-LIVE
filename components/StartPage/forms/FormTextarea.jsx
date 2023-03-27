import { useState } from 'react';

const FormTextarea = (props) => {
  const {
    name,
    errorMessage,
    onChange,
    value,
    type,
    pattern,
    required,
    rows,
    placeholder,
    maxLength
  } = props;

  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div>
      <div className='relative'>
        <textarea
          id={name}
          className={
            focused
              ? 'bg-white dark:bg-gray-light-dark placeholder-black dark:placeholder-white block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#F9B300] peer invalid:border invalid:border-red-600'
              : 'bg-white dark:bg-gray-light-dark placeholder-black dark:placeholder-white block px-2.5 pb-2.5 pt-4 w-full text-base text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#F9B300] peer'
          }
          name={name}
          type={type}
          value={value}
          pattern={pattern}
          required={required}
          onChange={onChange}
          onBlur={handleFocus}
          focused={focused.toString()}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
        />
        {focused && (
          <p className='absolute hidden peer-invalid:block font-light text-xs text-red-600 pl-2 pt-1'>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormTextarea;
