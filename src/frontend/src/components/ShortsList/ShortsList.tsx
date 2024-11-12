import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ShortsList.css';

import { IShort } from '../../../../shared/interfaces/short.interface';
import Short from '../Short/Short';
import CheckDot from '../../elements/CheckDot/CheckDot';
import Range from '../../elements/Range/Range';

interface ShortsListProps {
  shorts: IShort[];
}

interface StatusFilters {
  accessCount: boolean;
  expires: boolean;
  protected: boolean;
}
interface MoreFilters {
  accessCount: boolean;
  expires: boolean;
  protected: false;
  bot: boolean;
}

const ShortsList: React.FC<ShortsListProps> = ({ shorts }) => {
  const { t } = useTranslation();
  const [statusFilters, setStatusFilters] = useState<StatusFilters>({
    accessCount: false,
    expires: false,
    protected: false,
  });
  const [moreFilters, setMoreFilters] = useState<MoreFilters>({
    accessCount: false,
    expires: false,
    protected: false,
    bot: false,
  });

  return (
    <section className="grid grid-cols-6 gap-4">
      <div>
        <p className="font-normal">{t('FILTERS.FILTER_BY_STATUS')}</p>
        <p className="flex flex-row gap-3 my-1">
          {Object.keys(statusFilters).map((key: string) => (
            <CheckDot
              key={key}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStatusFilters({ ...statusFilters, [key]: e.target.checked });
              }}
              checked={statusFilters[key as keyof StatusFilters]}
            />
          ))}
        </p>
      </div>

      <div className="col-span-5">
        <p className="font-normal">{t('FILTERS.FILTER_BY_RANGE')}</p>
        <p className="flex flex-row gap-3 my-1">
          <Range min={0} max={100} step={1} onChange={console.log} />
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
            {Object.keys(moreFilters).map((key: string) => (
              <CheckDot
                key={key}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMoreFilters({
                    ...moreFilters,
                    [key]: e.target.checked,
                  });
                }}
                checked={moreFilters[key as keyof MoreFilters]}
              />
            ))}
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
