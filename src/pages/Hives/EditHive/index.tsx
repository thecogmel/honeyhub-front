import React from 'react';

import { Grid } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import Breadcrumb from '@components/Breadcrumb';

import HiveInfo from '../Form/HiveInfo';
import routes from './routes';

const EditHive: React.FC = () => {
  const navigate = useNavigate();
  const createHiveRequest = useMutation(async (values) => console.log(values), {
    onSuccess: () => {
      enqueueSnackbar('Colméia cadastrada com sucesso', {
        variant: 'success',
      });
      navigate(-1);
    },
  });
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

      <HiveInfo createRequest={createHiveRequest} />
    </>
  );
};

export default EditHive;
