import React from 'react';

import { Grid, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Breadcrumb from '@components/Breadcrumb';
import CustomTable from '@components/CustomTable';
import ParentCard from '@components/ParentCard';

import RoutesPath from '@router/routes';

const Hive: React.FC = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Colmeias',
    },
  ];
  const navigate = useNavigate();
  return (
    <>
      <Grid container justifyContent={'space-between'} my={5}>
        <Grid item xs={10}>
          <Breadcrumb
            title="Colmeias"
            subtitle="Aqui você encontrará a lista de todas as colméias disponíveis"
            items={BCrumb}
          />
        </Grid>
        <Grid item>
          <Button
            size="large"
            onClick={() => navigate(RoutesPath.private.createHive.path)}
            variant="contained"
          >
            Nova colméia
          </Button>
        </Grid>
      </Grid>

      <ParentCard title="Colmeias">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              <CustomTable />
            </Box>
          </Grid>
        </Grid>
      </ParentCard>
    </>
  );
};

export default Hive;
