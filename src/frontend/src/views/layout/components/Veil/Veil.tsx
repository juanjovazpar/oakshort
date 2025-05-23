import React from 'react';
import { Link, Outlet, useLoaderData, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Veil.css';
import Short from '../../../../components/Short/Short';
import ROUTES from '../../../../router/routes';
import FadeInOut from '../../../../animations/fadeinout';
import { VEIL_COMPONENTS } from '../../../../router/router';
import { IShort } from '../../../../../../shared/interfaces/short.interface';

const Veil: React.FC = () => {
  const { shorts } = useLoaderData() as { shorts: IShort[] };
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <>
      <section className="veil-content">
        <FadeInOut isVisible duration={2}>
          <h2 className="font-thin">{t('VEIL_SECTION.TITLE_1')}</h2>
          <h2 className="font-thin">{t('VEIL_SECTION.TITLE_2')}</h2>
          <h1 className="mb-4 font-bold">{t('VEIL_SECTION.NAME')}</h1>

          <FadeInOut isVisible key={location.pathname} duration={1}>
            <Outlet />
          </FadeInOut>

          <div className="mt-3 veil-links">
            {VEIL_COMPONENTS.map(
              ({ path, label }, key) =>
                location.pathname !== path && (
                  <Link
                    key={key}
                    to={path}
                    className="opacity-80 hover:opacity-100 hover:underline transition-all duration-300 ease-in-out"
                  >
                    {t(label as string)}
                  </Link>
                )
            )}
          </div>
        </FadeInOut>
      </section>

      <FadeInOut
        isVisible={location.pathname === ROUTES.HOME && shorts?.length > 0}
        duration={1}
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

          {shorts?.slice(0, 3).map((item: IShort, i: number) => (
            <Link to={`${ROUTES.MAIN}/${item.short}`} key={i}>
              <Short short={item} simplified />
            </Link>
          ))}
        </section>
      </FadeInOut>
    </>
  );
};

export default Veil;
