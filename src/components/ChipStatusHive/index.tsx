import React from 'react';

import { Chip, ChipProps } from '@mui/material';
import { EHiveStatus } from 'utils/enums';

import { enums } from '@utils';

interface ChipStatusHiveProps extends ChipProps {
  status?: EHiveStatus;
}

const ChipStatusHive: React.FC<ChipStatusHiveProps> = ({
  status,
  ...props
}) => {
  return (
    <Chip
      sx={{
        bgcolor:
          status === enums.EHiveStatus.PRODUCTIVE
            ? (theme) => theme.palette.success.light
            : status === enums.EHiveStatus.DEVELOPMENT
            ? (theme) => theme.palette.info.light
            : status === enums.EHiveStatus.CAPTURE
            ? (theme) => theme.palette.warning.light
            : status === enums.EHiveStatus.EMPTY_BOX
            ? (theme) => theme.palette.error.light
            : (theme) => theme.palette.secondary.light,
        color:
          status === enums.EHiveStatus.PRODUCTIVE
            ? (theme) => theme.palette.success.main
            : status === enums.EHiveStatus.DEVELOPMENT
            ? (theme) => theme.palette.text.secondary
            : status === enums.EHiveStatus.CAPTURE
            ? (theme) => theme.palette.warning.main
            : status === enums.EHiveStatus.EMPTY_BOX
            ? (theme) => theme.palette.error.main
            : (theme) => theme.palette.secondary.main,
        borderRadius: '8px',
      }}
      size="small"
      label={
        status === enums.EHiveStatus.PRODUCTIVE
          ? 'Saudável'
          : status === enums.EHiveStatus.CAPTURE
          ? 'Captura'
          : status === enums.EHiveStatus.EMPTY_BOX
          ? 'Caixa vazia'
          : status === enums.EHiveStatus.DEVELOPMENT
          ? 'Em desenvolvimento'
          : 'Não informado'
      }
      {...props}
    />
  );
};

export default ChipStatusHive;
