import React from 'react';
import { useTranslation } from 'react-i18next';

import './Signup.css';

export default function Signup() {
  const { t } = useTranslation();

  return (
    <form>
      <input type="text" name="email" />
      <input type="text" name="password" />
      <button type="submit">{t('SIGNUP_SECTION.MAIN_BUTTON')}</button>
    </form>
  );
}
