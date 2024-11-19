import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './Signin.css';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes';
import service from '../../services/auth.service';
import * as browserStorage from '../../utils/sessionStorage.util';
import Input from '../../elements/Input/Input';
import FadeInOut from '../../animations/fadeinout';
import Loading from '../../elements/Loading/Loading';
import InputMessage from '../../elements/InputMessage/InputMessage';
import { isValidEmail } from '../../utils/email.util';
import { isValidPassword } from '../../utils/password.util';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
  };

  return (
    <form onSubmit={handleSubmit} className="signin">
      <Input
        id="email"
        type="text"
        name="email"
        disabled={loading}
        error={errorMsg}
        onChange={handleInputChange}
        validator={isValidEmail}
        required
        placeholder={t('SIGNIN_SECTION.EMAIL_PLACEHOLDER')}
      />
      <Input
        id="password"
        type="password"
        name="password"
        disabled={loading}
        onChange={handleInputChange}
        validator={isValidPassword}
        required
        placeholder={t('SIGNIN_SECTION.PASSWORD_PLACEHOLDER')}
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
