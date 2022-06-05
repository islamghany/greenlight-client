import React from 'react';
import './form.css';
export * from './Input';

interface FormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {children}
    </form>
  );
};
