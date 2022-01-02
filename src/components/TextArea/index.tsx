import * as React from 'react';

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  label: string;
  id: string;
  name: string;
  classes?: {
    container?: string;
    label?: string;
    textArea?: string;
  };
  errorMessage?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  id,
  name,
  classes,
  errorMessage = '',
  ...textAreaProps
}) => {
  return (
    <div className={`mb-6 ${classes?.container}`}>
      <label
        className={`block text-gray-700 text-sm font-bold mb-2 ${classes?.label}`}
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        className={`resize-none shadow appearance-none border rounded leading-loose  ${
          errorMessage !== '' && 'border-red-500 mb-3'
        } w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${
          classes?.textArea
        }`}
        id={id}
        name={name}
        {...textAreaProps}
      />
      {errorMessage !== '' && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}
    </div>
  );
};

export default TextArea;
