import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import useCollection from 'hooks/Collection';
import { enqueueSnackbar } from 'notistack';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useHives } from '@hooks';

import Breadcrumb from '@components/Breadcrumb';
import ChipStatusHive from '@components/ChipStatusHive';
import DeleteButton from '@components/DeleteButton';
import ParentCard from '@components/ParentCard';

import RoutesPath from '@router/routes';

import CollectionEarned from './CollectionEarned';
import routes from './routes';

const DetailHive: React.FC = () => {
  const navigate = useNavigate();
  const { hiveId } = useParams<{ hiveId: string }>();
  const location = useLocation();
  const { getHive, deleteHive, getHiveMetrics } = useHives();
  const { listCollection } = useCollection();
  const queryClient = useQueryClient();

  const fetchHive = useQuery(['hive', hiveId!], () => getHive(hiveId!), {
    initialData: location.state as Hive,
    enabled: !location.state,
  });

  const fetchHiveCollection = useQuery(
    ['collection', hiveId!],
    () => listCollection(hiveId!),
    {
      enabled: !!hiveId,
      onError: () => {
        enqueueSnackbar('Erro ao buscar coletas', {
          variant: 'error',
        });
      },
    }
  );

  const fetchHiveMetrics = useQuery(
    ['metrics', hiveId!],
    () => getHiveMetrics(hiveId!),
    {
      enabled: !!hiveId,
      onError: () => {
        enqueueSnackbar('Erro ao buscar coletas', {
          variant: 'error',
        });
      },
    }
  );

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
                          Condição da rainha
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          mb={0.5}
                        >
                          {fetchHive.data?.queen_status}
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
                          Q Total
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          mb={0.5}
                          fontWeight={600}
                        >
                          {fetchHive.data?.q_total}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12} mt={4}>
                        <Typography variant="body2" color="text.secondary">
                          Q ca
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          mb={0.5}
                          fontWeight={600}
                        >
                          {fetchHive.data?.q_ca}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12} mt={4}>
                        <Typography variant="body2" color="text.secondary">
                          Q cf
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          mb={0.5}
                          fontWeight={600}
                        >
                          {fetchHive.data?.q_cf}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12} mt={4}>
                        <Typography variant="body2" color="text.secondary">
                          Q ci
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          mb={0.5}
                          fontWeight={600}
                        >
                          {fetchHive.data?.q_ci}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12} mt={4}>
                        <Typography variant="body2" color="text.secondary">
                          Q CV
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          mb={0.5}
                          fontWeight={600}
                        >
                          {fetchHive.data?.q_cv}
                        </Typography>
                      </Grid>

                      <Grid item lg={12} xs={12} mt={4}>
                        <Typography variant="body2" color="text.secondary">
                          Descrição da colméia
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          mb={0.5}
                        >
                          {fetchHive.data?.comments}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card title="Histórico de coletas">
              <CardHeader title="Histórico de coletas" />
              <Divider />
              <CardContent>
                {fetchHiveCollection.isLoading ? (
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
                    {fetchHiveCollection.data?.map((item) => (
                      <Grid container key={item.id}>
                        <Grid item lg={6} xs={12} mt={4}>
                          <Typography variant="body2" color="text.secondary">
                            Quantidade de mel
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            mb={0.5}
                          >
                            {item.quantity} Kg
                          </Typography>
                        </Grid>
                        <Grid item lg={6} xs={12} mt={4}>
                          <Typography variant="body2" color="text.secondary">
                            Data da coleta
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            mb={0.5}
                          >
                            {new Date(item.created).toLocaleString()}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            {fetchHiveMetrics.isLoading ? (
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
              <>
                {fetchHiveMetrics.data?.collection_average &&
                  fetchHiveCollection.data && (
                    <CollectionEarned
                      media={fetchHiveMetrics.data.collection_average}
                      chartValues={fetchHiveCollection.data}
                    />
                  )}
              </>
            )}
          </Grid>
        </Grid>
      </ParentCard>
    </>
  );
};

export default DetailHive;
