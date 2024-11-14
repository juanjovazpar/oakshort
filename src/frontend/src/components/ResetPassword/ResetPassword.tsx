import React from 'react';
import { useTranslation } from 'react-i18next';

import './ResetPassword.css';

export default function ResetPassword() {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="reset-password">
      <input
        type="text"
        name="password"
        placeholder={t('RESET_PASSWORD.PASSWORD_PLACEHOLDER')}
      />
      <input
        type="text"
        name="passwordConfirmation"
        placeholder={t('RESET_PASSWORD.PASSWORD_CONFIRMATION_PLACEHOLDER')}
      />
      <button type="submit">{t('RESET_PASSWORD.MAIN_BUTTON')}</button>
    </form>
  );
}
