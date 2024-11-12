import React from 'react';
import { useTranslation } from 'react-i18next';
import './ShortsList.css';

import { IShort } from '../../../../shared/interfaces/short.interface';
import Short from '../Short/Short';

interface ShortsListProps {
  shorts: IShort[];
}

const ShortsList: React.FC<ShortsListProps> = ({ shorts }) => {
  const { t } = useTranslation();

  return (
    <section className="grid grid-cols-6 gap-4">
      <div>
        <p className="uppercase font-normal">{t('FILTERS.FILTER_BY_STATUS')}</p>
        <p>
          <button
            className="w-15 h-15 bg-gray-300 text-white rounded-full flex items-center justify-center transition duration-100 ease-in-out hover:bg-gray-400"
            type="button"
          >
            F
          </button>
          <button
            className="w-15 h-15 bg-gray-300 text-white rounded-full flex items-center justify-center transition duration-100 ease-in-out hover:bg-gray-400"
            type="button"
          >
            F
          </button>
          <button
            className="w-15 h-15 bg-gray-300 text-white rounded-full flex items-center justify-center transition duration-100 ease-in-out hover:bg-gray-400"
            type="button"
          >
            F
          </button>
        </p>
      </div>

      <div className="col-span-5">
        <p className="uppercase font-normal">{t('FILTERS.FILTER_BY_RANGE')}</p>
        <p>
          <button
            className="w-15 h-15 bg-gray-300 text-white rounded-full flex items-center justify-center transition duration-100 ease-in-out hover:bg-gray-400"
            type="button"
          >
            F
          </button>
        </p>
      </div>

      {shorts.slice(0, 4).map((short: IShort, key: number) => (
        <Short short={short} key={key} />
      ))}

      <div className="col-end-7 col-start-6">
        <p className="font-thin uppercase justify-normal">
          {t('FILTERS.TITLE')}
        </p>

        <span className="flex flex-row gap-2 mt-3">
          <button
            className="w-15 h-15 bg-gray-300 text-white rounded-full flex items-center justify-center transition duration-100 ease-in-out hover:bg-gray-400"
            type="button"
          >
            F
          </button>
          <button
            className="w-15 h-15 bg-gray-300 text-white rounded-full flex items-center justify-center transition duration-100 ease-in-out hover:bg-gray-400"
            type="button"
          >
            F
          </button>
          <button
            className="w-15 h-15 bg-gray-300 text-white rounded-full flex items-center justify-center transition duration-100 ease-in-out hover:bg-gray-400"
            type="button"
          >
            F
          </button>
        </span>
      </div>

      {shorts.slice(4).map((short: IShort, key: number) => (
        <Short short={short} key={key} />
      ))}
    </section>
  );
};

export default ShortsList;
