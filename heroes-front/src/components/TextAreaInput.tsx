import React from 'react';
import { useField } from 'formik';

interface TextAreaInputProps {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  rows?: number;
}

const TextAreaInput = ({ label, id, ...props }: TextAreaInputProps) => {
  const [field, meta] = useField(props.name);

  return (
    <div className='mb-4'>
      <label
        htmlFor={id}
        className='mb-2 block text-sm font-bold text-gray-700'
      >
        {label}
      </label>
      <textarea
        id={id}
        className={`focus:shadow-outline w-full resize-none appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
          meta.touched && meta.error ? 'border-red-500' : ''
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className='mt-2 text-xs italic text-red-500'>{meta.error}</div>
      ) : (
        ''
      )}
    </div>
  );
};

export default TextAreaInput;
