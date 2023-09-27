import React from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import { useToggle } from 'ahooks';

interface DeleteButtonProps {
  modalTitle: string;
  modalMessage: string;
  onConfirm: () => void;
  isLoading: boolean;
  children: React.ReactNode;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  modalMessage,
  modalTitle,
  children,
  isLoading,
  onConfirm,
}) => {
  const deleteToggle = useToggle(false);

  return (
    <>
      <Button
        sx={{ marginLeft: 2 }}
        variant="contained"
        color="error"
        size="large"
        onClick={deleteToggle[1].toggle}
      >
        {children}
      </Button>
      <Dialog
        open={deleteToggle[0]}
        onClose={deleteToggle[1].toggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modalMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteToggle[1].toggle}>Cancelar</Button>
          <LoadingButton
            onClick={() => {
              onConfirm();
              deleteToggle[1].toggle();
            }}
            color="error"
            variant="contained"
            autoFocus
            loading={isLoading}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButton;
