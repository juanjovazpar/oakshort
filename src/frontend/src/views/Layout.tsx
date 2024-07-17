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

  return (
    <div className={`layout ${isCollapsed ? 'collapse' : ''}`}>
      <section className="hello-section collapse">
        <Hello />
        <button onClick={() => dispatch(toggleCollapse())}>
          {isCollapsed ? 'Expand' : 'Collapse'}
        </button>
        <button onClick={() => dispatch(toggleCollapseSide())}>
          {isCollapsedSide ? 'Expand Side' : 'Collapse Side'}
        </button>
      </section>

      <section className="main-section">
        <Dashboard />

        <section
          className={`side-section ${isCollapsedSide ? 'collapsed-side' : ''}`}
        >
          <Sidebar />
        </section>
      </section>
    </div>
  );
}

export default Layout;
