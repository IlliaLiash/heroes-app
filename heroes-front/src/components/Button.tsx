import { ComponentPropsWithRef } from 'react';

export default function Button(props: ComponentPropsWithRef<'button'>) {
  const { className, children, ...rest } = props;
  return (
    <button
      className={`rounded-md bg-black px-4 py-2 text-white ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
