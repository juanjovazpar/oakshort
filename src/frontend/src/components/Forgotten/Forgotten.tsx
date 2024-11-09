import React from 'react';
import { useTranslation } from 'react-i18next';

import './Forgotten.css';

export default function Forgotten() {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="forgotten">
      <input
        type="text"
        name="email"
        placeholder={t('FORGOTTEN.EMAIL_PLACEHOLDER')}
      />
      <button type="submit">{t('FORGOTTEN.MAIN_BUTTON')}</button>
    </form>
  );
}
