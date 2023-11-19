import React from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { useAuth } from '@contexts/Auth';
import { useAuthentication } from '@hooks';

import Breadcrumb from '@components/Breadcrumb';
import { CustomFormLabel } from '@components/Label';
import ParentCard from '@components/ParentCard';

import { enums, errors } from '@utils';

import routes from './routes';

const Profile: React.FC = () => {
  const { userInfo } = useAuth();
  const { profileChangePassword } = useAuthentication();

  const requestChangePassword = useMutation(
    (values: ProfileRequestChangePassword) => profileChangePassword(values),
    {
      onSuccess: () => {
        enqueueSnackbar('Senha alterada com sucesso', { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar('Erro ao alterar senha', { variant: 'error' });
      },
    }
  );

  const passwordFormik = useFormik({
    initialValues: {
      old_password: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      old_password: yup.string().required(errors.required),
      password: yup.string().required(errors.required),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], errors.passwordConfirm)
        .required(errors.required),
    }),
    onSubmit: (values) => {
      requestChangePassword.mutateAsync({
        old_password: values.old_password,
        password: values.password,
      });
    },
  });

  const baseInfoFormik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      role: '',
      ...userInfo,
    },
    validationSchema: yup.object({
      name: yup.string().required(errors.required),
      username: yup.string().required(errors.required),
      email: yup.string().email(errors.email).trim().required(errors.required),
      role: yup.string().required(errors.required),
    }),
    onSubmit: (values) => {
      console.log('values', values);
    },
  });
  return (
    <>
      <Grid container justifyContent={'space-between'} my={5}>
        <Grid item xs={10}>
          <Breadcrumb
            title="Perfil"
            subtitle="Aqui você encontrará as informações do seu perfil"
            items={routes}
          />
        </Grid>
      </Grid>

      <ParentCard title="Dados sobre o seu perfil">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" mb={1}>
                  Alteração de senha
                </Typography>
                <Typography color="textSecondary" mb={3}>
                  Para mudar sua senha, confirme aqui
                </Typography>
                <FormikProvider value={passwordFormik}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="old_password"
                  >
                    Senha atual
                  </CustomFormLabel>
                  <TextField
                    id="old_password"
                    name="old_password"
                    value={passwordFormik.values.old_password}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    error={
                      passwordFormik.touched.old_password &&
                      Boolean(passwordFormik.errors.old_password)
                    }
                    helperText={
                      passwordFormik.touched.old_password &&
                      passwordFormik.errors.old_password
                    }
                    variant="outlined"
                    fullWidth
                    type="password"
                  />
                  {/* 2 */}
                  <CustomFormLabel htmlFor="password">
                    Nova senha
                  </CustomFormLabel>
                  <TextField
                    id="password"
                    name="password"
                    value={passwordFormik.values.password}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    error={
                      passwordFormik.touched.password &&
                      Boolean(passwordFormik.errors.password)
                    }
                    helperText={
                      passwordFormik.touched.password &&
                      passwordFormik.errors.password
                    }
                    variant="outlined"
                    fullWidth
                    type="password"
                  />
                  {/* 3 */}
                  <CustomFormLabel htmlFor="confirmPassword">
                    Confirmação de nova senha
                  </CustomFormLabel>
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordFormik.values.confirmPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    error={
                      passwordFormik.touched.confirmPassword &&
                      Boolean(passwordFormik.errors.confirmPassword)
                    }
                    helperText={
                      passwordFormik.touched.confirmPassword &&
                      passwordFormik.errors.confirmPassword
                    }
                    variant="outlined"
                    fullWidth
                    type="password"
                  />
                </FormikProvider>
                <Grid item>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ justifyContent: 'end' }}
                    mt={3}
                  >
                    <Button size="large" variant="text" color="error">
                      Voltar
                    </Button>

                    <Box>
                      <LoadingButton
                        size="large"
                        variant="contained"
                        color="primary"
                        loading={requestChangePassword.isLoading}
                        onClick={() => passwordFormik.handleSubmit()}
                      >
                        Salvar senha
                      </LoadingButton>
                    </Box>
                  </Stack>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Edit Details */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" mb={1}>
                  Informações pessoais
                </Typography>
                <Typography color="textSecondary" mb={3}>
                  Para alterar suas informações pessoais, confirme aqui
                </Typography>
                <FormikProvider value={baseInfoFormik}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <CustomFormLabel
                        sx={{
                          mt: 0,
                        }}
                        htmlFor="name"
                      >
                        Nome
                      </CustomFormLabel>
                      <TextField
                        id="name"
                        name="name"
                        value={baseInfoFormik.values.name}
                        onChange={baseInfoFormik.handleChange}
                        onBlur={baseInfoFormik.handleBlur}
                        error={
                          baseInfoFormik.touched.name &&
                          Boolean(baseInfoFormik.errors.name)
                        }
                        helperText={
                          baseInfoFormik.touched.name &&
                          baseInfoFormik.errors.name
                        }
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* 2 */}
                      <CustomFormLabel
                        sx={{
                          mt: 0,
                        }}
                        htmlFor="username"
                      >
                        Username
                      </CustomFormLabel>
                      <TextField
                        id="username"
                        name="username"
                        value={baseInfoFormik.values.username}
                        onChange={baseInfoFormik.handleChange}
                        onBlur={baseInfoFormik.handleBlur}
                        error={
                          baseInfoFormik.touched.username &&
                          Boolean(baseInfoFormik.errors.username)
                        }
                        helperText={
                          baseInfoFormik.touched.username &&
                          baseInfoFormik.errors.username
                        }
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* 5 */}
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
                        value={baseInfoFormik.values.email}
                        onChange={baseInfoFormik.handleChange}
                        onBlur={baseInfoFormik.handleBlur}
                        error={
                          baseInfoFormik.touched.email &&
                          Boolean(baseInfoFormik.errors.email)
                        }
                        helperText={
                          baseInfoFormik.touched.email &&
                          baseInfoFormik.errors.email
                        }
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* 4 */}
                      <CustomFormLabel
                        sx={{
                          mt: 0,
                        }}
                        htmlFor="role"
                      >
                        Cargo
                      </CustomFormLabel>
                      <Select
                        disabled
                        id="role"
                        name="role"
                        value={baseInfoFormik.values.role}
                        onChange={baseInfoFormik.handleChange}
                        onBlur={baseInfoFormik.handleBlur}
                        error={
                          baseInfoFormik.touched.role &&
                          Boolean(baseInfoFormik.errors.role)
                        }
                        fullWidth
                        variant="outlined"
                      >
                        {Object.values(enums.EUserRole).map((role) => (
                          <MenuItem key={role} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </Select>
                      {baseInfoFormik.touched.role &&
                        baseInfoFormik.errors.role && (
                          <FormHelperText error>
                            {baseInfoFormik.errors.role}
                          </FormHelperText>
                        )}
                    </Grid>
                  </Grid>
                </FormikProvider>
                <Grid item>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ justifyContent: 'end' }}
                    mt={3}
                  >
                    <Button size="large" variant="text" color="error">
                      Voltar
                    </Button>
                    <Tooltip title="Em construção!" arrow>
                      <Box>
                        <Button
                          disabled
                          size="large"
                          variant="contained"
                          color="primary"
                          onClick={() => baseInfoFormik.handleSubmit()}
                        >
                          Salvar dados
                        </Button>
                      </Box>
                    </Tooltip>
                  </Stack>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ParentCard>
    </>
  );
};

export default Profile;
