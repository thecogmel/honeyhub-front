import React, { useCallback } from 'react';

import { CircularProgress, Grid } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useAuthentication } from '@hooks';

import Breadcrumb from '@components/Breadcrumb';

import UserInfo from '../Form/UserInfo';
import routes from './routes';

const EditUser: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const { getUser, updateUser } = useAuthentication();
  const queryClient = useQueryClient();

  const fetchUser = useQuery(['user', userId!], () => getUser(userId!), {
    initialData: location.state as UserInfo,
    enabled: !location.state,
  });

  const createUserRequest = useMutation(
    (user: UserFormValues) => updateUser(userId!, user),
    {
      onSuccess: () => {
        enqueueSnackbar('Usuário editado com sucesso', {
          variant: 'success',
        });
        queryClient.invalidateQueries(['user', userId!]);
        queryClient.invalidateQueries(['users']);
        navigate(-1);
      },
    }
  );

  const convertToUserData = useCallback((user: UserInfo) => {
    const data: UserFormValues = {
      name: user.name,
      email: user.email,
      role: user.role,
      username: user.username,
      password: '',
    };
    return data;
  }, []);

  if (fetchUser.isLoading || !fetchUser.data) return <CircularProgress />;

  return (
    <>
      <Grid container justifyContent={'space-between'} my={5}>
        <Grid item xs={6}>
          <Breadcrumb
            title="Usuários"
            subtitle="Aqui você edita um usuário existente"
            items={routes}
          />
        </Grid>
      </Grid>

      <UserInfo
        createRequest={createUserRequest}
        initialValues={convertToUserData(fetchUser.data)}
      />
    </>
  );
};

export default EditUser;
