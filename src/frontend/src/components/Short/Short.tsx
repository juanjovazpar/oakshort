import React from 'react';
import { IShort } from '../../../../shared/interfaces/short.interface';
import './Short.css';
import Loading from '../../elements/Loading/Loading';
import Input from '../../elements/Input/Input';

interface IShortProps {
  short: IShort;
  loading?: boolean;
  disabled?: boolean;
  ping?: boolean;
  justCreated?: boolean;
  simplified?: boolean;
}

const Short: React.FC<IShortProps> = ({
  short,
  loading = false,
  disabled = false,
  ping = false,
  simplified = false,
  justCreated,
}) => (
  <section>
    {/* TODO: Add animation to all the status changes */}
    <div
      className={`short-card aspect-square flex flex-col cursor-pointer ${disabled && 'opacity-30'} ${justCreated && 'ring-4 ring-yellow-100 ring-opacity-50'} ${loading && 'border-pulse'}`}
    >
      {!simplified && (
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
      )}

      <section className={`mt-auto ${loading && !disabled && 'opacity-30'}`}>
        <h4 className="text-xl font-black truncate">{short.name}</h4>
        <p className="text-sm font-medium truncate">{short.short}</p>
        <span className="font-thin text-sm text-blue-500 transition duration-100 hover:underline hover:text-blue-700 truncate">
          {short.target}
        </span>

        {!simplified && short.protected && (
          <div className="relative mt-1">
            <Input
              id="target"
              className="w-full h-7 border-2"
              name="target"
              type="text"
              placeholder="********"
              disabled={true}
            />
            <button
              className="absolute right-1 top-1 w-5 h-5 bg-gray-300 text-white rounded-full flex items-center justify-center transition duration-100 ease-in-out hover:bg-gray-400"
              type="submit"
              disabled={loading}
            >
              +
            </button>
          </div>
        )}
      </section>
    </div>

    {loading && (
      <section className="absolute bottom-1 left-0 right-0 w-full">
        <Loading />
      </section>
    )}
  </section>
);

export default Short;
