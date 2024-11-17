import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './Signin.css';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes';
import service from '../../services/auth.service';
import * as browserStorage from '../../utils/sessionStorage.util';
import Shake from '../../animations/shake';
import Input from '../../elements/Input/Input';

export default function Signin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = async (user: any) => {
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await service.signIn(user);
      browserStorage.setAuthToken(response.data.token);
      navigate(ROUTES.MAIN);
    } catch (e: any) {
      console.log(e);
      setErrorMsg(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    e.preventDefault();
    signIn(data);
  };

  return (
    <form onSubmit={handleSubmit} className="signin">
      <Input
        type="text"
        name="email"
        disabled={loading}
        error={errorMsg}
        required
        placeholder={t('SIGNIN_SECTION.EMAIL_PLACEHOLDER')}
      />
      <Input
        type="password"
        name="password"
        disabled={loading}
        required
        placeholder={t('SIGNIN_SECTION.PASSWORD_PLACEHOLDER')}
      />

      {errorMsg && <p>{errorMsg}</p>}

      <Shake shaking={!!errorMsg}>
        <button type="submit" disabled={loading}>
          {t('SIGNIN_SECTION.MAIN_BUTTON')}
        </button>
      </Shake>
    </form>
  );
}
