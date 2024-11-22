import React from 'react';
import { useTranslation } from 'react-i18next';
import './Signup.css';
import service from '../../services/auth.service';
import ROUTES from '../../router/routes';
import { useNavigate } from 'react-router-dom';
import Input from '../../elements/Input/Input';
import { isValidEmail } from '../../utils/email.util';
import { isValidPassword } from '../../utils/password.util';
import Form from '../../elements/Form/Form';
import Button from '../../elements/Button/Button';

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    await service.signUp(data);
    navigate(ROUTES.VERIFY);
  };

  return (
    <Form onSubmit={onSubmit} className="signup" autoComplete="off">
      <Input
        id="email"
        type="email"
        name="email"
        validator={isValidEmail}
        required
        placeholder={t('SIGNUP_SECTION.EMAIL_PLACEHOLDER')}
      />

      <Input
        id="password"
        type="password"
        name="password"
        validator={isValidPassword}
        required
        placeholder={t('SIGNUP_SECTION.PASSWORD_PLACEHOLDER')}
      >
        <Button type="submit" />
      </Input>
    </Form>
  );
}
