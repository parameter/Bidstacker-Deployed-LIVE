import clsx from 'clsx';
import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  {
    label,
    placeholder,
    className,
    htmlType,
    autoComplete,
    size,
    ariaLabel,
    required,
  },
  ref
) {
  return (
    <div className={clsx(className)}>
      <label>
        {label && <div className="">{label}</div>}
        <input
          type={htmlType}
          autoComplete={autoComplete}
          placeholder={placeholder}
          ref={ref}
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label={ariaLabel}
          required={required}
        />
      </label>
    </div>
  );
});

export default Input;
