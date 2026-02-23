import { Flow } from "./system/kit";
import { TextField } from "@mui/material";
import useKitStore from "./system/store";
export default function SourceFlow({ flow, flowId }: { flow: Flow, flowId: string }) {

  const updateFlowName = useKitStore((s)=>s.updateFlowName);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFlowName(flowId, event.target.value as string);
  };

  return <div style={{background: "orange" }}>{flow.label}
  <TextField value={flow.name} onChange={handleChange} /></div>;
}