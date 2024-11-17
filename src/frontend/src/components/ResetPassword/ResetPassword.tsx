import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './ResetPassword.css';
import service from '../../services/auth.service';
import ROUTES, { PARAMS } from '../../routes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../../elements/Input/Input';

export default function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const resetPassword = async (data: any) => {
    try {
      const token = searchParams.get(PARAMS.RESET_TOKEN) as string;

      setLoading(true);
      setErrorMsg('');

      await service.resetPassword(token, { password: data.password });

      navigate(ROUTES.SIGNIN);
    } catch (e) {
      console.log(e);
      setErrorMsg(t('RESET_PASSWORD.ERROR_MESSAGE'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    e.preventDefault();
    resetPassword(data);
  };

  return (
    <form onSubmit={handleSubmit} className="reset-password">
      <Input
        type="text"
        name="password"
        disabled={loading}
        required
        placeholder={t('RESET_PASSWORD.PASSWORD_PLACEHOLDER')}
      />
      <Input
        type="text"
        name="passwordConfirmation"
        disabled={loading}
        required
        placeholder={t('RESET_PASSWORD.PASSWORD_CONFIRMATION_PLACEHOLDER')}
      />
      {errorMsg && <p>{errorMsg}</p>}
      <button type="submit" disabled={loading}>
        {t('RESET_PASSWORD.MAIN_BUTTON')}
      </button>
    </form>
  );
}
