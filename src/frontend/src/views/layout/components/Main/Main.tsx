import React from 'react';
import { Outlet } from 'react-router-dom';

export interface MainProps {}

const Main: React.FC<MainProps> = () => (
  <section className="main-section">
    <Outlet />
  </section>
);

export default Main;
