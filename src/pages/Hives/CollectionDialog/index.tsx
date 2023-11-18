import React, { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import useCollection from 'hooks/Collection';
import { enqueueSnackbar } from 'notistack';
import { useMutation } from 'react-query';

interface CollectionDialogProps {
  open: boolean;
  handleClose: () => void;
  hive: Hive;
}

const CollectionDialog: React.FC<CollectionDialogProps> = ({
  handleClose,
  open,
  hive,
}) => {
  const { createCollection } = useCollection();
  const [quantity, setQuantity] = useState(0);

  const createCollectionRequest = useMutation(
    () => createCollection({ quantity, hive: hive.id }),
    {
      onSuccess: () => {
        enqueueSnackbar('Coleta cadastrada com sucesso', {
          variant: 'success',
        });
        handleClose();
      },
      onError: () => {
        enqueueSnackbar('Ocorreu um erro ao cadastrar a coleta', {
          variant: 'error',
        });
      },
    }
  );

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Registrar coleta</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Cadastre uma nova coleta feita para a colméia{' '}
          <strong>{hive.name}</strong>. Lembre-se que ao fazer uma coleta a
          hora, data e o usuário que fez a coleta serão registrados.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="quantity"
          label="Quantidade de mel"
          type="number"
          onChange={(e) => setQuantity(Number(e.target.value))}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton
          loading={createCollectionRequest.isLoading}
          onClick={() => {
            createCollectionRequest.mutate();
          }}
          variant="contained"
          color="secondary"
        >
          Subscribe
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CollectionDialog;
