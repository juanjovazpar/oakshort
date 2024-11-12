import React from 'react';

export interface IPingProps {
  label?: string;
  children?: React.ReactNode;
  active?: boolean;
}

const Ping: React.FC<IPingProps> = ({ label, children, active = true }) => (
  <div className="relative inline-flex">
    {children}

    {active && (
      <span className="flex absolute -mt-2 -me-2 top-1 end-1">
        <span className="absolute inline-flex size-full rounded-full opacity-75 bg-red-500 animate-ping"></span>
        <span className="relative inline-flex rounded-full bg-red-500 size-3 color-white">
          {label}
        </span>
      </span>
    )}
  </div>
);

export default Ping;
