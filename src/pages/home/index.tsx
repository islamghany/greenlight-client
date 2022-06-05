import React from 'react';
import { Popover, Transition } from '@headlessui/react';
import Button from '@/components/Button';
export default function Home() {
  return (
    <div>
      <Popover as="button" className="relative">
        <Popover.Button>
          <Button>Solution</Button>
        </Popover.Button>
        <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-10 opacity-0"
        >
          <Popover.Panel className="absolute z-10">
            <div className="flex flex-col items-start p-4 space-y-3 bg-gray-700 text-white">
              <a href="/analytics">Analytics</a>
              <a href="/engagement">Engagement</a>
              <a href="/security">Security</a>
              <a href="/integrations">Integrations</a>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
