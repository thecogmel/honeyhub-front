import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { UseMutationResult, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useAuthentication } from '@hooks';

import { CustomFormLabel } from '@components/Label';
import ParentCard from '@components/ParentCard';

import { errors } from '@utils';

interface HiveInfoProps {
  initialValues?: HiveFormValues;
  createRequest: UseMutationResult<any, unknown, any, unknown>;
}

const HiveInfo: React.FC<HiveInfoProps> = ({
  initialValues,
  createRequest,
}) => {
  const navigate = useNavigate();
  const { getUsers } = useAuthentication();

  const fetchUsers = useQuery('users', getUsers);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      status: '',
      responsible_user: 0,
      ...initialValues,
    },
    validationSchema: yup.object({
      name: yup.string().required(errors.required),
      description: yup.string().required(errors.required),
      status: yup.string().required(errors.required),
      responsible_user: yup
        .number()
        .min(1, 'Selecione um usuário')
        .required(errors.required),
    }),
    onSubmit: (values) => {
      createRequest.mutate(values);
    },
  });

  return (
    <FormikProvider value={formik}>
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
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => formik.handleSubmit()}
            >
              Salvar
            </Button>
          </>
        }
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                {createRequest.isLoading || fetchUsers.isLoading ? (
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
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <CustomFormLabel
                          sx={{
                            mt: 0,
                          }}
                          htmlFor="name"
                        >
                          Nome da colméia *
                        </CustomFormLabel>

                        <TextField
                          id="name"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.name && Boolean(formik.errors.name)
                          }
                          helperText={formik.touched.name && formik.errors.name}
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <CustomFormLabel
                          sx={{
                            mt: 0,
                          }}
                          htmlFor="description"
                        >
                          Descrição*
                        </CustomFormLabel>
                        <TextField
                          id="description"
                          name="description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                          }
                          helperText={
                            formik.touched.description &&
                            formik.errors.description
                          }
                          variant="outlined"
                          fullWidth
                        />
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
                          name="status"
                          value={formik.values.status}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.status &&
                            Boolean(formik.errors.status)
                          }
                          fullWidth
                          variant="outlined"
                        >
                          <MenuItem value={'HEALTHY'}>
                            <Chip
                              label="Saudável"
                              color="success"
                              variant="outlined"
                              size="small"
                            />
                          </MenuItem>
                          <MenuItem value={'DECLINING'}>
                            <Chip
                              label="Declínio"
                              color="warning"
                              variant="outlined"
                            />
                          </MenuItem>
                          <MenuItem value={'DEAD_OR_ABANDONED'}>
                            <Chip
                              label="Morta ou abandonada"
                              color="error"
                              variant="outlined"
                            />
                          </MenuItem>
                        </Select>
                        {formik.touched.status && formik.errors.status && (
                          <FormHelperText sx={{ marginLeft: 2 }} error>
                            {formik.errors.status}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <CustomFormLabel
                          sx={{
                            mt: 0,
                          }}
                          htmlFor="responsible_user"
                        >
                          Usuário responsável *
                        </CustomFormLabel>
                        <Select
                          id="responsible_user"
                          name="responsible_user"
                          value={formik.values.responsible_user}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.responsible_user &&
                            Boolean(formik.errors.responsible_user)
                          }
                          fullWidth
                          variant="outlined"
                        >
                          <MenuItem value={0}>Selecione um usuário</MenuItem>
                          {fetchUsers.data?.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                              {user.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.touched.responsible_user &&
                          formik.errors.responsible_user && (
                            <FormHelperText sx={{ marginLeft: 2 }} error>
                              {formik.errors.responsible_user}
                            </FormHelperText>
                          )}
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ParentCard>
    </FormikProvider>
  );
};

export default HiveInfo;
