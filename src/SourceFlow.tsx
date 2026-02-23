import { Flow } from "./system/kit";
import { FormControl, TextField } from "@mui/material";
import useKitStore from "./system/store";
export default function SourceFlow({ flow, flowId }: { flow: Flow, flowId: string }) {

  const updateFlowName = useKitStore((s) => s.updateFlowName);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFlowName(flowId, event.target.value as string);
  };

  return <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
    <TextField
       label={flow.label}
       value={flow.name} onChange={handleChange} size="small" />
       </FormControl>}