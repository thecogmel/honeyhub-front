import React from 'react';

import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { UseMutationResult } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { CustomFormLabel } from '@components/Label';
import ParentCard from '@components/ParentCard';

import { enums, errors } from '@utils';

interface UserInfoProps {
  initialValues?: UserFormValues;
  createRequest: UseMutationResult<any, unknown, any, unknown>;
}

const UserInfo: React.FC<UserInfoProps> = ({
  initialValues,
  createRequest,
}) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      role: '',
      ...initialValues,
    },
    validationSchema: yup.object({
      name: yup.string().required(errors.required),
      username: yup.string().required(errors.required),
      password: yup.string().required(errors.required),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], errors.passwordConfirm)
        .required(errors.required),
      email: yup.string().email(errors.email).required(errors.required),
      role: yup.string().required(errors.required),
    }),
    onSubmit: (values) => {
      createRequest.mutate(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <ParentCard
        title="Usuário"
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
            {createRequest.isLoading ? (
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
                      Nome do usuário *
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
                      htmlFor="username"
                    >
                      Username *
                    </CustomFormLabel>

                    <TextField
                      id="username"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      helperText={
                        formik.touched.username && formik.errors.username
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
                      htmlFor="password"
                    >
                      Password*
                    </CustomFormLabel>
                    <TextField
                      id="password"
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
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
                      htmlFor="confirmPassword"
                    >
                      Confime o password*
                    </CustomFormLabel>
                    <TextField
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      helperText={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
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
                      htmlFor="email"
                    >
                      Email
                    </CustomFormLabel>
                    <TextField
                      id="email"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="role"
                    >
                      Função *
                    </CustomFormLabel>
                    <Select
                      id="role"
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="role"
                      error={formik.touched.role && Boolean(formik.errors.role)}
                      fullWidth
                      variant="outlined"
                    >
                      <MenuItem value={enums.EUserRole.ADMIN}>
                        <Typography>
                          {enums.EUserRoleMap[enums.EUserRole.ADMIN]}
                        </Typography>
                      </MenuItem>
                      <MenuItem value={enums.EUserRole.MEMBER}>
                        <Typography>
                          {enums.EUserRoleMap[enums.EUserRole.MEMBER]}
                        </Typography>
                      </MenuItem>

                      <MenuItem value={enums.EUserRole.SUPPORT}>
                        <Typography>
                          {enums.EUserRoleMap[enums.EUserRole.SUPPORT]}
                        </Typography>
                      </MenuItem>
                    </Select>
                    {formik.touched.role && formik.errors.role && (
                      <FormHelperText sx={{ marginLeft: 2 }} error>
                        {formik.errors.role}
                      </FormHelperText>
                    )}
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

export default UserInfo;
