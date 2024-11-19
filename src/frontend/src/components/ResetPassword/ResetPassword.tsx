import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './ResetPassword.css';
import service from '../../services/auth.service';
import ROUTES, { PARAMS } from '../../routes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../../elements/Input/Input';
import FadeInOut from '../../animations/fadeinout';
import Loading from '../../elements/Loading/Loading';
import InputMessage from '../../elements/InputMessage/InputMessage';
import { isValidPassword } from '../../utils/password.util';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
  };

  return (
    <form onSubmit={handleSubmit} className="reset-password">
      <Input
        id="password"
        type="text"
        name="password"
        disabled={loading}
        onChange={handleInputChange}
        validator={isValidPassword}
        required
        placeholder={t('RESET_PASSWORD.PASSWORD_PLACEHOLDER')}
      />
      <Input
        id="passwordConfirmation"
        type="text"
        name="passwordConfirmation"
        disabled={loading}
        onChange={handleInputChange}
        validator={isValidPassword}
        required
        placeholder={t('RESET_PASSWORD.PASSWORD_CONFIRMATION_PLACEHOLDER')}
      >
        <button
          type="submit"
          disabled={loading}
          className="absolute
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

      <FadeInOut isVisible={!!errorMsg}>
        {errorMsg && <InputMessage label={errorMsg} />}
      </FadeInOut>
    </form>
  );
}
