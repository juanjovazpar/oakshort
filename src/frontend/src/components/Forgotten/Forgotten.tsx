import React from 'react';
import { useTranslation } from 'react-i18next';
import './Forgotten.css';
import service from '../../services/auth.service';
import Input from '../../elements/Input/Input';
import { isValidEmail } from '../../utils/email.util';
import { Form } from 'react-router-dom';
import Button from '../../elements/Button/Button';

export default function Forgotten() {
  const { t } = useTranslation();

  const onSubmit = async (data: any) => {
    await service.forgotPassword(data);
  };

  return (
    <Form onSubmit={onSubmit} className="signin" autoComplete="off">
      <Input
        id="email"
        type="email"
        name="email"
        validator={isValidEmail}
        required
        placeholder={t('FORGOTTEN.EMAIL_PLACEHOLDER')}
      >
        <Button type="submit" />
      </Input>
    </Form>
  );
}
