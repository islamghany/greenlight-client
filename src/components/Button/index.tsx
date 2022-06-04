import React, { FC } from 'react';
import clsx from 'clsx';

import './button.css';
import Spinner from '../Spinner';
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'xs' | 'md' | 'lg' | 'xl';
  bg?: 'primary' | 'secondary';
  icon?: React.ReactElement;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  bg = 'primary',
  size = 'md',
  children,
  icon,
  loading = false,
  className,
  ...rest
}) => {
  const classes = clsx(
    'btn',
    !loading && 'btn-' + bg,
    'btn-' + size,
    loading && 'btn-loading',
    className
  );
  return (
    <button disabled={loading} type="button" className={classes} {...rest}>
      {loading && (
        <div className="btn-spinner__container">
          <Spinner size="sm" />
        </div>
      )}
      {children}
      {icon !== undefined && <div className="btn__icon">{icon}</div>}
    </button>
  );
};
export default Button;
