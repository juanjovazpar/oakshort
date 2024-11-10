import React, { useState, useEffect, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import './Layout.css';
import { toggleCollapseSide } from '../../store/layout/layout.slice';
import { VEIL_COMPONENTS } from '../../index';
import ROUTES from '../../routes';
import ShortInput from '../../components/ShortInput/ShortInput';
import WizardShortForm from '../../components/WizardShortForm/WizardShortForm';
import FadeIn from '../../animations/fadein';

const Layout: React.FC = () => {
  const location = useLocation();
  const dispatch: Function = useDispatch();
  const [isVeilActive, setIsVeilActive] = useState(true);
  const [createdShort, setCreatedShort] = useState();
  const { isCollapsedSide } = useSelector((state: any) => state.layout);

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
    setCreatedShort(undefined);
  };

  const onNewShortCreated = (short: any) => {
    setCreatedShort(short);
  };

  return (
    <section className={`layout ${isVeilActive ? 'collapsed' : ''}`}>
      <header className="veil-section">
        {!location.pathname.startsWith(ROUTES.MAIN) && <Outlet />}

        {location.pathname.startsWith(ROUTES.MAIN) && (
          <div className="header-short-input">
            <ShortInput onCreation={onNewShortCreated} />
          </div>
        )}
      </header>

      <section className="main-section" onClick={onDashboardClick}>
        {location.pathname.startsWith(ROUTES.MAIN) && <Outlet />}

        {createdShort && !isCollapsedSide && (
          <FadeIn>
            <section className="floatingbox">
              <button
                className="floatingbox-close-btn"
                onClick={onCloseFloatingBox}
              >
                X
              </button>
              <WizardShortForm short={createdShort} />
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
