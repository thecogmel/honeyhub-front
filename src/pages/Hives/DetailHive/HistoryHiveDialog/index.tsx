import React from 'react';

import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { changeFieldsHelper } from 'utils/helpers';

interface HistoryCollectionDialogProps {
  open: boolean;
  handleClose: () => void;
  changes: HiveChanges[];
}

const HistoryHiveDialog: React.FC<HistoryCollectionDialogProps> = ({
  handleClose,
  open,
  changes,
}) => {
  return (
    <Dialog scroll="paper" onClose={handleClose} open={open}>
      <DialogTitle>Histórico completo de alterações</DialogTitle>
      <List sx={{ pt: 0 }}>
        {changes
          .map((collection) => (
            <ListItem disableGutters key={crypto.randomUUID()}>
              <ListItemButton onClick={() => {}}>
                <ListItemText
                  secondary={new Date(collection.modified).toLocaleString()}
                  primary={
                    <>
                      <Typography variant="body2">
                        {collection.changed_fields.map((item, i) => (
                          <React.Fragment key={crypto.randomUUID()}>
                            {collection.changed_fields[i] !== 'modified' && (
                              <Typography variant="subtitle1" mb={0.5}>
                                {changeFieldsHelper(item)}
                                {i !== collection.changed_fields.length - 1 &&
                                  ','}
                              </Typography>
                            )}
                          </React.Fragment>
                        ))}
                      </Typography>
                      <Typography variant="body2">
                        Alterado por: {collection.registered_by}
                      </Typography>
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))
          .reverse()}
      </List>
    </Dialog>
  );
};

export default HistoryHiveDialog;
