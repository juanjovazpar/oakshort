import React from 'react';
import { useTranslation } from 'react-i18next';

import './Dashboard.css';
import Engagement from '../../components/Engagement/Engagement';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const metrics = {};

  return (
    <>
      <h1 className="text-3xl font-bold underline">{t('DASHBOARD.TITLE')}</h1>
      <Engagement metrics={metrics} />
    </>
  );
};

export default Dashboard;
