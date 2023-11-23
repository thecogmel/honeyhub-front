import React, { useState } from 'react';

import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import {
  MdMoreVert,
  MdOutlineHive,
  MdOutlineRemoveRedEye,
} from 'react-icons/md';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { EHiveStatus } from 'utils/enums';

import { useHives } from '@hooks';

import Breadcrumb from '@components/Breadcrumb';
import ChipStatusHive from '@components/ChipStatusHive';
import ParentCard from '@components/ParentCard';

import RoutesPath from '@router/routes';

import CollectionDialog from '../CollectionDialog';

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
  const [openDialog, setOpenDialog] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedID, setSelectedID] = useState<number>(0);

  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: React.SetStateAction<number>
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedID(id);
  };
  const handleOpenCollectDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseCollectDialog = () => {
    setOpenDialog(false);
  };

  const fecthHives = useQuery('hives', listHives, {
    onError: () => {
      enqueueSnackbar('Não foi possível obter os dados das colméias', {
        variant: 'error',
      });
    },
  });

  const handleSelectedClick = (id: number) => {
    navigate(
      RoutesPath.private.detailHive.path.replace(':hiveId', id.toString())
    );
  };

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
                          <Typography variant="h6">Código</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            Status da colméia
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            Última atualização
                          </Typography>
                        </TableCell>
                        <TableCell></TableCell>
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
                        >
                          <TableCell>
                            <Typography variant="h6">{hive.name}</Typography>
                          </TableCell>
                          <TableCell>
                            <ChipStatusHive
                              status={hive.status as EHiveStatus}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6">
                              {new Date(hive.modified).toLocaleString('pt-br')}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              id="basic-button"
                              aria-controls={open ? 'basic-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              onClick={(event) => handleClick(event, hive.id)}
                            >
                              <MdMoreVert width={18} />
                            </IconButton>
                          </TableCell>
                          <CollectionDialog
                            open={openDialog}
                            handleClose={handleCloseCollectDialog}
                            hive={hive}
                          />
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={() => handleSelectedClick(selectedID)}>
                      <ListItemIcon>
                        <MdOutlineRemoveRedEye width={18} />
                      </ListItemIcon>
                      Visualizar
                    </MenuItem>
                    <MenuItem onClick={handleOpenCollectDialog}>
                      <ListItemIcon>
                        <MdOutlineHive width={18} />
                      </ListItemIcon>
                      Cadastrar coleta
                    </MenuItem>
                  </Menu>
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
