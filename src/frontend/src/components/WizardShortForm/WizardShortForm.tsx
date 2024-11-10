import React, { FormEvent, FormEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IShort } from '../../../../shared/interfaces/short.interface';
import Stepper, { StepperStep } from '../Stepper/Stepper';
import './WizardShortForm.css';

interface WizardShortFormProps {
  short: IShort;
}

const WizardShortForm: React.FC<WizardShortFormProps> = ({ short }) => {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState(short);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent
  ): void => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const steps: StepperStep[] = [
    {
      label: 'string1',
    },
    {
      label: 'string2',
    },
    {
      label: 'string3',
    },
  ];

  return (
    <section>
      <header>
        <Stepper steps={steps} activeStep={1} onClickStep={console.log} />
        <h3 className="pb-2 pt-4">
          {t('SHORT_FORM.TITLE')}
          <a
            className="float-right bg-yellow-100 text-yellow-800 text-sm font-medium px-5 py-1 rounded dark:bg-yellow-900 dark:text-yellow-300"
            target="_blank"
            rel="noreferrer"
            href={short.target}
          >
            {short.target}
          </a>
        </h3>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="py-2">
          <label htmlFor="target">{t('SHORT_FORM.TARGET_INPUT_LABEL')}:</label>
          <input
            name="target"
            id="target"
            type="text"
            placeholder={t('SHORT_FORM.TARGET_INPUT_PLACEHOLDER')}
            value={formValues.target}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="py-2">
          <label htmlFor="name">
            {t('SHORT_FORM.NAME_INPUT_LABEL')}
            <small>({t('GENERAL.OPTIONAL')})</small>:
          </label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder={t('SHORT_FORM.NAME_INPUT_PLACEHOLDER')}
            value={formValues.name}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="px-3 py-2 text-xs float-right font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {t('SHORT_FORM.SAVE_BUTTON')}
        </button>
      </form>
    </section>
  );
};

export default WizardShortForm;
