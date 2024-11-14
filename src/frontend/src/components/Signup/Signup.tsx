import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Signup.css';
import service from '../../services/auth.service';
import ROUTES from '../../routes';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const createUser = async (user: any) => {
    setLoading(true);
    setErrorMsg('');

    try {
      await service.signup(user);

      navigate(ROUTES.VERIFY);
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
    createUser(data);
  };

  return (
    <form onSubmit={handleSubmit} className="signup" autoComplete="off">
      <input
        type="text"
        name="email"
        disabled={loading}
        placeholder={t('SIGNUP_SECTION.EMAIL_PLACEHOLDER')}
      />
      <input
        type="text"
        name="password"
        disabled={loading}
        placeholder={t('SIGNUP_SECTION.PASSWORD_PLACEHOLDER')}
      />
      {errorMsg && <p>{errorMsg}</p>}
      <button type="submit" disabled={loading}>
        {t('SIGNUP_SECTION.MAIN_BUTTON')}
      </button>
    </form>
  );
}
