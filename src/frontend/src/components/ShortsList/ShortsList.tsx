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
    <section>
      <div>
        <button>{t('FILTERS.FILTER_BY_CREATED_DATE')}</button>
        <button>{t('FILTERS.FILTER_BY_LABEL')}</button>
        <button>{t('FILTERS.FILTER_BY_EXPIRED')}</button>
      </div>
      {shorts.map((short: IShort, key: number) => (
        <Short short={short} key={key} />
      ))}
    </section>
  );
};

export default ShortsList;
