import React from 'react';
import { IShort } from '../../../../shared/interfaces/short.interface';
import './Short.css';
import Ping from '../../elements/Ping/Ping';
import Loading from '../../elements/Loading/Loading';

interface ShortProps {
  short: IShort;
  loading?: boolean;
  disabled?: boolean;
  ping?: boolean;
  justCreated?: boolean;
}

const Short: React.FC<ShortProps> = ({
  short,
  loading = false,
  disabled = false,
  ping = false,
  justCreated,
}) => (
  <Ping active={ping}>
    {/* TODO: Add animation to all the status changes */}

    <section
      className={`short-card flex flex-col relative ${disabled && 'opacity-30'} ${justCreated && 'ring-4 ring-yellow-100 ring-opacity-50'} ${loading && 'border-pulse'}`}
    >
      <header
        className={`flex flex-row w-full ${loading && !disabled && 'opacity-30'}`}
      >
        <div className="w-1/2 flex justify-start">
          <div className="flex flex-col">
            <span className="text-xs font-semibold">1000 🔥</span>
            <span className="text-xs font-thin">visits</span>
          </div>
        </div>

        <div className="w-1/2 flex justify-end">
          <button className="w-7 h-7 ml-1 bg-gray-300 text-white rounded-full flex items-center justify-center transition duration-100 ease-in-out hover:bg-gray-400">
            <span className="text-lg font-semibold">+</span>
          </button>
          <button className="w-7 h-7 ml-1 bg-gray-300 text-white rounded-full flex items-center justify-center transition duration-100 ease-in-out hover:bg-gray-400">
            <span className="text-lg font-semibold">+</span>
          </button>
        </div>
      </header>

      <section className={`mt-auto ${loading && !disabled && 'opacity-30'}`}>
        <h4 className="text-xl font-black truncate">{short.name}</h4>
        <p className="text-sm font-medium truncate">{short.short}</p>
        <a
          href="short.target"
          target="_blank"
          rel="noreferrer"
          className="font-thin text-sm text-blue-500 transition duration-100 hover:underline hover:text-blue-700 truncate"
        >
          {short.target}
        </a>
      </section>
    </section>

    {loading && (
      <section className="absolute bottom-1 left-0 right-0 w-full">
        <Loading />
      </section>
    )}
  </Ping>
);

export default Short;
