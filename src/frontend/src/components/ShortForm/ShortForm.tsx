import React, { FormEvent, FormEventHandler, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

import './ShortForm.css';
import { IShort } from '../../../../shared/interfaces/short.interface';

interface ShortFormProps {
  short: IShort;
}

const ShortForm: React.FC<ShortFormProps> = ({ short }) => {
  const { t } = useTranslation();

  const handleRedirect: MouseEventHandler<HTMLButtonElement> = (
    e: FormEvent
  ): void => {
    e.preventDefault();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent
  ): void => {
    e.preventDefault();
  };

  return (
    <div>
      <h3>
        {t('SHORT_FORM.TITLE')}{' '}
        <span>
          <a href={short.target}>{short.target}</a>
        </span>
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="target">{t('SHORT_FORM.TARGET_INPUT_LABEL')}:</label>
        <input
          name="target"
          id="target"
          type="text"
          placeholder={t('SHORT_FORM.TARGET_INPUT_PLACEHOLDER')}
          value={short.target}
          required
        />
        <label htmlFor="target">
          {t('SHORT_FORM.TARGET_INPUT_LABEL')}
          <small>({t('GENERAL.OPTIONAL')})</small>:
        </label>
        <input
          name="target"
          id="target"
          type="text"
          placeholder={t('SHORT_FORM.TARGET_INPUT_PLACEHOLDER')}
          value={short.name}
        />
        <button type="submit">{t('SHORT_FORM.SAVE_BUTTON')}</button>
      </form>
    </div>
  );
};

export default ShortForm;
