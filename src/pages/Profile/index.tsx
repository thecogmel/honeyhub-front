import React from 'react';

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
import * as yup from 'yup';

import { useAuth } from '@contexts/Auth';

import Breadcrumb from '@components/Breadcrumb';
import { CustomFormLabel } from '@components/Label';
import ParentCard from '@components/ParentCard';

import { enums, errors } from '@utils';

import routes from './routes';

const Profile: React.FC = () => {
  const { userInfo } = useAuth();
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: yup.object({
      currentPassword: yup.string().required(errors.required),
      newPassword: yup.string().required(errors.required),
      confirmNewPassword: yup
        .string()
        .oneOf([yup.ref('password')], errors.passwordConfirm)
        .required(errors.required),
    }),
    onSubmit: (values) => {
      console.log('values', values);
    },
  });
  console.log(passwordFormik.errors);

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
                    htmlFor="currentPassword"
                  >
                    Senha atual
                  </CustomFormLabel>
                  <TextField
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordFormik.values.currentPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    error={
                      passwordFormik.touched.currentPassword &&
                      Boolean(passwordFormik.errors.currentPassword)
                    }
                    helperText={
                      passwordFormik.touched.currentPassword &&
                      passwordFormik.errors.currentPassword
                    }
                    variant="outlined"
                    fullWidth
                    type="password"
                  />
                  {/* 2 */}
                  <CustomFormLabel htmlFor="newPassword">
                    Nova senha
                  </CustomFormLabel>
                  <TextField
                    id="newPassword"
                    name="newPassword"
                    value={passwordFormik.values.newPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    error={
                      passwordFormik.touched.newPassword &&
                      Boolean(passwordFormik.errors.newPassword)
                    }
                    helperText={
                      passwordFormik.touched.newPassword &&
                      passwordFormik.errors.newPassword
                    }
                    variant="outlined"
                    fullWidth
                    type="password"
                  />
                  {/* 3 */}
                  <CustomFormLabel htmlFor="confirmNewPassword">
                    Confirmação de nova senha
                  </CustomFormLabel>
                  <TextField
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={passwordFormik.values.confirmNewPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    error={
                      passwordFormik.touched.confirmNewPassword &&
                      Boolean(passwordFormik.errors.confirmNewPassword)
                    }
                    helperText={
                      passwordFormik.touched.confirmNewPassword &&
                      passwordFormik.errors.confirmNewPassword
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
                    <Tooltip title="Em construção!" arrow>
                      <Box>
                        <Button
                          disabled
                          size="large"
                          variant="contained"
                          color="primary"
                          onClick={() => passwordFormik.handleSubmit()}
                        >
                          Salvar senha
                        </Button>
                      </Box>
                    </Tooltip>
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
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={() => baseInfoFormik.handleSubmit()}
                    >
                      Salvar dados
                    </Button>
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
