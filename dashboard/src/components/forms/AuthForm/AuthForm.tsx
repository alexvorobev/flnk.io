import { FC } from 'react';
import { TextInput, Button, Pane } from 'evergreen-ui';
import { useForm } from 'react-hook-form';

import { FormButtons, FormWrapper } from './styles';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes';

export interface AuthFormFields {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (data: AuthFormFields) => void;
}

export const AuthForm: FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<AuthFormFields>();
  const navigate = useNavigate();

  return (
    <Pane>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <TextInput height={40} placeholder='email' {...register('email')} />
        <TextInput height={40} placeholder='password' type='password' {...register('password')} />
        <FormButtons>
          <Button height={40} onClick={() => navigate(ROUTES.SIGN_UP)}>
            Sign Up
          </Button>
          <Button height={40} type='submit' appearance='primary'>
            Login
          </Button>
        </FormButtons>
      </FormWrapper>
    </Pane>
  );
};
