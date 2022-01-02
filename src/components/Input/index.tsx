import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  classes?: {
    container?: string;
    label?: string;
    input?: string;
  };
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  name,
  classes,
  errorMessage = '',
  ...inputProps
}) => {
  return (
    <div className={`mb-6 ${classes?.container || ''}`}>
      <label
        className={`block text-gray-700 text-sm font-bold mb-2 ${
          classes?.label || ''
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`shadow appearance-none border rounded leading-loose  ${
          errorMessage !== '' && 'border-red-500 mb-3'
        } w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${
          classes?.input
        }`}
        id={id}
        name={name}
        {...inputProps}
      />
      {errorMessage !== '' && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
