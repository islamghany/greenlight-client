import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';

interface ErrorProps {
  error?: string;
}
const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <Disclosure>
      {({}) => {
        return (
          <>
            <Transition
              show={error ? true : false}
              enter="transition-all  duration-300 ease-out"
              enterFrom="h-0 opacity-0"
              enterTo="h-full opacity-100"
              leave="transition-all duration-300 ease-out"
              leaveFrom="h-full opacity-100"
              leaveTo="h-0 opacity-0"
            >
              <Disclosure.Panel static>
                <p className="text-rose-500   text-xs mt-1">{error}</p>
              </Disclosure.Panel>
            </Transition>
          </>
        );
      }}
    </Disclosure>
  );
};
export default Error;
