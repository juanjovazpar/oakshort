import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './Signin.css';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes';
import service from '../../services/auth.service';
import * as browserStorage from '../../utils/sessionStorage.util';

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
    } catch (e) {
      console.log(e);
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
      <input
        type="text"
        name="email"
        disabled={loading}
        required
        placeholder={t('SIGNIN_SECTION.EMAIL_PLACEHOLDER')}
      />
      <input
        type="text"
        name="password"
        disabled={loading}
        required
        placeholder={t('SIGNIN_SECTION.PASSWORD_PLACEHOLDER')}
      />
      {errorMsg && <p>{errorMsg}</p>}
      <button type="submit" disabled={loading}>
        {t('SIGNIN_SECTION.MAIN_BUTTON')}
      </button>
    </form>
  );
}
