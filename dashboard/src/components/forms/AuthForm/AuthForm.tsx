import { FC } from 'react';
import { TextInput, Button } from 'evergreen-ui';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

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
      <TextInput placeholder='email' {...register('email')} />
      <TextInput placeholder='password' type='password' {...register('password')} />
      <Button type='submit'>Send</Button>
      <p>
        <Link to='/sign-up'>Register</Link> for free
      </p>
    </FormWrapper>
  );
};
