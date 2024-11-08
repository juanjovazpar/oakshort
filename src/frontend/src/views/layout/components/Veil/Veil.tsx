import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../../../routes';
import './Veil.css';
import { SHORT_MOCKS } from '../../../../mocks/shorts.mocks';
import Short from '../../../../components/Short/Short';

export interface VeilProps {}

const Veil: React.FC<VeilProps> = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <section className="veil-section">
      <Outlet />

      <div>
        {location.pathname !== ROUTES.HOME && (
          <Link to={ROUTES.HOME}>{t('VEIL_SECTION.CUTTER_LINK')}</Link>
        )}
        {location.pathname !== ROUTES.SIGNIN && (
          <Link to={ROUTES.SIGNIN}>{t('VEIL_SECTION.SIGNIN_LINK')}</Link>
        )}
        {location.pathname !== ROUTES.SIGNUP && (
          <Link to={ROUTES.SIGNUP}>{t('VEIL_SECTION.SIGNUP_LINK')}</Link>
        )}
        {location.pathname !== ROUTES.FORGOTTEN && (
          <Link to={ROUTES.FORGOTTEN}>{t('VEIL_SECTION.FORGOTTEN_LINK')}</Link>
        )}
      </div>

      {SHORT_MOCKS.length > 0 && (
        <div className="shorts-list">
          {SHORT_MOCKS.map((short) => (
            <Short short={short} key={short._id} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Veil;
