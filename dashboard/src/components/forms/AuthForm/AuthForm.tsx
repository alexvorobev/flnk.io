import { FC } from 'react';
import { TextInput, Button, Pane } from 'evergreen-ui';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from 'routes';

import { FormButtons, FormWrapper } from './styles';

export interface AuthFormFields {
  email: string;
  password: string;
}

interface Props {
  isLoading: boolean;
  onSubmit: (data: AuthFormFields) => void;
}

export const AuthForm: FC<Props> = ({ isLoading, onSubmit }) => {
  const { register, handleSubmit } = useForm<AuthFormFields>();
  const navigate = useNavigate();

  return (
    <Pane>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <TextInput height={40} placeholder='email' {...register('email')} />
        <TextInput height={40} placeholder='password' type='password' {...register('password')} />
        <FormButtons>
          <Button height={40} type='button' onClick={() => navigate(ROUTES.SIGN_UP)}>
            Sign Up
          </Button>
          <Button height={40} type='submit' appearance='primary' isLoading={isLoading}>
            Login
          </Button>
        </FormButtons>
      </FormWrapper>
    </Pane>
  );
};
