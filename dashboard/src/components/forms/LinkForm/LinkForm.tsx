import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { TextInput, Button, toaster } from 'evergreen-ui';

import { useLink } from 'controllers/links/useLink';
import { createLinkMutation, updateLinkMutation } from 'mutations';
import { useAuth } from 'controllers/auth/useAuth';
import { Mutation, Query } from 'schema/types';
import { getLinksQuery } from 'queries';

import { FormWrapper } from './styles';

interface FormFields {
  hash: string;
  path: string;
}

export const LinkForm = () => {
  const { register, handleSubmit, reset, setValue } = useForm<FormFields>();
  const { me } = useAuth();
  const { currentLink, editLink } = useLink();
  const [updateLink, { loading: isUpdating }] = useMutation<Mutation>(updateLinkMutation, {
    onCompleted: () => {
      reset();
      editLink();
    },
  });
  const [createLink, { loading: isCreating }] = useMutation<Mutation>(createLinkMutation, {
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
          update: (cache, { data: updatedLink }) => {
            toaster.success('Success!', {
              description: `Your link has been successfully updated with hash: ${updatedLink?.updateLink?.hash}`,
            });

            const cachedLinks = cache.readQuery<Query>({
              query: getLinksQuery,
            });

            cache.writeQuery({
              query: getLinksQuery,
              data: { 
                getLinks: {
                  total: cachedLinks?.getLinks?.total ?? 0,
                  items: cachedLinks?.getLinks?.items?.map((link) => {
                    if (link.id === updatedLink?.updateLink?.id) {
                      return {
                        ...link,
                        ...updatedLink?.updateLink,
                        __typename: "CountedLinks",
                      };
                    }

                    return link;
                  }) ?? [],
                },
              },
            });
          },
        });
      } else {
        createLink({
          variables: {
            hash: me?.role !== 'ADMIN' ? '' : data.hash,
            path: data.path,
          },
          update: (cache, { data: newLink }) => {
            toaster.success('Success!', {
              description: `Your link has been successfully created with hash: ${newLink?.createLink?.hash}`,
            });

            const cachedLinks = cache.readQuery<Query>({
              query: getLinksQuery,
            });

            const total = (cachedLinks?.getLinks?.total ?? 0) + 1;

            cache.writeQuery({
              query: getLinksQuery,
              data: { 
                getLinks: {
                  total,
                  items: [{
                    __typename: 'Link',
                    ...newLink?.createLink,
                    isActive: true,
                    isBlocked: false,
                    visits: {
                      __typename: 'Visits',
                      current: 0,
                      change: 0,
                    },
                    user: {
                      __typename: 'User',
                      ...me,
                    }
                  }, ...(cachedLinks?.getLinks?.items ?? [])],
                },
              },
            });
          },
        });
      }
    },
    [createLink, currentLink, me, updateLink],
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
        disabled={me?.role !== 'ADMIN' || isCreating || isUpdating}
      />
      <TextInput
        placeholder='Link to be shortened'
        width='100%'
        height={40}
        type='url'
        {...register('path')}
        disabled={isCreating || isUpdating}
      />
      <Button width='100%' height={40} appearance='primary' isLoading={isCreating || isUpdating}>
        Save
      </Button>
    </FormWrapper>
  );
};
