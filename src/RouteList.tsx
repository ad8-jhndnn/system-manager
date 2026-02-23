import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';

import { FlowDirection, FlowDomain, Item } from "./system/kit"
import Grid from "@mui/material/Grid";
import SourceFlow from "./SourceFlow";
import SinkFlow from "./SinkFlow";
import useKitStore from "./system/store";

export default function RouteList({ items }: { items: Item[] }) {

  const flows = useKitStore((s) => s.flows);

  return <List sx={{ width: '100%', maxHeight: '100%', boxSizing: 'border-box', overflow: 'auto' }}>
    {items.map((item, index) => (
      <ListItem key={index}>
        <Grid container sx={{ border: '1px solid black', padding: '1px' }} >
          <div>{item.name}</div>
          <List>
            {Object.keys(flows).filter(flowId => item.flowIds.includes(flowId)).map((flowId, flowIndex) => {
              const flow = flows[flowId]; 
              return <ListItem key={`${index}-${flowId}`}
               sx={{ margin: '1px', padding: '1px' }}>
                {flow.direction === FlowDirection.Source ? 
                <SourceFlow flow={flow} flowId={flowId} /> : 
                <SinkFlow flow={flow} flowId={flowId} />}
              </ListItem>
            })}
          </List>
        </Grid>
      </ListItem>
    ))}
  </List>;
}