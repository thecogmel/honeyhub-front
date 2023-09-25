import React from 'react';

import { Card, CardHeader, CardContent, Divider, Box } from '@mui/material';

type Props = {
  title: string;
  footer?: string | JSX.Element;
  children: JSX.Element;
};

const ParentCard: React.FC<Props> = ({ title, children, footer }) => {
  return (
    <Card sx={{ padding: 0, border: 'none' }} elevation={0} variant={undefined}>
      <CardHeader title={title} />
      <Divider />

      <CardContent>{children}</CardContent>
      {footer ? (
        <>
          <Divider />
          <Box p={3}>{footer}</Box>
        </>
      ) : (
        ''
      )}
    </Card>
  );
};

export default ParentCard;
