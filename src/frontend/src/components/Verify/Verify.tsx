import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ROUTES, { PARAMS } from '../../routes';
import service from '../../services/auth.service';
import './Verify.css';
import Input from '../../elements/Input/Input';
import Loading from '../../elements/Loading/Loading';
import InputMessage from '../../elements/InputMessage/InputMessage';
import FadeInOut from '../../animations/fadeinout';

export default function Verify() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [initialized, setInitialized] = useState(false);

  const verify = async (verificationToken?: string) => {
    try {
      const token =
        verificationToken ||
        (searchParams.get(PARAMS.VERIFICATION_TOKEN) as string);

      setLoading(true);
      setErrorMsg('');

      if (token) {
        await service.verify(token);
        navigate(ROUTES.SIGNIN);
      }
    } catch (e) {
      console.log(e);
      setErrorMsg(t('VERIFY.VERIFICATION_ERROR'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    e.preventDefault();
    verify(data.token as string);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
  };

  if (!initialized) {
    setInitialized(true);
    verify();
  }

  return (
    <form onSubmit={handleSubmit} className="verify-account">
      <Input
        id="token"
        type="text"
        name="token"
        disabled={loading}
        onChange={handleInputChange}
        required
        placeholder={t('VERIFY.TOKEN_PLACEHOLDER')}
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

      <FadeInOut isVisible={!!errorMsg}>
        {errorMsg && <InputMessage label={errorMsg} />}
      </FadeInOut>
    </form>
  );
}
