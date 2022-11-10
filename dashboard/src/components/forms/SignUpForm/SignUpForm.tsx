import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Input, Button } from 'components/core';

import { FormWrapper } from './styles';

export interface SignUpFormFields {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface Props {
  onSubmit: (data: SignUpFormFields) => void;
}

export const SignUpForm: FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<SignUpFormFields>();

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder='name' {...register('name')} />
      <Input placeholder='surname' {...register('surname')} />
      <Input placeholder='email' {...register('email')} />
      <Input placeholder='password' type='password' {...register('password')} />
      <Button type='submit'>Send</Button>
    </FormWrapper>
  );
};
