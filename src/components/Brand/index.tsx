import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
interface BrandProps extends React.HTMLAttributes<HTMLImageElement> {}
const Brand: React.FC<BrandProps> = ({ className, ...props }) => {
  const clasess = clsx('h-12 w-auto', className);

  return (
    <Link to="/">
      <img
        className={clasess}
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Greenlight"
        {...props}
      />
    </Link>
  );
};

export default Brand;
