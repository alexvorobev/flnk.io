import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

import { Button, Input } from 'components/core';

import { FormWrapper } from './styles';

interface FormFields {
  id: string;
  path: string;
}

export const LinkForm = () => {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmitCallback = useCallback((data: FormFields) => {
    console.log(data);
  }, []);

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmitCallback)}>
      <Input placeholder='Your custom link id' {...register('id')} />
      <Input placeholder='Link to be shortened' type='url' {...register('path')} />
      <Button>Save</Button>
    </FormWrapper>
  );
};
