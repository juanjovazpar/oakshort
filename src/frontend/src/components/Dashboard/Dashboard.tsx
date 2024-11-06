import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Engagement from '../Engagement/Engagement';
import ROUTES from '../../routes';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const metrics = {};

  return (
    <section>
      <h1 className="text-3xl font-bold underline">{t('DASHBOARD.TITLE')}</h1>
      <Engagement metrics={metrics} />
      <Link to={ROUTES.HOME}>{t('VEIL_SECTION.CUTTER_LINK')}</Link>
    </section>
  );
};

export default Dashboard;
