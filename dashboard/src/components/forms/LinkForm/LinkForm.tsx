/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { TextInput, Button } from 'evergreen-ui';

import { useLink } from 'controllers/links/useLink';
import { createLinkMutation, updateLinkMutation } from 'mutations';

import { FormWrapper } from './styles';

interface FormFields {
  hash: string;
  path: string;
}

export const LinkForm = () => {
  const { register, handleSubmit, reset, setValue } = useForm<FormFields>();
  const { currentLink, editLink } = useLink();
  const [updateLink] = useMutation(updateLinkMutation, {
    onCompleted: () => {
      reset();
      editLink();
    },
  });
  const [createLink] = useMutation(createLinkMutation, {
    onCompleted: () => {
      reset();
      editLink();
    },
  });

  const onSubmitCallback = useCallback(
    (data: FormFields) => {
      if (currentLink) {
        updateLink({
          variables: {
            id: Number.parseInt(currentLink.id ?? '', 10),
            hash: data.hash,
            path: data.path,
          },
        });
      } else {
        createLink({
          variables: {
            hash: data.hash,
            path: data.path,
          },
        });
      }
    },
    [createLink, currentLink, updateLink],
  );

  useEffect(() => {
    if (currentLink) {
      setValue('hash', currentLink.hash);
      setValue('path', currentLink.path);
    } else {
      setValue('hash', '');
      setValue('path', '');
    }
  }, [currentLink, setValue]);

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmitCallback)}>
      <TextInput placeholder='Your custom link hash' width='100%' height={40} {...register('hash')} />
      <TextInput placeholder='Link to be shortened' width='100%' height={40} type='url' {...register('path')} />
      <Button width='100%' height={40} appearance="primary">Save</Button>
    </FormWrapper>
  );
};
