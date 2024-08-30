import React from 'react';
import { useTranslation } from 'react-i18next';

import './Signin.css';

export default function Signin() {
  const { t } = useTranslation();

  return (
    <form>
      <input type="text" name="email" />
      <input type="text" name="password" />
      <button type="submit">{t('SIGNIN_SECTION.MAIN_BUTTON')}</button>
    </form>
  );
}
