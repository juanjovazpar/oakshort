import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './Forgotten.css';
import service from '../../services/auth.service';
import Input from '../../elements/Input/Input';

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

  return (
    <form onSubmit={handleSubmit} className="forgotten">
      <Input
        type="text"
        name="email"
        disabled={loading}
        required
        placeholder={t('FORGOTTEN.EMAIL_PLACEHOLDER')}
      />
      {errorMsg && <p>{errorMsg}</p>}
      <button type="submit" disabled={loading}>
        {t('FORGOTTEN.MAIN_BUTTON')}
      </button>
    </form>
  );
}
