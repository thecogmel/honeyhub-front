import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useAuthentication } from '@hooks';

import Breadcrumb from '@components/Breadcrumb';
import DeleteButton from '@components/DeleteButton';
import ParentCard from '@components/ParentCard';

import RoutesPath from '@router/routes';
import { enums } from '@utils';

import routes from './routes';

const DetailUser: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const { getUser, deleteUser } = useAuthentication();
  const queryClient = useQueryClient();

  const fetchUser = useQuery(['users', userId!], () => getUser(userId!), {
    initialData: location.state as UserInfo,
    enabled: !location.state,
  });

  const deleteHiveRequest = useMutation(() => deleteUser(userId!), {
    onSuccess: () => {
      enqueueSnackbar('Usuário deletado com sucesso', {
        variant: 'success',
      });
      queryClient.invalidateQueries(['users']);
      navigate(RoutesPath.private.user.path);
    },
    onError: () => {
      enqueueSnackbar('Erro ao deletar usuário', {
        variant: 'error',
      });
    },
  });

  return (
    <>
      <Grid container justifyContent={'space-between'} my={5}>
        <Grid item xs={6}>
          <Breadcrumb
            title="Usuários"
            subtitle="Aqui você encontra o detalhamento do usuário selecionado"
            items={routes}
          />
        </Grid>
        <Grid item>
          <Button
            size="large"
            onClick={() =>
              navigate(
                RoutesPath.private.editUser.path.replace(':userId', userId!)
              )
            }
            variant="outlined"
          >
            Editar usuário
          </Button>
          <DeleteButton
            modalTitle={'Confirmação de exclusão do usuário'}
            modalMessage={'Deseja realmente excluir este usuário?'}
            onConfirm={() => deleteHiveRequest.mutateAsync()}
            isLoading={false}
          >
            Deletar Item
          </DeleteButton>
        </Grid>
      </Grid>
      <ParentCard title="Detalhamento do usuário">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card title="Usuário">
              <CardContent>
                {fetchUser.isLoading ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      overflow: {
                        xs: 'auto',
                        sm: 'unset',
                      },
                    }}
                  >
                    <Grid container>
                      <Grid item lg={6} xs={12} mt={4}>
                        <Typography variant="body2" color="text.secondary">
                          Nome do usuário
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          mb={0.5}
                        >
                          {fetchUser.data?.name}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12} mt={4}>
                        <Typography variant="body2" color="text.secondary">
                          Email do usuário
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          mb={0.5}
                        >
                          {fetchUser.data?.email}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12} mt={4}>
                        <Typography variant="body2" color="text.secondary">
                          Username
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          mb={0.5}
                          fontWeight={600}
                        >
                          {fetchUser.data?.username}
                        </Typography>
                      </Grid>
                      {fetchUser.data?.role && (
                        <Grid item lg={6} xs={12} mt={4}>
                          <Typography variant="body2" color="text.secondary">
                            Função
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            mb={0.5}
                            fontWeight={600}
                          >
                            {enums.EUserRoleMap[fetchUser.data.role]}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ParentCard>
    </>
  );
};

export default DetailUser;
