import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import NumberField from './components/NumberField';
import Stack from '@mui/material/Stack';

import { AddItemInfo } from './system/store';


export default function AddItemDialog({ onClose }: { onClose: (results: AddItemInfo) => void }) {

  const [open, setOpen] = React.useState(false);

  const [results, setResults] = React.useState<AddItemInfo>({
    name: '',
    inputCount: 1,
    outputCount: 1,
    itemCount: 1,
    initialTag: ''
  });

  function setInputCount(value: number | null) {
    setResults(prev => ({ ...prev, inputCount: value ?? 1 }));
  }

  function setOutputCount(value: number | null) {
    setResults(prev => ({ ...prev, outputCount: value ?? 1 }));
  }

  function setItemCount(value: number | null) {
    setResults(prev => ({ ...prev, itemCount: value ?? 1 }));
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)} variant="contained">Add Item</Button>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>Add Item</DialogTitle>
        <Stack spacing={2} padding={2}>
          <TextField
            required
            id="name-field"
            label="Name"
            value={results.name}
            onChange={(e) => setResults(prev => ({ ...prev, name: e.target.value }))}
            variant="outlined"
          />
          <NumberField
            label="Input Count"
            min={0}
            max={10}
            value={results.inputCount}
            onValueChange={(value: number | null) => setInputCount(value)}
            size="medium" />

          <NumberField
            label="Output Count"
            min={0}
            max={10}
            value={results.outputCount}
            onValueChange={(value: number | null) => setOutputCount(value)}
            size="medium" />

          <NumberField
            label="Item Count"
            min={1}
            max={10}
            value={results.itemCount}
            onValueChange={(value: number | null) => setItemCount(value)}
            size="medium" />

          <TextField
            required
            id="tag-field"
            label="Initial Tag (optional)"
            value={results.initialTag}
            onChange={(e) => setResults(prev => ({ ...prev, initialTag: e.target.value }))}
            variant="outlined"
          />


          <Button onClick={() => {
            onClose(results);
            setOpen(false);
          }} variant="contained">Add</Button>
        </Stack>
      </Dialog>
    </div>
  );
}