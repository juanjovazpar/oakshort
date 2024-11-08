import React from 'react';
import Engagement from '../Engagement/Engagement';
import { useTranslation } from 'react-i18next';
import { IShort } from '../../../../shared/interfaces/short.interface';
import './Short.css';

interface ShortProps {
  short: IShort;
}

const Short: React.FC<ShortProps> = ({ short }) => {
  const { t } = useTranslation();
  const metrics = {};

  return (
    <section className="short-card">
      <header>
        <div>
          <button>{t('SHORT.CLIPBOARD_BUTTON')}</button>
        </div>
        <div>
          <button>{t('SHORT.COPY_BUTTON')}</button>
          <button>{t('SHORT.EDIT_BUTTON')}</button>
        </div>
      </header>
      <section>
        <h4>{short.name}</h4>
        <p>{short.short}</p>
        <p>{short.target}</p>
        <p>
          <span>{t('SHORT.VIEWS_COUNT', { count: short.accessCount })}</span>
          <span>{t('SHORT.LIMIT_COUNT', { count: short.accessLimit })}</span>
          <span>{t('SHORT.LAST_VIEW_DATE', { date: short.lastRead })}</span>
        </p>
      </section>
      <Engagement metrics={metrics} />
    </section>
  );
};

export default Short;
