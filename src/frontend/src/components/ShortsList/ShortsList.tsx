import React from 'react';
import { useTranslation } from 'react-i18next';
import './ShortsList.css';

import { IShort } from '../../../../shared/interfaces/short.interface';
import Short from '../Short/Short';
import Button from '../../elements/Button/Button';

interface ShortsListProps {
  shorts: IShort[];
}

const ShortsList: React.FC<ShortsListProps> = ({ shorts }) => {
  const { t } = useTranslation();

  return (
    <section className="grid grid-cols-6 gap-4">
      <div>
        <p className="uppercase font-normal">{t('FILTERS.FILTER_BY_STATUS')}</p>
        <p className="flex flex-row gap-3 my-1">
          <Button label="f" onClick={console.log} />
          <Button label="f" />
          <Button label="f" />
        </p>
      </div>

      <div className="col-span-5">
        <p className="uppercase font-normal">{t('FILTERS.FILTER_BY_RANGE')}</p>
        <p className="flex flex-row gap-3 my-1">
          <Button label="f" />
        </p>
      </div>

      {shorts.slice(0, 4).map((short: IShort, key: number) => (
        <Short short={short} key={key} />
      ))}

      {shorts.length > 4 && (
        <div className="col-end-7 col-start-6">
          <p className="font-thin uppercase justify-normal">
            {t('FILTERS.TITLE')}
          </p>

          <span className="flex flex-row gap-2 mt-3">
            <Button label="f" />
            <Button label="f" />
            <Button label="f" />
          </span>
        </div>
      )}

      {shorts.slice(4).map((short: IShort, key: number) => (
        <Short short={short} key={key} />
      ))}
    </section>
  );
};

export default ShortsList;
