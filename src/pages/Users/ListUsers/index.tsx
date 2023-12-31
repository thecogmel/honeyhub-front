import React, { useState } from 'react';

import {
  Button,
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
import { MdMoreVert, MdOutlineRemoveRedEye } from 'react-icons/md';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useAuthentication } from '@hooks';

import Breadcrumb from '@components/Breadcrumb';
import ParentCard from '@components/ParentCard';

import RoutesPath from '@router/routes';
import { enums } from '@utils';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Usuários',
  },
];

const Users: React.FC = () => {
  const navigate = useNavigate();
  const { listUsers } = useAuthentication();

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

  const handleSelectedClick = (id: number) => {
    navigate(
      RoutesPath.private.detailUser.path.replace(':userId', id.toString())
    );
    setAnchorEl(null);
  };

  const fetchUsers = useQuery('users', listUsers, {
    onError: () => {
      enqueueSnackbar('Não foi possível obter os dados dos usuários', {
        variant: 'error',
      });
    },
  });

  return (
    <>
      <Grid container justifyContent={'space-between'} my={5}>
        <Grid item xs={10}>
          <Breadcrumb
            title="Usuários"
            subtitle="Aqui você encontrará a lista de todas os usuários disponíveis"
            items={BCrumb}
          />
        </Grid>
        <Grid item>
          <Button
            size="large"
            onClick={() => navigate(RoutesPath.private.createUser.path)}
            variant="contained"
          >
            Novo usuário
          </Button>
        </Grid>
      </Grid>

      <ParentCard title="Usuário">
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
                  <Typography variant="h6">Nome</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Username</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Email</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Função</Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {fetchUsers.data?.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                  }}
                >
                  <TableCell>
                    <Typography variant="h6">{user.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{user.username}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{user.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{enums.EUserRoleMap[user.role]}</Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(event) => handleClick(event, user.id)}
                    >
                      <MdMoreVert width={18} />
                    </IconButton>
                  </TableCell>
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
          </Menu>
        </TableContainer>
      </ParentCard>
    </>
  );
};

export default Users;
