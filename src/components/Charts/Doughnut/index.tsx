import React from 'react';

import { Grid, useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

import Breadcrumb from '@components/Breadcrumb';
import ParentCard from '@components/ParentCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Dashboard',
  },
];

const Doughnut: React.FC = () => {
  const theme = useTheme();
  const warning = theme.palette.warning.main;
  const info = theme.palette.info.main;
  const success = theme.palette.success.main;
  const error = theme.palette.error.main;
  // 1
  const optionsdoughnutchart: ApexOptions = {
    chart: {
      id: 'donut-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
    },
    colors: [success, warning, error],
    labels: ['Bom', 'Média', 'Fraco'],
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };
  const seriesdoughnutchart = [45, 15, 27];

  // 2
  const optionspiechart: ApexOptions = {
    chart: {
      id: 'pie-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
    },
    colors: [warning, info, success, error],
    labels: ['Captura', 'Desenvolvimento', 'Produtiva', 'Caixa vazia'],
    tooltip: {
      fillSeriesColor: false,
    },
  };
  const seriespiechart = [45, 15, 27, 18];

  return (
    <>
      <Breadcrumb title="Dashboard" items={BCrumb} />

      <Grid container spacing={3}>
        <Grid item lg={6} md={12} xs={12}>
          <ParentCard title="Status geral das colmeias">
            <Chart
              options={optionspiechart}
              series={seriespiechart}
              type="pie"
              height="300px"
              width={'100%'}
            />
          </ParentCard>
        </Grid>
        <Grid item lg={6} md={12} xs={12}>
          <ParentCard title="Status geral da rainha">
            <Chart
              options={optionsdoughnutchart}
              series={seriesdoughnutchart}
              type="donut"
              height="300px"
              width={'100%'}
            />
          </ParentCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Doughnut;
