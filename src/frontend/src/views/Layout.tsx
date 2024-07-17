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

function Layout() {
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
    <div className={`layout ${isCollapsed ? 'collapse' : ''}`}>
      <section className="hello-section collapse">
        <Hello onSubmit={onShowDashboard} />
      </section>

      <section className="main-section" onClick={onDashboardClick}>
        <Dashboard />

        <section
          onClick={onSidebarClick}
          className={`side-section ${isCollapsedSide ? 'collapsed-side' : ''}`}
        >
          <Sidebar onClose={onCloseSidebar} showCloseButton={isCollapsedSide} />
        </section>
      </section>
    </div>
  );
}

export default Layout;
