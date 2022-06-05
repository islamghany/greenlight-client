import React, { FC } from 'react';
import clsx from 'clsx';
import './button.css';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'xs' | 'md' | 'lg' | 'xl';
  bg?: 'primary' | 'secondary';
  icon?: React.ReactElement;
  loading?: boolean;
}

interface ButtonText extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  to: string;
}
export const ButtonText: FC<ButtonText> = ({
  children,
  to,
  className,
  ...rest
}) => {
  const classes = clsx(
    'font-medium text-sm text-indigo-600 hover:text-indigo-500',
    className
  );
  return (
    <Link to={to} className={classes} {...ResizeObserverEntry}>
      {children}
    </Link>
  );
};
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
