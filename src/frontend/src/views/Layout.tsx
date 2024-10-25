import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Layout.css';
import Hello from './hello/Hello';
import Dashboard from './dashboard/Dashboard';
import Sidebar from './sidebar/Sidebar';
import {
  toggleCollapse,
  toggleCollapseSide,
} from '../store/layout/layout.slice';

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector((state: any) => state.layout.isCollapsed);
  const isCollapsedSide = useSelector(
    (state: any) => state.layout.isCollapsedSide
  );

  const onDashboardClick = () => {
    if (isCollapsedSide) {
      dispatch(toggleCollapseSide());
    }
  };

  const onSidebarClick = (e: any) => {
    e.stopPropagation();

    if (!isCollapsedSide) {
      dispatch(toggleCollapseSide());
    }
  };

  const onShowDashboard = () => {
    dispatch(toggleCollapse());
  };

  const onCloseSidebar = () => {
    if (isCollapsedSide) {
      dispatch(toggleCollapseSide());
    }
  };

  return (
    <section className={`layout ${isCollapsed ? 'collapsed' : ''}`}>
      <header className="hello-section collapsed">
        <Hello onSubmit={onShowDashboard} />
      </header>
      <section className="main-section" onClick={onDashboardClick}>
        <Dashboard />

        <section
          onClick={onSidebarClick}
          className={`side-section ${isCollapsedSide ? 'collapsed-side' : ''}`}
        >
          <Sidebar onClose={onCloseSidebar} isCollapsed={isCollapsedSide} />
        </section>
      </section>
    </section>
  );
};

export default Layout;
