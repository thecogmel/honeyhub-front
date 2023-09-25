import React from 'react';

import { Grid, Box } from '@mui/material';

import Breadcrumb from '@components/Breadcrumb';
import CustomTable from '@components/CustomTable';
import ParentCard from '@components/ParentCard';

const Honeycomb: React.FC = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Colmeias',
    },
  ];
  return (
    <>
      {/* breadcrumb */}
      <Breadcrumb title="Colmeias" items={BCrumb} />
      {/* end breadcrumb */}
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

export default Honeycomb;
