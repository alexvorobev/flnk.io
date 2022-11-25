import { FC } from 'react';
import { TextInput, Button } from 'evergreen-ui';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

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
      <TextInput placeholder='name' {...register('name')} />
      <TextInput placeholder='surname' {...register('surname')} />
      <TextInput placeholder='email' {...register('email')} />
      <TextInput placeholder='password' type='password' {...register('password')} />
      <Button type='submit'>Send</Button>
      <p>
        <Link to='/auth'>Sign in</Link>
      </p>
    </FormWrapper>
  );
};
