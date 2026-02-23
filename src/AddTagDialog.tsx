import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';



export default function AddTagDialog({ onClose }: { onClose: (newTag: string) => void }) {

  const [open, setOpen] = React.useState(false);
  const [newTag, setNewTag] = React.useState('');

  return (
    <div>
      <IconButton size='small' onClick={() => setOpen(true)}>
        <Add fontSize="small" />
      </IconButton>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>Add Tag</DialogTitle>
        <Stack spacing={2} padding={2}>
          <TextField
            required
            id="name-field"
            label="Name"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            variant="outlined"
          />
          <Button onClick={() => {
            onClose(newTag);
            setOpen(false);
          }} variant="contained">Add</Button>
        </Stack>
      </Dialog>
    </div>
  );
}