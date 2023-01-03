import { FC } from 'react';
import { TextInput, Button, Pane } from 'evergreen-ui';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ROUTES } from 'routes';
import { FieldErrorMessage } from 'components/core';

import { FormButtons, FormWrapper } from './styles';

export interface SignUpFormFields {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface Props {
  isLoading: boolean;
  onSubmit: (data: SignUpFormFields) => void;
}

const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
const MIN_PASSWORD_LENGTH = 8;

const schema = yup
  .object({
    name: yup.string().required('Name is required').min(3),
    surname: yup.string().required('Surname is required').min(3),
    email: yup.string().required('Email is required').matches(EMAIL_REGEXP, 'Invalid email').min(3),
    password: yup.string().required('Required').matches(PASSWORD_REGEXP, 'Weak password').min(MIN_PASSWORD_LENGTH),
  })
  .required();

export const SignUpForm: FC<Props> = ({ isLoading, onSubmit }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignUpFormFields>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  return (
    <Pane>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput height={40} placeholder='name' {...register('name')} />
          <FieldErrorMessage message={errors.name?.message} />
        </div>
        <div>
          <TextInput height={40} placeholder='surname' {...register('surname')} />
          <FieldErrorMessage message={errors.surname?.message} />
        </div>
        <div>
          <TextInput height={40} placeholder='email' {...register('email')} />
          <FieldErrorMessage message={errors.email?.message} />
        </div>
        <div>
          <TextInput height={40} placeholder='password' type='password' {...register('password')} />
          <FieldErrorMessage message={errors.password?.message} />
        </div>
        <FormButtons>
          <Button type='button' height={40} onClick={() => navigate(ROUTES.AUTH)}>
            Login
          </Button>
          <Button height={40} appearance='primary' type='submit' isLoading={isLoading}>
            Sign up
          </Button>
        </FormButtons>
      </FormWrapper>
    </Pane>
  );
};
