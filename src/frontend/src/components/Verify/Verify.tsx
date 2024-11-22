import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ROUTES, { PARAMS } from '../../router/routes';
import service from '../../services/auth.service';
import './Verify.css';
import Input from '../../elements/Input/Input';
import Button from '../../elements/Button/Button';
import Form from '../../elements/Form/Form';

export default function Verify() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [initialized, setInitialized] = useState(false);

  const onSubmit = async ({ verificationToken }: any = {}) => {
    const token =
      verificationToken ||
      (searchParams.get(PARAMS.VERIFICATION_TOKEN) as string);

    if (token) {
      await service.verify(token);
      navigate(ROUTES.SIGNIN);
    }
  };

  if (!initialized) {
    setInitialized(true);
    onSubmit();
  }

  return (
    <Form onSubmit={onSubmit} className="verify-account" autoComplete="off">
      <Input
        id="token"
        type="text"
        name="token"
        required
        placeholder={t('VERIFY.TOKEN_PLACEHOLDER')}
      >
        <Button type="submit" />
      </Input>
    </Form>
  );
}
