import React from 'react';
import Brand from '../Brand';
import { ButtonText } from '../Button';
import './form.css';
export * from './Input';

interface FormProps {
  children: React.ReactNode;
}
interface FormBodyProps extends FormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}
interface FormHeadProps {
  title?: string;
  to?: string;
  navText?: string;
}
export const FormBody: React.FC<FormBodyProps> = ({ children, onSubmit }) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export const FormContainer: React.FC<FormProps> = ({ children }) => {
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export const FormHead: React.FC<FormHeadProps> = ({ navText, title, to }) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <Brand className="mx-auto" />
      {title && (
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
      )}
      {navText && to && (
        <p className="mt-2 text-center text-sm text-gray-600">
          Or <ButtonText to={to}>{navText}</ButtonText>
        </p>
      )}
    </div>
  );
};
