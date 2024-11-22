import React, {
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { IShort } from '../../../../shared/interfaces/short.interface';
import Stepper, { IStepperStep } from '../Stepper/Stepper';
import './WizardShortForm.css';
import FadeInOut from '../../animations/fadeinout';

interface IWizardShortFormProps {
  short: IShort;
}

const WizardShortForm: React.FC<IWizardShortFormProps> = ({ short }) => {
  const maxStepIndex = 3;
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState(short);
  const [activeStep, setActiveStep] = useState(0);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent
  ): void => {
    e.preventDefault();

    if (activeStep + 1 < maxStepIndex) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack: MouseEventHandler<HTMLButtonElement> = (): void => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const steps: IStepperStep[] = [
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
        <Stepper
          steps={steps}
          activeStep={activeStep}
          onClickStep={setActiveStep}
        />
        <h3 className="pb-2 pt-4">
          {t('SHORT_FORM.TITLE')}
          <a
            className="float-right bg-yellow-100 text-yellow-800 text-sm font-medium px-5 py-1 rounded dark:bg-yellow-900 dark:text-yellow-300"
            target="_blank"
            rel="noreferrer"
            href={short?.target}
          >
            {short?.target}
          </a>
        </h3>
      </header>

      <form onSubmit={handleSubmit}>
        <FadeInOut isVisible={activeStep === 0} key="0">
          <fieldset>
            <div className="py-2">
              <label htmlFor="target">
                {t('SHORT_FORM.TARGET_INPUT_LABEL')}:
              </label>
              <input
                name="target"
                id="target"
                type="text"
                placeholder={t('SHORT_FORM.TARGET_INPUT_PLACEHOLDER')}
                value={formValues?.target}
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
                value={formValues?.name}
                onChange={handleInputChange}
              />
            </div>
          </fieldset>
        </FadeInOut>

        <FadeInOut isVisible={activeStep === 1} key="1">
          <fieldset>
            <div className="py-2">
              <label htmlFor="target">Step 2</label>
            </div>
          </fieldset>
        </FadeInOut>

        <FadeInOut isVisible={activeStep === 2} key="2">
          <fieldset>
            <div className="py-2">
              <label htmlFor="target">Step 3</label>
            </div>
          </fieldset>
        </FadeInOut>

        <FadeInOut isVisible={activeStep !== 0} key="back">
          <button
            onClick={handleBack}
            type="button"
            className="px-3 py-2 text-xs float-left font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            {t('SHORT_FORM.BACK_BUTTON')}
          </button>
        </FadeInOut>

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
