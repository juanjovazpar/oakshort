import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './Forgotten.css';
import service from '../../services/auth.service';
import Input from '../../elements/Input/Input';
import Loading from '../../elements/Loading/Loading';
import FadeInOut from '../../animations/fadeinout';
import InputMessage from '../../elements/InputMessage/InputMessage';
import { isValidEmail } from '../../utils/email.util';

export default function Forgotten() {
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const verify = async (data: any) => {
    try {
      setLoading(true);
      setErrorMsg('');
      await service.forgotPassword(data);
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
    verify(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
  };

  return (
    <form onSubmit={handleSubmit} className="forgotten">
      <Input
        id="email"
        type="email"
        name="email"
        disabled={loading}
        validator={isValidEmail}
        onChange={handleInputChange}
        required
        placeholder={t('FORGOTTEN.EMAIL_PLACEHOLDER')}
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
