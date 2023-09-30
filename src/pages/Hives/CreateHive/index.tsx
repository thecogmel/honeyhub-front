import React from 'react';

import { Grid } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useHives } from '@hooks';

import Breadcrumb from '@components/Breadcrumb';

import HiveInfo from '../Form/HiveInfo';
import routes from './routes';

const CreateHive: React.FC = () => {
  const navigate = useNavigate();
  const { createHive } = useHives();
  const queryClient = useQueryClient();
  const createHiveRequest = useMutation(
    (hive: HiveFormValues) => createHive(hive),
    {
      onSuccess: () => {
        enqueueSnackbar('Colméia cadastrada com sucesso', {
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
            title="Colmeias"
            subtitle="Aqui você cadastrará uma nova colméia"
            items={routes}
          />
        </Grid>
      </Grid>

      <HiveInfo createRequest={createHiveRequest} />
    </>
  );
};

export default CreateHive;
