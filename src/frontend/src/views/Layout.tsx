import React, { useState } from 'react';

import './Layout.css';
import Hello from './hello/Hello';
import Dashboard from './dashboard/Dashboard';
import Sidebar from './sidebar/Sidebar';

function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isCollapsedSide, setIsCollapsedSide] = useState(false);

  return (
    <div className={`layout ${isCollapsed ? 'collapse' : ''}`}>
      <section className="hello-section collapse">
        <Hello />
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? 'Expand' : 'Collapse'}
        </button>
        <button onClick={() => setIsCollapsedSide(!isCollapsedSide)}>
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
