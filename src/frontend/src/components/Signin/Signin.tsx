import React from 'react';
import { useTranslation } from 'react-i18next';
import './Signin.css';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../router/routes';
import service from '../../services/auth.service';
import * as browserStorage from '../../utils/sessionStorage.util';
import Input from '../../elements/Input/Input';
import { isValidEmail } from '../../utils/email.util';
import { isValidPassword } from '../../utils/password.util';
import Button from '../../elements/Button/Button';
import Form from '../../elements/Form/Form';

export default function Signin() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const response = await service.signIn(data);
    browserStorage.setAuthToken(response.data.token);
    navigate(ROUTES.MAIN);
  };

  return (
    <Form onSubmit={onSubmit} className="signin" autoComplete="off">
      <Input
        id="email"
        type="text"
        name="email"
        validator={isValidEmail}
        required
        placeholder={t('SIGNIN_SECTION.EMAIL_PLACEHOLDER')}
      />
      <Input
        id="password"
        type="password"
        name="password"
        validator={isValidPassword}
        required
        placeholder={t('SIGNIN_SECTION.PASSWORD_PLACEHOLDER')}
      >
        <Button type="submit" />
      </Input>
    </Form>
  );
}
