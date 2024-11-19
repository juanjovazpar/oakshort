import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Signup.css';
import service from '../../services/auth.service';
import ROUTES from '../../routes';
import { useNavigate } from 'react-router-dom';
import Input from '../../elements/Input/Input';
import FadeInOut from '../../animations/fadeinout';
import InputMessage from '../../elements/InputMessage/InputMessage';
import Loading from '../../elements/Loading/Loading';
import { isValidEmail } from '../../utils/email.util';
import { isValidPassword } from '../../utils/password.util';
import { IFormError } from '../../../../shared/interfaces/response.interface';

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [errorForm, setErrorForm] = useState<IFormError>({});
  const [loading, setLoading] = useState(false);

  const createUser = async (user: any) => {
    setLoading(true);
    setErrorMsg(undefined);

    try {
      await service.signUp(user);
      navigate(ROUTES.VERIFY);
    } catch (e: any) {
      setErrorForm(e.error);
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    e.preventDefault();
    createUser(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(undefined);
    setErrorForm({});
  };

  return (
    <form onSubmit={handleSubmit} className="signup" autoComplete="off">
      <Input
        id="email"
        type="email"
        name="email"
        loading={loading}
        validator={isValidEmail}
        onChange={handleInputChange}
        required
        error={errorForm['email']}
        placeholder={t('SIGNUP_SECTION.EMAIL_PLACEHOLDER')}
      />

      <Input
        id="password"
        type="password"
        name="password"
        loading={loading}
        validator={isValidPassword}
        onChange={handleInputChange}
        required
        error={errorForm['password']}
        placeholder={t('SIGNUP_SECTION.PASSWORD_PLACEHOLDER')}
      >
        <button
          type="submit"
          disabled={!!errorMsg || loading}
          className="absolute
          right-2.5
          inset-y-2
          aspect-square
        text-white
          px-6
          py-5
          rounded-full
          text-3xl
          font-thin
          capitalize
        hover:bg-gray-700
          transition-all
          duration-300
          ease-in-out
        bg-gray-600
          "
        >
          {loading && <Loading />}
        </button>
      </Input>

      <FadeInOut isVisible={!!errorMsg}>
        {errorMsg && <InputMessage label={errorMsg} />}
      </FadeInOut>
    </form>
  );
}
