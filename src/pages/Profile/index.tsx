import React from 'react';

import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import Breadcrumb from '@components/Breadcrumb';
import { CustomFormLabel } from '@components/Label';
import ParentCard from '@components/ParentCard';

const Profile: React.FC = () => {
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Perfil',
    },
  ];
  return (
    <>
      <Grid container justifyContent={'space-between'} my={5}>
        <Grid item xs={10}>
          <Breadcrumb
            title="Perfil"
            subtitle="Aqui você encontrará as informações do seu perfil"
            items={BCrumb}
          />
        </Grid>
      </Grid>

      <ParentCard title="Informações pessoais">
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
                <form>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-cpwd"
                  >
                    Current Password
                  </CustomFormLabel>
                  <TextField
                    id="text-cpwd"
                    value="MathewAnderson"
                    variant="outlined"
                    fullWidth
                    type="password"
                  />
                  {/* 2 */}
                  <CustomFormLabel htmlFor="text-npwd">
                    New Password
                  </CustomFormLabel>
                  <TextField
                    id="text-npwd"
                    value="MathewAnderson"
                    variant="outlined"
                    fullWidth
                    type="password"
                  />
                  {/* 3 */}
                  <CustomFormLabel htmlFor="text-conpwd">
                    Confirm Password
                  </CustomFormLabel>
                  <TextField
                    id="text-conpwd"
                    value="MathewAnderson"
                    variant="outlined"
                    fullWidth
                    type="password"
                  />
                </form>
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
                <form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <CustomFormLabel
                        sx={{
                          mt: 0,
                        }}
                        htmlFor="text-name"
                      >
                        Your Name
                      </CustomFormLabel>
                      <TextField
                        id="text-name"
                        value="Mathew Anderson"
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
                        htmlFor="text-store-name"
                      >
                        Store Name
                      </CustomFormLabel>
                      <TextField
                        id="text-store-name"
                        value="Maxima Studio"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* 3 */}
                      <CustomFormLabel
                        sx={{
                          mt: 0,
                        }}
                        htmlFor="text-location"
                      >
                        Location
                      </CustomFormLabel>
                      <Select
                        fullWidth
                        id="text-location"
                        variant="outlined"
                        value={location}
                        onChange={() => {}}
                      >
                        <MenuItem key={'option.value'} value={'option.value'}>
                          {'option.label'}
                        </MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* 4 */}
                      <CustomFormLabel
                        sx={{
                          mt: 0,
                        }}
                        htmlFor="text-currency"
                      >
                        Currency
                      </CustomFormLabel>
                      <Select
                        fullWidth
                        id="text-currency"
                        variant="outlined"
                        value={''}
                        onChange={() => {}}
                      >
                        <MenuItem value={'option.value'}>option.label</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* 5 */}
                      <CustomFormLabel
                        sx={{
                          mt: 0,
                        }}
                        htmlFor="text-email"
                      >
                        Email
                      </CustomFormLabel>
                      <TextField
                        id="text-email"
                        value="info@modernize.com"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* 6 */}
                      <CustomFormLabel
                        sx={{
                          mt: 0,
                        }}
                        htmlFor="text-phone"
                      >
                        Phone
                      </CustomFormLabel>
                      <TextField
                        id="text-phone"
                        value="+91 12345 65478"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {/* 7 */}
                      <CustomFormLabel
                        sx={{
                          mt: 0,
                        }}
                        htmlFor="text-address"
                      >
                        Address
                      </CustomFormLabel>
                      <TextField
                        id="text-address"
                        value="814 Howard Street, 120065, India"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: 'end' }}
              mt={3}
            >
              <Button size="large" variant="contained" color="primary">
                Save
              </Button>
              <Button size="large" variant="text" color="error">
                Cancel
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </ParentCard>
    </>
  );
};

export default Profile;
