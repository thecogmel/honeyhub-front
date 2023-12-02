import React from 'react';

import { Card, CardContent, Stack, Typography, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const Earned: React.FC = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  // chart
  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 90,
      sparkline: {
        enabled: true,
      },
    },
    colors: [primary],

    stroke: {
      curve: 'straight',
      width: 2,
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      data: [16, 20, 8, 0, 18, 22, 14, 25, 10, 12, 3, 6],
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">17 Kg</Typography>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography variant="subtitle2" color="textSecondary">
            Média de coleta de mel
          </Typography>
          <Typography variant="subtitle2" color="success.main">
            +1.20%
          </Typography>
        </Stack>
      </CardContent>
      <Chart
        options={optionscolumnchart}
        series={seriescolumnchart}
        type="area"
        height="90px"
        width={'100%'}
      />
    </Card>
  );
};

export default Earned;
