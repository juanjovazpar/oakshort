import React, { useState, useEffect, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import './Layout.css';
import {
  toggleCollapseSide,
  toggleFloatingBox,
} from '../../store/layout/layout.slice';
import ShortForm from '../../components/ShortForm/ShortForm';
import ROUTES from '../../routes';
import { SHORT_MOCKS } from '../../mocks/shorts.mocks';

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
        <Outlet context="main" />

        {isFloatingBoxVisible && (
          <section className="floatingBox">
            <button onClick={onCloseFloatingBox}>X</button>
            <ShortForm short={SHORT_MOCKS[0]} />
          </section>
        )}

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
