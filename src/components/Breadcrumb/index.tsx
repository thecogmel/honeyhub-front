import React from 'react';

import { Box, Breadcrumbs, Grid, Typography } from '@mui/material';
import { VscCircleFilled } from 'react-icons/vsc';

interface BreadCrumbProps {
  subtitle?: string;
  items?: any[];
  title: string;
  children?: JSX.Element;
}

const Breadcrumb: React.FC<BreadCrumbProps> = ({
  subtitle,
  items,
  title,
  children,
}) => (
  <Grid
    container
    sx={{
      p: '30px 0 20px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Grid item xs={12} sm={6} lg={8} mb={1}>
      <Typography
        color="textSecondary"
        variant="h4"
        fontWeight={400}
        mt={0.8}
        mb={0}
      >
        {subtitle}
      </Typography>
      <Typography variant="h1" fontWeight={700}>
        {title}
      </Typography>
      <Breadcrumbs
        separator={
          <VscCircleFilled
            size="10"
            fill="textSecondary"
            fillOpacity={'0.6'}
            style={{ margin: '0 5px' }}
          />
        }
        sx={{ alignItems: 'center', mt: items ? '10px' : '' }}
        aria-label="breadcrumb"
      >
        {items
          ? items.map((item) => (
              <div key={item.title}>
                {item.to ? (
                  <Typography color="textSecondary">{item.title}</Typography>
                ) : (
                  <Typography color="textPrimary">{item.title}</Typography>
                )}
              </div>
            ))
          : ''}
      </Breadcrumbs>
    </Grid>
    <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
      <Box
        sx={{
          display: { xs: 'none', md: 'block', lg: 'flex' },
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        {children ? (
          <Box sx={{ top: '0px', position: 'absolute' }}>{children}</Box>
        ) : null}
      </Box>
    </Grid>
  </Grid>
);

export default Breadcrumb;
