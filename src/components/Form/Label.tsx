import React from 'react';
import clsx from 'clsx';
export const Label: React.FC<{
  name: string;
  className?: string;
  label: string;
}> = ({ name, className, label }) => {
  const classes = clsx('block text-sm font-medium text-gray-700', className);
  return (
    <label htmlFor={name} className={classes}>
      {label}
    </label>
  );
};
