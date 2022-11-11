import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Input, Button } from 'components/core';

import { FormWrapper } from './styles';

export interface AuthFormFields {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (data: AuthFormFields) => void;
}

export const AuthForm: FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<AuthFormFields>();

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder='email' {...register('email')} />
      <Input placeholder='password' type='password' {...register('password')} />
      <Button type='submit'>Send</Button>
      <p>
        <Link to='/sign-up'>Register</Link> for free
      </p>
    </FormWrapper>
  );
};
