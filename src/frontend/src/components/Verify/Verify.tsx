import React from 'react';
import { useTranslation } from 'react-i18next';

import './Verify.css';

export default function Verify() {
  const { t } = useTranslation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="verificationToken"
        placeholder={t('VERIFY.TOKEN_PLACEHOLDER')}
      />
      <button type="submit">{t('VERIFY.MAIN_BUTTON')}</button>
    </form>
  );
}
