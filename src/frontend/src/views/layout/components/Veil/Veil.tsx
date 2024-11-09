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
    <>
      <section className="veil-content">
        <h2>{t('VEIL_SECTION.TITLE_1')}</h2>
        <h2>{t('VEIL_SECTION.TITLE_2')}</h2>
        <h1>{t('VEIL_SECTION.NAME')}</h1>

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

      {/* {SHORT_MOCKS?.length > 0 && (
        <section className="shorts-summary">
          <h3>{t('VEIL_SECTION.SHORTS_LIST.TITLE')}</h3>
          <h4>{t('VEIL_SECTION.SHORTS_LIST.SUBTITLE')}</h4>

          <div className="shorts-list">
            {SHORT_MOCKS.slice(0, 3).map((short) => (
              <Short short={short} key={short._id} />
            ))}
          </div>
        </section>
      )} */}
    </>
  );
};

export default Veil;
