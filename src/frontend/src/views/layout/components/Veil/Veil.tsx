import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Veil.css';
import { VEIL_COMPONENTS } from '../../../../index';
import { SHORT_MOCKS } from '../../../../mocks/shorts.mocks';
import Short from '../../../../components/Short/Short';
import ROUTES from '../../../../routes';
import FadeInOut from '../../../../animations/fadeinout';

const Veil: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <>
      <section className="veil-content">
        <h2 className="font-thin">{t('VEIL_SECTION.TITLE_1')}</h2>
        <h2 className="font-thin">{t('VEIL_SECTION.TITLE_2')}</h2>
        <h1 className="mb-4 font-bold">{t('VEIL_SECTION.NAME')}</h1>

        <Outlet />

        <div className="mt-3 veil-links">
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

      <FadeInOut
        isVisible={location.pathname === ROUTES.HOME && SHORT_MOCKS?.length > 0}
      >
        <section className="shorts-summary grid grid-cols-3 gap-2">
          <div className="col-span-3">
            <h3 className="text-sm font-thin">
              {t('VEIL_SECTION.SHORTS_LIST.TITLE')}
            </h3>
            <h3 className="text-sm font-bold">
              {t('VEIL_SECTION.SHORTS_LIST.SUBTITLE')}
            </h3>
          </div>

          {SHORT_MOCKS.slice(0, 3).map((short) => (
            <Short short={short} key={short._id} simplified />
          ))}
        </section>
      </FadeInOut>
    </>
  );
};

export default Veil;