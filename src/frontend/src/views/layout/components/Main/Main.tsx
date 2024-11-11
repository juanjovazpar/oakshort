import React from 'react';
import Dashboard from '../../../../components/Dashboard/Dashboard';
import ShortsList from '../../../../components/ShortsList/ShortsList';
import { SHORT_MOCKS } from '../../../../mocks/shorts.mocks';

import './Main.css';

export interface MainProps {}

const Main: React.FC<MainProps> = () => (
  <section className="main-content">
    <Dashboard />
    <ShortsList shorts={SHORT_MOCKS.slice(0, 1)} />
  </section>
);

export default Main;
