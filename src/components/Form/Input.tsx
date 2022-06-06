import clsx from 'clsx';
import React from 'react';
import { Label } from './Label';
import Error from './Error';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  icon?: React.ReactNode;
  error?: string;
  name: string;
  register?: any;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  className,
  type = 'text',
  icon,
  error,
  register = {},
  ...rest
}) => {
  const isIconExist = icon !== undefined;
  return (
    <div className="w-full">
      {label && <Label label={label} name={name} />}
      <div className="relative">
        {isIconExist && (
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center ">
            {icon}
          </div>
        )}
        <input
          id={name}
          type={type}
          {...rest}
          {...register}
          className={`appearance-none block w-full ${
            isIconExist ? 'pl-10' : ''
          } py-2 px-3 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500  focus:border-indigo-500 sm:text-sm ${className}`}
        />
      </div>
      <Error error={error} />
    </div>
  );
};
