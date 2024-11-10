import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import ROUTES from '../../routes';

import './ShortInput.css';
import service from '../../services/shorts.service';
import Shake from '../../animations/shake';
import { setRecentlyCreatedShort } from '../../store/layout/layout.slice';
import { useDispatch } from 'react-redux';

const ShortInput = () => {
  const { t } = useTranslation();
  const dispatch: Function = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const createShort = async (short: any) => {
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await service.createShort(short);

      // TODO: Simplify payload response
      dispatch(setRecentlyCreatedShort(response.data.payload));

      if (!location.pathname.startsWith(ROUTES.MAIN)) {
        navigate(ROUTES.MAIN);
      }
    } catch (e) {
      console.log(e);
      setErrorMsg(t('SHORT_INPUT.CREATION_ERROR'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    e.preventDefault();
    createShort(data);
  };

  return (
    <form onSubmit={handleSubmit} className="short-input" autoComplete="off">
      <Shake shaking={!!errorMsg}>
        <>
          <input
            id="target"
            name="target"
            type="text"
            placeholder={t('SHORT_INPUT.TARGET_INPUT_PLACEHOLDER')}
            disabled={loading}
            required
          />
          <button type="submit" disabled={loading}>
            {t('SHORT_INPUT.MAIN_BUTTON')}
          </button>
        </>
      </Shake>
    </form>
  );
};

export default ShortInput;
