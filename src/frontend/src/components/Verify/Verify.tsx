import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ROUTES, { PARAMS } from '../../routes';
import service from '../../services/auth.service';
import './Verify.css';

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

      await service.verify(token);

      navigate(ROUTES.SIGNIN);
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

  if (!initialized) {
    setInitialized(true);
    verify();
  }

  return !loading ? (
    <form onSubmit={handleSubmit} className="verify-account">
      <input
        type="text"
        name="token"
        disabled={loading}
        required
        placeholder={t('VERIFY.TOKEN_PLACEHOLDER')}
      />
      {errorMsg && <p>{errorMsg}</p>}
      <button type="submit" disabled={loading}>
        {t('VERIFY.MAIN_BUTTON')}
      </button>
    </form>
  ) : (
    <p>Loading</p>
  );
}
