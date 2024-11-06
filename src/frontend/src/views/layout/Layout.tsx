import React, { useState, useEffect, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import './Layout.css';
import {
  toggleCollapseSide,
  toggleFloatingBox,
} from '../../store/layout/layout.slice';
import ShortForm from '../../components/ShortForm/ShortForm';
import { IShort } from '../../../../shared/interfaces/short.interface';
import ROUTES from '../../routes';

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
  const location = useLocation();
  const dispatch: Function = useDispatch();
  const [isVeilActive, setIsVeilActive] = useState(true);
  const { isCollapsedSide, isFloatingBoxVisible } = useSelector(
    (state: any) => state.layout
  );

  useEffect(() => {
    const veilRoutes = [
      ROUTES.HOME,
      ROUTES.SIGNIN,
      ROUTES.SIGNUP,
      ROUTES.FORGOTTEN,
    ];
    setIsVeilActive(veilRoutes.includes(location.pathname));
  }, [location]);

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

  /* const onShowDashboard: Function = (): void => {
    dispatch(toggleCollapse());
    if (isVeilActive) {
      dispatch(toggleFloatingBox());
    }
  }; 

  const onCloseSidebar: MouseEventHandler<HTMLButtonElement> = (): void => {
    if (isCollapsedSide) {
      dispatch(toggleCollapseSide());
    }
  };*/

  const onCloseFloatingBox: MouseEventHandler<HTMLButtonElement> = (): void => {
    dispatch(toggleFloatingBox());
  };

  return (
    <section className={`layout ${isVeilActive ? 'collapsed' : ''}`}>
      <header className="veil-section collapsed">
        <Outlet context="veil" />
      </header>
      <section className="main-section" onClick={onDashboardClick}>
        {isFloatingBoxVisible && (
          <section className="floatingBox">
            <button onClick={onCloseFloatingBox}>X</button>
            <ShortForm short={shorts[0]} />
          </section>
        )}

        <Outlet context="main" />

        <section
          className={`side-section ${isCollapsedSide ? 'collapsed-side' : ''}`}
          onClick={onSidebarClick}
        >
          {/*
              {isCollapsedSide && (
                <>
                  <button onClick={onCloseSidebar}>X</button>
                  <ShortsList shorts={shorts} />
                </>
              )} 
            */}
        </section>
      </section>
    </section>
  );
};

export default Layout;
