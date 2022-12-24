import { FC } from 'react';
import { TextInput, Button, Pane } from 'evergreen-ui';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from 'routes';

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

export const SignUpForm: FC<Props> = ({ isLoading, onSubmit }) => {
  const { register, handleSubmit } = useForm<SignUpFormFields>();
  const navigate = useNavigate();

  return (
    <Pane>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <TextInput height={40} placeholder='name' {...register('name')} />
        <TextInput height={40} placeholder='surname' {...register('surname')} />
        <TextInput height={40} placeholder='email' {...register('email')} />
        <TextInput height={40} placeholder='password' type='password' {...register('password')} />
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
