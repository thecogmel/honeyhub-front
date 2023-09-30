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

import { useHives } from '@hooks';

import Breadcrumb from '@components/Breadcrumb';
import ChipStatusHive from '@components/ChipStatusHive';
import DeleteButton from '@components/DeleteButton';
import ParentCard from '@components/ParentCard';

import RoutesPath from '@router/routes';

import routes from './routes';

const DetailHive: React.FC = () => {
  const navigate = useNavigate();
  const { hiveId } = useParams<{ hiveId: string }>();
  const location = useLocation();
  const { getHive, deleteHive } = useHives();
  const queryClient = useQueryClient();

  const fetchHive = useQuery(['hive', hiveId!], () => getHive(hiveId!), {
    initialData: location.state as Hive,
    enabled: !location.state,
  });

  const deleteHiveRequest = useMutation(() => deleteHive(hiveId!), {
    onSuccess: () => {
      enqueueSnackbar('Colméia deletada com sucesso', {
        variant: 'success',
      });
      queryClient.invalidateQueries(['hives']);
      navigate(RoutesPath.private.hive.path);
    },
    onError: () => {
      enqueueSnackbar('Erro ao deletar colméia', {
        variant: 'error',
      });
    },
  });

  return (
    <>
      <Grid container justifyContent={'space-between'} my={5}>
        <Grid item xs={6}>
          <Breadcrumb
            title="Colmeias"
            subtitle="Aqui você encontra o detalhamento da colméia selecionada"
            items={routes}
          />
        </Grid>
        <Grid item>
          <Button
            size="large"
            onClick={() =>
              navigate(
                RoutesPath.private.editHive.path.replace(':hiveId', hiveId!)
              )
            }
            variant="outlined"
          >
            Editar colméia
          </Button>
          <DeleteButton
            modalTitle={'Confirmação de exclusão de colméia'}
            modalMessage={'Deseja realmente excluir este colméia?'}
            onConfirm={() => deleteHiveRequest.mutateAsync()}
            isLoading={false}
          >
            Deletar Item
          </DeleteButton>
        </Grid>
      </Grid>
      <ParentCard title="Detalhamento da colméia">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card title="Colméia">
              <CardContent>
                {fetchHive.isLoading ? (
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
                      <Grid item lg={6} xs={12} mt={2}>
                        <Typography variant="body2" color="text.secondary">
                          Id da colméia
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          mb={0.5}
                          fontWeight={600}
                        >
                          {fetchHive.data?.id}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12} mt={4}>
                        <Typography variant="body2" color="text.secondary">
                          Nome da colméia
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          mb={0.5}
                        >
                          {fetchHive.data?.name}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12} mt={4}>
                        <Typography variant="body2" color="text.secondary">
                          Email do responsável
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          mb={0.5}
                        >
                          {fetchHive.data?.responsible?.email}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12} mt={4}>
                        <Typography variant="body2" color="text.secondary">
                          Condição da colméia
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          mb={0.5}
                          fontWeight={600}
                        >
                          <ChipStatusHive status={fetchHive.data?.status} />
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12} mt={4}>
                        <Typography variant="body2" color="text.secondary">
                          Descrição da colméia
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          mb={0.5}
                        >
                          {fetchHive.data?.description}
                        </Typography>
                      </Grid>
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

export default DetailHive;
