import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../../../routes';
import './Veil.css';

export interface VeilProps {}

const Veil: React.FC<VeilProps> = () => {
  const { t } = useTranslation();

  return (
    <section className="veil-section">
      <Outlet />

      <div>
        <Link to={ROUTES.HOME}>{t('VEIL_SECTION.CUTTER_LINK')}</Link>
        <Link to={ROUTES.SIGNIN}>{t('VEIL_SECTION.SIGNIN_LINK')}</Link>
        <Link to={ROUTES.SIGNUP}>{t('VEIL_SECTION.SIGNUP_LINK')}</Link>
        <Link to={ROUTES.FORGOTTEN}>{t('VEIL_SECTION.FORGOTTEN_LINK')}</Link>
      </div>
    </section>
  );
};

export default Veil;
