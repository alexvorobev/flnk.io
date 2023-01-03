import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { TextInput, Button, toaster } from 'evergreen-ui';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useLink } from 'controllers/links/useLink';
import { createLinkMutation, updateLinkMutation } from 'mutations';
import { useAuth } from 'controllers/auth/useAuth';
import { Mutation, Query } from 'schema/types';
import { getLinksQuery } from 'queries';
import { FieldErrorMessage } from 'components/core';

import { AppLinkUrl, FormWrapper } from './styles';

interface FormFields {
  hash: string;
  path: string;
}

const URL_REGEX =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const schema = yup
  .object({
    hash: yup.string(),
    path: yup.string().required('URL required').matches(URL_REGEX, 'Invalid URL'),
  })
  .required();

export const LinkForm = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
  });
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
            toaster.success('Like a new!', {
              description: 'Your link has been successfully updated',
            });

            const cachedLinks = cache.readQuery<Query>({
              query: getLinksQuery,
            });

            cache.writeQuery({
              query: getLinksQuery,
              data: {
                getLinks: {
                  total: cachedLinks?.getLinks?.total ?? 0,
                  items:
                    cachedLinks?.getLinks?.items?.map((link) => {
                      if (link.id === updatedLink?.updateLink?.id) {
                        return {
                          ...link,
                          ...updatedLink?.updateLink,
                          __typename: 'CountedLinks',
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
                  items: [
                    {
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
                      },
                    },
                    ...(cachedLinks?.getLinks?.items ?? []),
                  ],
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
      <AppLinkUrl style={{ fontSize: 14, fontWeight: 'bold' }}>flnk.io/</AppLinkUrl>
      <TextInput
        placeholder={me?.role === 'ADMIN' ? 'Your custom link hash' : 'Link hash'}
        width='100%'
        height={40}
        {...register('hash')}
        disabled={me?.role !== 'ADMIN' || isCreating || isUpdating}
      />
      <div>
        <TextInput
          placeholder='Link to be shortened'
          width='100%'
          height={40}
          {...register('path')}
          isInvalid={!!errors.path}
          disabled={isCreating || isUpdating}
        />
        <FieldErrorMessage message={errors.path?.message} />
      </div>
      <Button width='100%' height={40} appearance='primary' isLoading={isCreating || isUpdating}>
        Save
      </Button>
    </FormWrapper>
  );
};
