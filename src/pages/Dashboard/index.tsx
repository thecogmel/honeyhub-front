import React from 'react';

import CurrentValue from '@components/Charts/CurrentValue';
import Doughnut from '@components/Charts/Doughnut';
import Earned from '@components/Charts/Earned';

const Dashboard: React.FC = () => {
  return (
    <>
      <Doughnut />
      <Earned />
      <CurrentValue />
    </>
  );
};

export default Dashboard;
