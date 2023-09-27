import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Breadcrumb from '@components/Breadcrumb';
import { CustomFormLabel } from '@components/Label';
import ParentCard from '@components/ParentCard';

import routes from '../DetailHive/routes';

const CreateHive: React.FC = () => {
  const navigate = useNavigate();
  const loading = false;
  return (
    <>
      <Grid container justifyContent={'space-between'} my={5}>
        <Grid item xs={6}>
          <Breadcrumb
            title="Colmeias"
            subtitle="Aqui você cadastrará uma nova colméia"
            items={routes}
          />
        </Grid>
      </Grid>
      <ParentCard
        title="Detalhamento da colméia"
        footer={
          <>
            <Button
              variant="outlined"
              color="error"
              size="large"
              sx={{
                mr: 1,
              }}
              onClick={() => navigate(-1)}
            >
              Voltar
            </Button>
            <Button variant="contained" color="primary" size="large">
              Salvar
            </Button>
          </>
        }
      >
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
                    <Grid container spacing={3}>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <CustomFormLabel
                          sx={{
                            mt: 0,
                          }}
                          htmlFor="name"
                        >
                          Nome da colméia *
                        </CustomFormLabel>

                        <TextField id="name" variant="outlined" fullWidth />
                      </Grid>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <CustomFormLabel
                          sx={{
                            mt: 0,
                          }}
                          htmlFor="email"
                        >
                          Email do responsável *
                        </CustomFormLabel>
                        <TextField id="email" variant="outlined" fullWidth />
                      </Grid>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <CustomFormLabel
                          sx={{
                            mt: 0,
                          }}
                          htmlFor="status"
                        >
                          Status *
                        </CustomFormLabel>
                        <Select
                          id="status"
                          value={''}
                          onChange={() => {}}
                          fullWidth
                          variant="outlined"
                        >
                          <MenuItem value={1}>{1}</MenuItem>
                        </Select>
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

export default CreateHive;
