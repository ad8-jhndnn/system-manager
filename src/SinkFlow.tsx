import { Flow } from "./system/kit";
import useKitStore from "./system/store";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

export default function SinkFlow({ flow, flowId }: { flow: Flow, flowId: string }) {

  const updateFlowRoute = useKitStore((s)=>s.updateFlowRoute);
  const flows = useKitStore((s)=>s.flows);

  const handleChange = (event: SelectChangeEvent) => {
    updateFlowRoute(flowId, event.target.value as string);
  };

  return <div style={{background: "yellow"}}>{flow.label}
  <Select value={flow.routeId} onChange={handleChange}>
    {flow.routeChoices.map((rc, index)=>(
      <MenuItem key={index} value={rc}>{flows[rc]?.fullName || rc}</MenuItem>
    ))}
    </Select>
  </div>;
}