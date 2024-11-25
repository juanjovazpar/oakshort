import React, { useState, useEffect, MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';
import './Layout.css';
import { setRecentlyCreatedShort } from '../../store/layout/layout.slice';
import ROUTES, { PARAMS } from '../../router/routes';
import ShortInput from '../../components/ShortInput/ShortInput';
import WizardShortForm from '../../components/WizardShortForm/WizardShortForm';
import FadeInOut from '../../animations/fadeinout';
import { VEIL_COMPONENTS } from '../../router/router';
import ShortForm from '../../components/ShortForm/ShortForm';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { [PARAMS.SHORT_ID]: short_id } = useParams();
  const dispatch: Function = useDispatch();
  const [isVeilActive, setIsVeilActive] = useState(true);
  const [isCollapsedSide, setIsCollapsedSide] = useState(false);
  const { recentlyCreatedShort } = useSelector((state: any) => state.layout);

  useEffect(() => {
    const veilRoutes = VEIL_COMPONENTS.map(({ path }) => path);
    setIsVeilActive(veilRoutes.includes(location.pathname));
    setIsCollapsedSide(!!short_id);
  }, [location, short_id]);

  const onDashboardClick: MouseEventHandler<HTMLElement> = (): void => {
    if (isCollapsedSide) {
      navigate(ROUTES.MAIN);
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

      <section
        className="main-section overflow-y-scroll"
        onClick={onDashboardClick}
      >
        {location.pathname.startsWith(ROUTES.MAIN) && <Outlet />}

        <FadeInOut isVisible={recentlyCreatedShort && !isCollapsedSide}>
          <section className="floatingbox">
            <button
              className="floatingbox-close-btn"
              onClick={onCloseFloatingBox}
            >
              X
            </button>
            <WizardShortForm short={recentlyCreatedShort} />
          </section>
        </FadeInOut>

        <section
          className={`side-section ${isCollapsedSide ? 'collapsed-side' : ''}`}
        >
          {location.pathname.startsWith(ROUTES.MAIN) && short_id && (
            <ShortForm />
          )}
        </section>
      </section>
    </section>
  );
};

export default Layout;
