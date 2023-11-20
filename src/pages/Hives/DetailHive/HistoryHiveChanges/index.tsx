import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useToggle } from 'ahooks';
import { enqueueSnackbar } from 'notistack';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { changeFieldsHelper } from 'utils/helpers';

import { useHives } from '@hooks';

import HistoryHiveDialog from '../HistoryHiveDialog';

const HistoryHiveChanges: React.FC = () => {
  const { getHiveChanges } = useHives();
  const { hiveId } = useParams<{ hiveId: string }>();
  const [changesHive, { toggle }] = useToggle(false);

  const fetchHiveChanges = useQuery(
    ['changes', hiveId!],
    () => getHiveChanges(hiveId!),
    {
      enabled: !!hiveId,
      onError: () => {
        enqueueSnackbar('Erro ao buscar o histórico', {
          variant: 'error',
        });
      },
    }
  );

  return (
    <Grid item xs={6}>
      <Card title="Histórico de mudanças">
        <CardHeader
          title="Histórico de mudanças"
          subheader="- Últimas 5 alterações"
          action={
            <Button size="small" onClick={toggle}>
              Ver todas
            </Button>
          }
        />
        <HistoryHiveDialog
          open={changesHive}
          handleClose={toggle}
          changes={fetchHiveChanges.data || []}
        />

        <Divider />
        <CardContent>
          {fetchHiveChanges.isLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
              {fetchHiveChanges.data
                ?.slice(-5)
                .map((item) => (
                  <Grid container key={item.modified}>
                    <Grid item lg={4} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Alterado por:
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {item.registered_by}
                      </Typography>
                    </Grid>
                    <Grid item lg={4} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Data da alteração:
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {new Date(item.modified).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item lg={4} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Alterações:
                      </Typography>
                      {item.changed_fields.map((change, index) => (
                        <Typography
                          key={index}
                          variant="subtitle1"
                          fontWeight={600}
                          mb={0.5}
                        >
                          {changeFieldsHelper(change)}
                        </Typography>
                      ))}
                    </Grid>
                  </Grid>
                ))
                .reverse()}
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default HistoryHiveChanges;
