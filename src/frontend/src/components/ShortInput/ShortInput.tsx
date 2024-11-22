import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import ROUTES from '../../router/routes';
import './ShortInput.css';
import service from '../../services/shorts.service';
import { setRecentlyCreatedShort } from '../../store/layout/layout.slice';
import { useDispatch } from 'react-redux';
import Input from '../../elements/Input/Input';
import { isValidURL } from '../../utils/url.util';
import Form from '../../elements/Form/Form';
import Button from '../../elements/Button/Button';

const ShortInput = () => {
  const { t } = useTranslation();
  const dispatch: Function = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (short: any) => {
    const response = await service.createShort(short);

    // TODO: Simplify payload response
    dispatch(setRecentlyCreatedShort(response.data.payload));
    if (!location.pathname.startsWith(ROUTES.MAIN)) {
      navigate(ROUTES.MAIN);
    }
  };

  return (
    <Form onSubmit={onSubmit} autoComplete="off">
      <Input
        id="target"
        name="target"
        type="text"
        placeholder={t('SHORT_INPUT.TARGET_INPUT_PLACEHOLDER')}
        validator={isValidURL}
        required
      >
        <Button type="submit" />
      </Input>
    </Form>
  );
};

export default ShortInput;
