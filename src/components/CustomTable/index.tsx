import React from 'react';

import {
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import RoutesPath from '@router/routes';

import { TableType, basicsTableData } from './tableData';

const basics: TableType[] = basicsTableData;

const CustomTable: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        p: 0,
        border: 'none',
        position: 'relative',
      }}
    >
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">ID</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Nome</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Email responsável</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basics.map((basic) => (
              <TableRow
                key={basic.id}
                hover
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  cursor: 'pointer',
                }}
                onClick={() => navigate(RoutesPath.private.detailHive.path)}
              >
                <TableCell>
                  <Typography variant="h6">{basic.budget}</Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight={400}
                  >
                    {basic.pname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {basic.budget}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      bgcolor:
                        basic.status === 'Active'
                          ? (theme) => theme.palette.success.light
                          : basic.status === 'Pending'
                          ? (theme) => theme.palette.warning.light
                          : basic.status === 'Completed'
                          ? (theme) => theme.palette.primary.light
                          : basic.status === 'Cancel'
                          ? (theme) => theme.palette.error.light
                          : (theme) => theme.palette.secondary.light,
                      color:
                        basic.status === 'Active'
                          ? (theme) => theme.palette.success.main
                          : basic.status === 'Pending'
                          ? (theme) => theme.palette.warning.main
                          : basic.status === 'Completed'
                          ? (theme) => theme.palette.primary.main
                          : basic.status === 'Cancel'
                          ? (theme) => theme.palette.error.main
                          : (theme) => theme.palette.secondary.main,
                      borderRadius: '8px',
                    }}
                    size="small"
                    label={basic.status}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default CustomTable;
