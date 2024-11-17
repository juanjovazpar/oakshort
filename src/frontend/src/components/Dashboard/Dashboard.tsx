import React from 'react';
import { useTranslation } from 'react-i18next';
import './Dashboard.css';
import Engagement from '../Engagement/Engagement';
import HorizontalBarsChart from '../../elements/HorizontalBarsChart/HorizontalBarsChart';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const metrics = {};

  return (
    <section>
      <h1 className="text-3xl font-bold underline">{t('DASHBOARD.TITLE')}</h1>
      <section className="bg-white rounded-lg py-4 px-6 my-5 grid grid-cols-2 gap-4">
        <HorizontalBarsChart />
      </section>
      <section className="grid grid-cols-6 gap-4 my-5">
        <Engagement className="col-span-2" metrics={metrics} />
        <Engagement className="col-span-2" metrics={metrics} />
        <Engagement className="col-span-2" metrics={metrics} />
      </section>
    </section>
  );
};

export default Dashboard;
