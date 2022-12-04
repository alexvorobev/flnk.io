import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { TextInput, Button } from 'evergreen-ui';

import { useLink } from 'controllers/links/useLink';
import { createLinkMutation, updateLinkMutation } from 'mutations';
import { useAuth } from 'controllers/auth/useAuth';
import { Mutation, Query } from 'schema/types';

import { FormWrapper } from './styles';

interface FormFields {
  hash: string;
  path: string;
}

export const LinkForm = () => {
  const { register, handleSubmit, reset, setValue } = useForm<FormFields>();
  const { me } = useAuth();
  const { currentLink, editLink } = useLink();
  const [updateLink] = useMutation(updateLinkMutation, {
    onCompleted: () => {
      reset();
      editLink();
    },
  });
  const [createLink] = useMutation<Mutation>(createLinkMutation, {
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
            updateLinkInput: {
              id: Number.parseInt(currentLink.id ?? '', 10),
              hash: data.hash,
              path: data.path,
            },
          },
        });
      } else {
        createLink({
          variables: {
            hash: me?.role !== 'ADMIN' ? '' : data.hash,
            path: data.path,
          },
          update: (cache, { data: newLink }) => {
            cache.modify({
              fields: {
                getLinks(existingLinks: Query['getLinks']) {
                  return {
                    ...existingLinks,
                    items: [newLink, ...(existingLinks?.items ?? [])],
                  };
                },
              },
            });
          },
        });
      }
    },
    [createLink, currentLink, me?.role, updateLink],
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
      <TextInput
        placeholder={me?.role === 'ADMIN' ? 'Your custom link hash' : 'Link hash'}
        width='100%'
        height={40}
        {...register('hash')}
        disabled={me?.role !== 'ADMIN'}
      />
      <TextInput placeholder='Link to be shortened' width='100%' height={40} type='url' {...register('path')} />
      <Button width='100%' height={40} appearance='primary'>
        Save
      </Button>
    </FormWrapper>
  );
};
