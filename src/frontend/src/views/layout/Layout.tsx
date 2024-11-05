import React, { MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Layout.css';
import {
  toggleCollapse,
  toggleCollapseSide,
  toggleFloatingBox,
} from '../../store/layout/layout.slice';
import Dashboard from '../../components/Dashboard/Dashboard';
import Veil from './components/Veil/Veil';
import ShortsList from '../../components/ShortsList/ShortsList';
import ShortForm from '../../components/ShortForm/ShortForm';
import { IShort } from '../../../../shared/interfaces/short.interface';

const shorts: IShort[] = [
  {
    _id: '6693bf918dd280c4837b1ce1',
    name: 'SF Living Store - Summer sale',
    active: true,
    target: 'http://expires.com',
    accessCount: 3,
    deleted: false,
    expires: new Date('2024-07-14T14:09:00.973Z'),
    short: 'QO97YEF0_I',
    createdAt: new Date('2024-07-14T12:07:45.488Z'),
    updatedAt: new Date('2024-07-14T12:11:00.525Z'),
    lastRead: new Date('2024-07-14T12:11:00.524Z'),
    accessAttendsOverLimit: 0,
  },
  {
    _id: '6693bf918dd280c4837b1ce1',
    name: 'SF Living Store - Summer sale',
    active: true,
    target: 'http://expires.com',
    accessCount: 3,
    deleted: false,
    expires: new Date('2024-07-14T14:09:00.973Z'),
    short: 'QO97YEF0_I',
    createdAt: new Date('2024-07-14T12:07:45.488Z'),
    updatedAt: new Date('2024-07-14T12:11:00.525Z'),
    lastRead: new Date('2024-07-14T12:11:00.524Z'),
    accessAttendsOverLimit: 0,
  },
  {
    _id: '6693bf918dd280c4837b1ce1',
    name: 'SF Living Store - Summer sale',
    active: true,
    target: 'http://expires.com',
    accessCount: 3,
    deleted: false,
    expires: new Date('2024-07-14T14:09:00.973Z'),
    short: 'QO97YEF0_I',
    createdAt: new Date('2024-07-14T12:07:45.488Z'),
    updatedAt: new Date('2024-07-14T12:11:00.525Z'),
    lastRead: new Date('2024-07-14T12:11:00.524Z'),
    accessAttendsOverLimit: 0,
  },
];

const Layout: React.FC = () => {
  const dispatch: Function = useDispatch();
  const { isCollapsed, isCollapsedSide, isFloatingBoxVisible } = useSelector(
    (state: any) => state.layout
  );

  const onDashboardClick: MouseEventHandler<HTMLElement> = (): void => {
    if (isCollapsedSide) {
      dispatch(toggleCollapseSide());
    }
  };

  const onSidebarClick: MouseEventHandler<HTMLElement> = (e: any): void => {
    e.stopPropagation();

    if (!isCollapsedSide) {
      dispatch(toggleCollapseSide());
    }
  };

  const onShowDashboard: Function = (): void => {
    dispatch(toggleCollapse());
    if (isCollapsed) {
      dispatch(toggleFloatingBox());
    }
  };

  const onCloseSidebar: MouseEventHandler<HTMLButtonElement> = (): void => {
    if (isCollapsedSide) {
      dispatch(toggleCollapseSide());
    }
  };

  const onCloseFloatingBox: MouseEventHandler<HTMLButtonElement> = (): void => {
    dispatch(toggleFloatingBox());
  };

  return (
    <section className={`layout ${isCollapsed ? 'collapsed' : ''}`}>
      <header className="veil-section collapsed">
        <Veil onSubmit={onShowDashboard} />
      </header>
      <section className="main-section" onClick={onDashboardClick}>
        {isFloatingBoxVisible && (
          <section className="floatingBox">
            <button onClick={onCloseFloatingBox}>X</button>
            <ShortForm short={shorts[0]} />
          </section>
        )}

        <Dashboard />

        <section
          className={`side-section ${isCollapsedSide ? 'collapsed-side' : ''}`}
          onClick={onSidebarClick}
        >
          {isCollapsedSide && (
            <>
              <button onClick={onCloseSidebar}>X</button>
              <ShortsList shorts={shorts} />
            </>
          )}
        </section>
      </section>
    </section>
  );
};

export default Layout;
