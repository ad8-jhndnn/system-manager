import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';

import { Item } from "./system/kit"

export default function ItemsList({ items }: { items: Item[] }) {
  return <List sx={{ maxHeight: '100%', boxSizing: 'border-box', overflow: 'auto' }}>
    {items.map((item, index) => (
      <ListItem key={index}>
        {item.name}
      </ListItem>
    ))}
  </List>;
}