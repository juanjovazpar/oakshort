import React from 'react';
import { useTranslation } from 'react-i18next';
import './ResetPassword.css';
import service from '../../services/auth.service';
import ROUTES, { PARAMS } from '../../router/routes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../../elements/Input/Input';
import { isValidPassword } from '../../utils/password.util';
import Form from '../../elements/Form/Form';
import Button from '../../elements/Button/Button';

export default function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onSubmit = async (data: any) => {
    const token = searchParams.get(PARAMS.RESET_TOKEN) as string;
    await service.resetPassword(token, { password: data.password });
    navigate(ROUTES.SIGNIN);
  };

  return (
    <Form onSubmit={onSubmit} className="signin" autoComplete="off">
      <Input
        id="password"
        type="text"
        name="password"
        validator={isValidPassword}
        required
        placeholder={t('RESET_PASSWORD.PASSWORD_PLACEHOLDER')}
      />
      <Input
        id="passwordConfirmation"
        type="text"
        name="passwordConfirmation"
        validator={isValidPassword}
        required
        placeholder={t('RESET_PASSWORD.PASSWORD_CONFIRMATION_PLACEHOLDER')}
      >
        <Button type="submit" />
      </Input>
    </Form>
  );
}
