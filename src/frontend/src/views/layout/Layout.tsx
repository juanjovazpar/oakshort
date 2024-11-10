import React, { useState, useEffect, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import './Layout.css';
import {
  toggleCollapseSide,
  setRecentlyCreatedShort,
} from '../../store/layout/layout.slice';
import { VEIL_COMPONENTS } from '../../index';
import ROUTES from '../../routes';
import ShortInput from '../../components/ShortInput/ShortInput';
import WizardShortForm from '../../components/WizardShortForm/WizardShortForm';
import FadeIn from '../../animations/fadein';

const Layout: React.FC = () => {
  const location = useLocation();
  const dispatch: Function = useDispatch();
  const [isVeilActive, setIsVeilActive] = useState(true);
  const { isCollapsedSide, recentlyCreatedShort } = useSelector(
    (state: any) => state.layout
  );

  useEffect(() => {
    const veilRoutes = VEIL_COMPONENTS.map(({ path }) => path);
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

  const onCloseFloatingBox: MouseEventHandler<HTMLButtonElement> = (): void => {
    dispatch(setRecentlyCreatedShort(undefined));
  };

  return (
    <section className={`layout ${isVeilActive ? 'collapsed' : ''}`}>
      <header className="veil-section">
        {!location.pathname.startsWith(ROUTES.MAIN) && <Outlet />}

        {location.pathname.startsWith(ROUTES.MAIN) && (
          <div className="header-short-input">
            <ShortInput />
          </div>
        )}
      </header>

      <section className="main-section" onClick={onDashboardClick}>
        {location.pathname.startsWith(ROUTES.MAIN) && <Outlet />}

        {recentlyCreatedShort && !isCollapsedSide && (
          <FadeIn>
            <section className="floatingbox">
              <button
                className="floatingbox-close-btn"
                onClick={onCloseFloatingBox}
              >
                X
              </button>
              <WizardShortForm short={recentlyCreatedShort} />
            </section>
          </FadeIn>
        )}

        <section
          className={`side-section ${isCollapsedSide ? 'collapsed-side' : ''}`}
          onClick={onSidebarClick}
        >
          {location.pathname.startsWith(ROUTES.SHORT_DETAILS) && <Outlet />}
        </section>
      </section>
    </section>
  );
};

export default Layout;
