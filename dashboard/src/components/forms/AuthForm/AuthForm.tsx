import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { Input, Button } from 'components/core';

import { FormWrapper } from './styles';

interface FormFields {
  email: string;
  password: string;
}

export const AuthForm = () => {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit = useCallback((data: FormFields) => {
  }, []);

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder='email' {...register('email')} />
      <Input placeholder='password' type='password' {...register('password')} />
      <Button type='submit'>Send</Button>
    </FormWrapper>
  );
};
