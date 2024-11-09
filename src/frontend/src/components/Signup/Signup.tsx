import React from 'react';
import { useTranslation } from 'react-i18next';

import './Signup.css';

export default function Signup() {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="signup">
      <input
        type="text"
        name="email"
        placeholder={t('SIGNUP_SECTION.EMAIL_PLACEHOLDER')}
      />
      <button type="submit">{t('SIGNUP_SECTION.MAIN_BUTTON')}</button>
    </form>
  );
}
