import React from 'react';

import {
  Box,
  Button,
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

import { enums, errors } from '@utils';

interface HiveInfoProps {
  initialValues?: HiveFormValues;
  createRequest: UseMutationResult<any, unknown, any, unknown>;
}

const HiveInfo: React.FC<HiveInfoProps> = ({
  initialValues,
  createRequest,
}) => {
  const navigate = useNavigate();
  const { listUsers } = useAuthentication();

  const fetchUsers = useQuery('users', listUsers);

  const formik = useFormik({
    initialValues: {
      name: '',
      status: '',
      queen_status: '',
      q_total: 0,
      q_cf: 0,
      q_ca: 0,
      q_cv: 0,
      q_ci: 0,
      comments: '',
      ...initialValues,
    },
    validationSchema: yup.object({
      name: yup.string().required(errors.required),
      comments: yup.string().required(errors.required),
      status: yup.string().required(errors.required),
      queen_status: yup.string().required(errors.required),
    }),
    onSubmit: (values) => {
      createRequest.mutate(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <ParentCard
        title="Colméia"
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
        <Grid container spacing={3} p={3}>
          <Grid item xs={12}>
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
                      error={formik.touched.name && Boolean(formik.errors.name)}
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
                        formik.touched.status && Boolean(formik.errors.status)
                      }
                      fullWidth
                      variant="outlined"
                    >
                      <MenuItem value={enums.EHiveStatus.CAPTURE}>
                        <Chip
                          label="Captura"
                          color="warning"
                          variant="outlined"
                          size="small"
                        />
                      </MenuItem>
                      <MenuItem value={enums.EHiveStatus.DEVELOPMENT}>
                        <Chip
                          label="Desenvolvimento"
                          color="info"
                          variant="outlined"
                        />
                      </MenuItem>
                      <MenuItem value={enums.EHiveStatus.PRODUCTIVE}>
                        <Chip
                          label="Produtiva"
                          color="success"
                          variant="outlined"
                        />
                      </MenuItem>

                      <MenuItem value={enums.EHiveStatus.EMPTY_BOX}>
                        <Chip
                          label="Caixa vazia"
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
                      htmlFor="queen_status"
                    >
                      Status da rainha *
                    </CustomFormLabel>
                    <Select
                      id="queen_status"
                      name="queen_status"
                      value={formik.values.queen_status}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.queen_status &&
                        Boolean(formik.errors.queen_status)
                      }
                      fullWidth
                      variant="outlined"
                    >
                      <MenuItem value={enums.EHiveGenericStatus.GOOD}>
                        <Chip
                          label="Bom"
                          color="success"
                          variant="outlined"
                          size="small"
                        />
                      </MenuItem>
                      <MenuItem value={enums.EHiveGenericStatus.REGULAR}>
                        <Chip
                          label="Regular"
                          color="warning"
                          variant="outlined"
                        />
                      </MenuItem>
                      <MenuItem value={enums.EHiveGenericStatus.WEAK}>
                        <Chip label="Fraca" color="error" variant="outlined" />
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
                      htmlFor="q_total"
                    >
                      Quadros totais
                    </CustomFormLabel>
                    <TextField
                      id="q_total"
                      name="q_total"
                      type="number"
                      value={formik.values.q_total}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.q_total && Boolean(formik.errors.q_total)
                      }
                      helperText={
                        formik.touched.q_total && formik.errors.q_total
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
                      htmlFor="q_cf"
                    >
                      Quadros com cria fechada
                    </CustomFormLabel>
                    <TextField
                      id="q_cf"
                      name="q_cf"
                      type="number"
                      value={formik.values.q_cf}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.q_cf && Boolean(formik.errors.q_cf)}
                      helperText={formik.touched.q_cf && formik.errors.q_cf}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="q_ca"
                    >
                      Quadros com cria aberta
                    </CustomFormLabel>
                    <TextField
                      id="q_ca"
                      name="q_ca"
                      type="number"
                      value={formik.values.q_ca}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.q_ca && Boolean(formik.errors.q_ca)}
                      helperText={formik.touched.q_ca && formik.errors.q_ca}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="q_cv"
                    >
                      Quadros com cria vazia
                    </CustomFormLabel>
                    <TextField
                      id="q_cv"
                      name="q_cv"
                      type="number"
                      value={formik.values.q_cv}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.q_cv && Boolean(formik.errors.q_cv)}
                      helperText={formik.touched.q_cv && formik.errors.q_cv}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="comments"
                    >
                      Descrição
                    </CustomFormLabel>
                    <TextField
                      id="comments"
                      name="comments"
                      value={formik.values.comments}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.comments &&
                        Boolean(formik.errors.comments)
                      }
                      helperText={
                        formik.touched.comments && formik.errors.comments
                      }
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>
        </Grid>
      </ParentCard>
    </FormikProvider>
  );
};

export default HiveInfo;
