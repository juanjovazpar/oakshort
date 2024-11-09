import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes';

import './ShortInput.css';

interface ShortInputProps {}

const ShortInput: React.FC<ShortInputProps> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(ROUTES.MAIN);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="short-input">
        <input
          id="url"
          name="url"
          type="text"
          placeholder={t('VEIL_SECTION.TARGET_INPUT_PLACEHOLDER')}
          required
        />
        <button type="submit">{t('VEIL_SECTION.MAIN_BUTTON')}</button>
      </form>
    </div>
  );
};

export default ShortInput;
