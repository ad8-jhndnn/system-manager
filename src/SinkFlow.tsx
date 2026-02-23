import { Flow } from "./system/kit";
import useKitStore from "./system/store";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export default function SinkFlow({ flow, flowId }: { flow: Flow, flowId: string }) {

  const updateFlowRoute = useKitStore((s) => s.updateFlowRoute);
  const flows = useKitStore((s) => s.flows);

  const handleChange = (event: SelectChangeEvent) => {
    updateFlowRoute(flowId, event.target.value as string);
  };

  return <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
    <InputLabel id="demo-select-small-label">{flow.label}</InputLabel>
    <Select
      label={flow.label}
      labelId="demo-select-small-label"
      value={flow.routeId} onChange={handleChange}>
      {flow.routeChoices.map((rc, index) => (
        <MenuItem key={index} value={rc}>{flows[rc]?.fullName || rc}</MenuItem>
      ))}
    </Select>
  </FormControl>;
}