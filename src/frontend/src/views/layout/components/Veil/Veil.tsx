import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Veil.css';
import { VEIL_COMPONENTS } from '../../../../index';
import { SHORT_MOCKS } from '../../../../mocks/shorts.mocks';
import Short from '../../../../components/Short/Short';

const Veil: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <section className="veil-section">
      <section className="veil-content">
        <Outlet />
        <div className="veil-links">
          {VEIL_COMPONENTS.map(
            ({ path, label }, key) =>
              location.pathname !== path && (
                <Link key={key} to={path}>
                  {t(label as string)}
                </Link>
              )
          )}
        </div>
      </section>

      {SHORT_MOCKS?.length > 0 && (
        <section className="shorts-summary">
          <h3>{t('VEIL_SECTION.SHORTS_LIST.TITLE')}</h3>
          <p>{t('VEIL_SECTION.SHORTS_LIST.SUBTITLE')}</p>

          <div className="shorts-list">
            {SHORT_MOCKS.slice(0, 3).map((short) => (
              <Short short={short} key={short._id} />
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default Veil;
