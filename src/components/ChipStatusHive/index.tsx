import React from 'react';

import { Chip, ChipProps } from '@mui/material';

interface ChipStatusHiveProps extends ChipProps {
  status?: string;
}

const ChipStatusHive: React.FC<ChipStatusHiveProps> = ({
  status,
  ...props
}) => {
  return (
    <Chip
      sx={{
        bgcolor:
          status === 'HEALTHY'
            ? (theme) => theme.palette.success.light
            : status === 'DECLINING'
            ? (theme) => theme.palette.warning.light
            : status === 'DEAD_OR_ABANDONED'
            ? (theme) => theme.palette.error.light
            : (theme) => theme.palette.secondary.light,
        color:
          status === 'HEALTHY'
            ? (theme) => theme.palette.success.main
            : status === 'DECLINING'
            ? (theme) => theme.palette.warning.main
            : status === 'DEAD_OR_ABANDONED'
            ? (theme) => theme.palette.error.main
            : (theme) => theme.palette.secondary.main,
        borderRadius: '8px',
      }}
      size="small"
      label={
        status === 'HEALTHY'
          ? 'Saudável'
          : status === 'DECLINING'
          ? 'Declínio'
          : status === 'DEAD_OR_ABANDONED'
          ? 'Morta ou abandonada'
          : 'Não informado'
      }
      {...props}
    />
  );
};

export default ChipStatusHive;
