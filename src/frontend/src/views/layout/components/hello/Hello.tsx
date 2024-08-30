import React, { FormEvent, FormEventHandler } from 'react';
import { useSelector } from 'react-redux';

import './Hello.css';
import { useTranslation } from 'react-i18next';
import { ILayoutState } from '../../../../store/layout/layout.slice';

export interface HelloProps {
  onSubmit: Function;
}

const Hello: React.FC<HelloProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { isCollapsed } = useSelector(
    (state: any): ILayoutState => state.layout
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent
  ): void => {
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
