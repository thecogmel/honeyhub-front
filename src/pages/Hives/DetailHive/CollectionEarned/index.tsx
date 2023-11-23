import React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

interface CollectionEarnedProps {
  media: number;
  chartValues: { quantity: number; created: string }[];
}

const CollectionEarned: React.FC<CollectionEarnedProps> = ({
  media,
  chartValues,
}) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',

      height: 90,
      sparkline: {
        enabled: false,
      },
    },
    colors: [primary],

    stroke: {
      curve: 'smooth',
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

      labels: {
        formatter: (value) => {
          return new Date(value).toLocaleDateString('pt-br');
        },
      },
      categories: chartValues.map((item) => item.created),
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return value + 'Kg';
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart = [
    {
      name: 'Quantidade',
      data: chartValues.map((item) => item.quantity),
    },
  ];

  return (
    <Card>
      <CardHeader title="Histórico gráfico" />
      <Divider />
      <CardContent sx={{ p: '30px' }}>
        <Typography variant="h4">{media.toPrecision(2)}Kg</Typography>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography variant="subtitle2" color="textSecondary">
            Média
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
        height="200px"
        width={'100%'}
      />
    </Card>
  );
};

export default CollectionEarned;
