import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Breadcrumb from '@components/Breadcrumb';
import DeleteButton from '@components/DeleteButton';
import ParentCard from '@components/ParentCard';

import RoutesPath from '@router/routes';

import routes from './routes';

const DetailHive: React.FC = () => {
  const navigate = useNavigate();
  const loading = false;
  return (
    <>
      <Grid container justifyContent={'space-between'} my={5}>
        <Grid item xs={6}>
          <Breadcrumb title="Colmeias" items={routes} />
        </Grid>
        <Grid item>
          <Button
            size="large"
            onClick={() => navigate(RoutesPath.private.editHive.path)}
            variant="outlined"
          >
            Editar colméia
          </Button>
          <DeleteButton
            modalTitle={'Confirmação de exclusão de colméia'}
            modalMessage={'Deseja realmente excluir este colméia?'}
            onConfirm={() => console.log('delete')}
            isLoading={false}
          >
            Deletar Item
          </DeleteButton>
        </Grid>
      </Grid>
      <ParentCard title="Detalhamento da colméia">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card title="Colméia">
              <CardContent>
                {loading ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100px',
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      overflow: {
                        xs: 'auto',
                        sm: 'unset',
                      },
                    }}
                  >
                    <Grid container>
                      <Grid item lg={6} xs={12} mt={2}>
                        <Typography variant="body2" color="text.secondary">
                          Id da colméia
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          mb={0.5}
                          fontWeight={600}
                        >
                          teste
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12} mt={4}>
                        <Typography variant="body2" color="text.secondary">
                          Email do responsável
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          mb={0.5}
                        >
                          teste
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12} mt={4}>
                        <Typography variant="body2" color="text.secondary">
                          Nome da colméia
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          mb={0.5}
                        >
                          teste
                        </Typography>
                      </Grid>
                      <Grid item lg={6} xs={12} mt={4}>
                        <Typography variant="body2" color="text.secondary">
                          Condição da colméia
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          mb={0.5}
                          fontWeight={600}
                        >
                          teste
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ParentCard>
    </>
  );
};

export default DetailHive;
