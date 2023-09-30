import React from 'react';

import {
  Box,
  Button,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useHives } from '@hooks';

import Breadcrumb from '@components/Breadcrumb';
import ChipStatusHive from '@components/ChipStatusHive';
import ParentCard from '@components/ParentCard';

import RoutesPath from '@router/routes';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Colmeias',
  },
];

const Hive: React.FC = () => {
  const navigate = useNavigate();
  const { listHives } = useHives();

  const fecthHives = useQuery('hives', listHives, {
    onError: () => {
      enqueueSnackbar('Não foi possível obter os dados das colméias', {
        variant: 'error',
      });
    },
  });

  return (
    <>
      <Grid container justifyContent={'space-between'} my={5}>
        <Grid item xs={10}>
          <Breadcrumb
            title="Colmeias"
            subtitle="Aqui você encontrará a lista de todas as colméias disponíveis"
            items={BCrumb}
          />
        </Grid>
        <Grid item>
          <Button
            size="large"
            onClick={() => navigate(RoutesPath.private.createHive.path)}
            variant="contained"
          >
            Nova colméia
          </Button>
        </Grid>
      </Grid>

      <ParentCard title="Colmeias">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
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
                          <Typography variant="h6">
                            Email responsável
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Status</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fecthHives.data?.map((hive) => (
                        <TableRow
                          key={hive.id}
                          hover
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            cursor: 'pointer',
                          }}
                          onClick={() =>
                            navigate(
                              RoutesPath.private.detailHive.path.replace(
                                ':hiveId',
                                hive.id
                              )
                            )
                          }
                        >
                          <TableCell>
                            <Typography variant="h6">{hive.id}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              color="textSecondary"
                              variant="h6"
                              fontWeight={400}
                            >
                              {hive.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography color="textSecondary" variant="h6">
                              {hive.responsible?.email || 'Sem responsável'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <ChipStatusHive status={hive.status} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </ParentCard>
    </>
  );
};

export default Hive;
