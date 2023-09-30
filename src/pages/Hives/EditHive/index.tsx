import React from 'react';

import { CircularProgress, Grid } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useHives } from '@hooks';

import Breadcrumb from '@components/Breadcrumb';

import HiveInfo from '../Form/HiveInfo';
import routes from './routes';

const EditHive: React.FC = () => {
  const navigate = useNavigate();
  const { hiveId } = useParams<{ hiveId: string }>();
  const location = useLocation();
  const { getHive, updateHive } = useHives();
  const queryClient = useQueryClient();

  const fetchHive = useQuery(['hive', hiveId!], () => getHive(hiveId!), {
    initialData: location.state as Hive,
    enabled: !location.state,
  });

  const createHiveRequest = useMutation(
    (hive: HiveFormValues) => updateHive(hiveId!, hive),
    {
      onSuccess: () => {
        enqueueSnackbar('Colméia cadastrada com sucesso', {
          variant: 'success',
        });
        queryClient.invalidateQueries(['hive', hiveId!]);
        queryClient.invalidateQueries(['hives']);
        navigate(-1);
      },
    }
  );

  if (fetchHive.isLoading) return <CircularProgress />;

  return (
    <>
      <Grid container justifyContent={'space-between'} my={5}>
        <Grid item xs={6}>
          <Breadcrumb
            title="Colmeias"
            subtitle="Aqui você edita uma colméia existente"
            items={routes}
          />
        </Grid>
      </Grid>

      <HiveInfo
        createRequest={createHiveRequest}
        initialValues={fetchHive.data}
      />
    </>
  );
};

export default EditHive;
