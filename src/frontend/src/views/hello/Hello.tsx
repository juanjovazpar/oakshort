import React, { FormEvent } from 'react';
import { useSelector } from 'react-redux';

import './Hello.css';
import { useTranslation } from 'react-i18next';

export interface HelloProps {
  onSubmit: Function;
}

const Hello: React.FC<HelloProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { isCollapsed } = useSelector((state: any) => state.layout);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <section className="hello-section">
      <form onSubmit={handleSubmit}>
        <input type="text" name="url" />
        <button type="submit">{t('HELLO_SECTION.MAIN_BUTTON')}</button>
      </form>
      {isCollapsed && (
        <>
          <a href="/">{t('LINKS.HELLO')}</a>
          <a href="/signin">{t('LINKS.SIGNIN')}</a>
          <a href="/signup">{t('LINKS.SIGNUP')}</a>
        </>
      )}
    </section>
  );
};

export default Hello;
