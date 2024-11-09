import React from 'react';
import { useTranslation } from 'react-i18next';

import './Signin.css';

export default function Signin() {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="signin">
      <input
        type="text"
        name="email"
        placeholder={t('SIGNIN_SECTION.EMAIL_PLACEHOLDER')}
      />
      <input
        type="text"
        name="password"
        placeholder={t('SIGNIN_SECTION.PASSWORD_PLACEHOLDER')}
      />
      <button type="submit">{t('SIGNIN_SECTION.MAIN_BUTTON')}</button>
    </form>
  );
}
