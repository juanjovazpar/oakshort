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
    <section className="shorts-list">
      <div>
        <button>{t('FILTERS.FILTER_BY_CREATED_DATE')}</button>
        <button>{t('FILTERS.FILTER_BY_LABEL')}</button>
        <button>{t('FILTERS.FILTER_BY_EXPIRED')}</button>
      </div>
      <ul>
        {shorts.map((short: IShort, key: number) => (
          <li key={key}>
            <Short short={short} />
          </li>
        ))}
        <li>here are the filters</li>
      </ul>
    </section>
  );
};

export default ShortsList;
