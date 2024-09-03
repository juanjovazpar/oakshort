import React, { FormEvent, FormEventHandler, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import './Hello.css';
import { useTranslation } from 'react-i18next';
import { ILayoutState } from '../../../../store/layout/layout.slice';
import ROUTES from '../../../../routes';

export interface HelloProps {
  onSubmit: Function;
}

const Hello: React.FC<HelloProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { isCollapsed } = useSelector(
    (state: any): ILayoutState => state.layout
  );
  const [formValues, setFormValues] = useState({ url: '' });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent
  ): void => {
    e.preventDefault();
    onSubmit();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <section className="hello-section">
      <form onSubmit={handleSubmit}>
        <input
          id="url"
          name="url"
          type="text"
          placeholder={t('HELLO_SECTION.TARGET_INPUT_PLACEHOLDER')}
          value={formValues.url}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{t('HELLO_SECTION.MAIN_BUTTON')}</button>
      </form>
      {isCollapsed && (
        <>
          {/* <nav>
            <Link to={ROUTES.SIGNIN}>{t('LINKS.SIGNIN')}</Link>
            <Link to={ROUTES.SIGNUP}>{t('LINKS.SIGNUP')}</Link>
          </nav>
          <Outlet /> */}
        </>
      )}
    </section>
  );
};

export default Hello;
