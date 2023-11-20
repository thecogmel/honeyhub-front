import React from 'react';

import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

interface HistoryCollectionDialogProps {
  open: boolean;
  handleClose: () => void;
  collections: Collection[];
}

const HistoryCollectionDialog: React.FC<HistoryCollectionDialogProps> = ({
  handleClose,
  open,
  collections,
}) => {
  return (
    <Dialog scroll="paper" onClose={handleClose} open={open}>
      <DialogTitle>Histórico completo de alterações</DialogTitle>
      <List sx={{ pt: 0 }}>
        {collections
          .map((collection) => (
            <ListItem disableGutters key={collection.id}>
              <ListItemButton onClick={() => {}}>
                <ListItemText
                  primary={collection.quantity + ' kg'}
                  secondary={new Date(collection.created).toLocaleString()}
                />
              </ListItemButton>
            </ListItem>
          ))
          .reverse()}
      </List>
    </Dialog>
  );
};

export default HistoryCollectionDialog;
