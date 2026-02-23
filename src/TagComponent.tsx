import { Flow } from "./system/kit";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import useKitStore from "./system/store";
import { MouseEventHandler } from "react";
export default function TagComponent({ flow, flowId }: { flow: Flow, flowId: string }) {

  const addTag = useKitStore((s) => s.addTag);

  const buttonHandler = () => {
    addTag(flowId, "foo");
  }

  return <div>
    <Stack direction="row" spacing={1} sx={{ marginTop: "2px" }}>
      {flow.tags.map((tag, index) => (
        <div key={index} style={{ background: "lightblue", border: "1px solid black", margin: "2px", padding: "2px" }}>
          {tag}
        </div>

      ))}<Button
        variant="contained"
        size="small"
        onClick={(e) => buttonHandler()}>+</Button>
    </Stack> </div>;
}