import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import ROUTES from '../../routes';

import './ShortInput.css';
import service from '../../services/shorts.service';
import { setRecentlyCreatedShort } from '../../store/layout/layout.slice';
import { useDispatch } from 'react-redux';
import Input from '../../elements/Input/Input';
import { isValidURL } from '../../utils/url.util';
import Loading from '../../elements/Loading/Loading';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Input
        id="target"
        name="target"
        type="text"
        error={errorMsg}
        placeholder={t('SHORT_INPUT.TARGET_INPUT_PLACEHOLDER')}
        loading={loading}
        validator={isValidURL}
        onChange={handleInputChange}
        required
      >
        <button
          type="submit"
          disabled={loading}
          className="
          absolute
          right-2.5
          inset-y-2
          aspect-square
        text-white
          px-6
          py-5
          rounded-full
          text-3xl
          font-thin
          capitalize
        hover:bg-gray-700
          transition-all
          duration-300
          ease-in-out
          bg-gray-600
          "
        >
          {loading && <Loading />}
        </button>
      </Input>
    </form>
  );
};

export default ShortInput;
