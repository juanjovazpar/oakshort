import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import ROUTES from '../../routes';

import './ShortInput.css';
import service from '../../services/shorts.service';

interface ShortInputProps {}

const ShortInput: React.FC<ShortInputProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  let loading: boolean = false;
  let error: string = '';

  const createShort = async (short: any) => {
    try {
      loading = true;
      await service.createShort(short);

      if (!location.pathname.startsWith(ROUTES.MAIN)) {
        navigate(ROUTES.MAIN);
      }
    } catch (e) {
      console.log(e);
      error = 'Error creating short';
    } finally {
      error = '';
      loading = false;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    e.preventDefault();
    createShort(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="short-input" autoComplete="off">
        <input
          id="target"
          name="target"
          type="text"
          placeholder={t('VEIL_SECTION.TARGET_INPUT_PLACEHOLDER')}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {t('VEIL_SECTION.MAIN_BUTTON')}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default ShortInput;
