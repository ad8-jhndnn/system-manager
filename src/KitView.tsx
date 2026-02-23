import ItemsList from './ItemsList';
import AddItemDialog from './AddItemDialog';
import { Grid, Stack } from '@mui/material';
import RouteList from './RouteList';
import { AppState } from "./system/store"
import { AddItemInfo } from "./system/store"
import useStore from './system/store';
import { useShallow } from 'zustand/react/shallow';

const selector = (state:AppState) => ({
  items: state.items,
  addItem: state.addItem,
});


function KitView() {
  const { items, addItem } = useStore(useShallow(selector));
  return (
    <Grid container width={'100%'} height={'100%'} bgcolor={"lightgray"}>
      <Grid size={2} border={'1px solid dimgray'}>
        <Stack sx={{ height: '100%', boxSizing: 'border-box', overflow: 'auto' }} spacing={0}>
          <AddItemDialog onClose={(results: AddItemInfo) => { addItem(results) }} />
          <ItemsList items={items} />
        </Stack>
      </Grid>
      <Grid size={10} height={'100%'} border={'1px solid dimgray'} bgcolor={"aliceblue"}>
        <RouteList items={items} />
      </Grid>
    </Grid>
  );
}

export default KitView;
