import React from 'react';
import './Dashboard.css';
import Engagement from '../../components/Engagement/Engagement';

const Dashboard: React.FC = () => {
  const metrics = {};

  return (
    <>
      <h1 className="text-3xl font-bold underline">DASHBOARD SECTION</h1>
      <Engagement metrics={metrics} />
    </>
  );
};

export default Dashboard;
