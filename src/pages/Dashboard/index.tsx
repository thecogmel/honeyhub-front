import React from 'react';

import Doughnut from '@components/Charts/Doughnut';
import Earned from '@components/Charts/Earned';

const Dashboard: React.FC = () => {
  return (
    <>
      <Doughnut />
      <Earned />
    </>
  );
};

export default Dashboard;
