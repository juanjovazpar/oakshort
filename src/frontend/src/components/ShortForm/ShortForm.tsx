import React, { FormEvent, FormEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './ShortForm.css';
import { IShort } from '../../../../shared/interfaces/short.interface';
import Input from '../../elements/Input/Input';
import { useLoaderData } from 'react-router-dom';

interface IShortFormProps {
  short?: IShort;
}

const ShortForm: React.FC<IShortFormProps> = ({ short }) => {
  const { t } = useTranslation();
  const loadedShort: IShort = useLoaderData() as IShort;
  const item: IShort | undefined = loadedShort ?? short;
  const [formValues, setFormValues] = useState(item);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent
  ): void => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues({
      ...(formValues ?? {}),
      [name]: value,
    });
  };

  return (
    <div>
      <h3>
        {t('SHORT_FORM.TITLE')}{' '}
        <span>
          <a href={item?.target}>{item?.target}</a>
        </span>
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="target">{t('SHORT_FORM.TARGET_INPUT_LABEL')}:</label>
        <Input
          name="target"
          id="target"
          type="text"
          placeholder={t('SHORT_FORM.TARGET_INPUT_PLACEHOLDER')}
          value={formValues?.target}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="name">
          {t('SHORT_FORM.NAME_INPUT_LABEL')}
          <small>({t('GENERAL.OPTIONAL')})</small>:
        </label>
        <Input
          name="name"
          id="name"
          type="text"
          placeholder={t('SHORT_FORM.NAME_INPUT_PLACEHOLDER')}
          value={formValues?.name}
          onChange={handleInputChange}
        />
        <button type="submit">{t('SHORT_FORM.SAVE_BUTTON')}</button>
      </form>
    </div>
  );
};

export default ShortForm;
