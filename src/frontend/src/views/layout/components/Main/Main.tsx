import React from 'react';
import { Outlet } from 'react-router-dom';

export interface MainProps {}

const Main: React.FC<MainProps> = () => {
  return (
    <section className="main-section">
      MAIN
      <Outlet />
    </section>
  );
};

export default Main;
