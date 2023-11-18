import React from 'react';

import { Grid } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useAuthentication } from '@hooks';

import Breadcrumb from '@components/Breadcrumb';

import UserInfo from '../Form/UserInfo';
import routes from './routes';

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const { createUser } = useAuthentication();
  const queryClient = useQueryClient();
  const createUserRequest = useMutation(
    (user: UserFormValues) => createUser(user),
    {
      onSuccess: () => {
        enqueueSnackbar('Usuário cadastrado com sucesso', {
          variant: 'success',
        });
        queryClient.invalidateQueries(['hives']);
        navigate(-1);
      },
    }
  );
  return (
    <>
      <Grid container justifyContent={'space-between'} my={5}>
        <Grid item xs={6}>
          <Breadcrumb
            title="Usuários"
            subtitle="Aqui você cadastrará um novo usuário"
            items={routes}
          />
        </Grid>
      </Grid>

      <UserInfo createRequest={createUserRequest} />
    </>
  );
};

export default CreateUser;
