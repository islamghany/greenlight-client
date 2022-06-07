import clsx from 'clsx';
import {
  ExclamationIcon,
  XCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/solid';
import './alert.css';
interface AlertProps {
  type: 'warning' | 'success' | 'error' | 'info';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const alertIcons = {
  info: () => (
    <InformationCircleIcon className="h-5 w-5 fill-current text-current" />
  ),
  warning: () => (
    <ExclamationIcon className="h-5 w-5 fill-current text-current" />
  ),
  success: () => (
    <CheckCircleIcon className="h-5 w-5 fill-current text-current" />
  ),
  error: () => <XCircleIcon className="h-5 w-5 fill-current text-current" />,
};
const Alert: React.FC<AlertProps> = ({ title, type, children, className }) => {
  const classes = clsx(`alert__container ${type}`, className);
  return (
    <div className={classes}>
      <div className="flex">
        <div className="flex-shrink-0 alert__icon">{alertIcons[type]()}</div>
        <div className="ml-3">
          <h3 className="text-sm font-medium alert__title">{title}</h3>
          <div className="mt-2 text-sm alert__description">
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Alert;
