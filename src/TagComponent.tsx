import { Flow } from "./system/kit";
import { Box, Button, FormControl, IconButton, Stack, TextField } from "@mui/material";
import useKitStore from "./system/store";
import { MouseEventHandler } from "react";
import { Add, AddBoxRounded, Remove } from "@mui/icons-material";
import AddTagDialog from "./AddTagDialog";
export default function TagComponent({ flow, flowId }: { flow: Flow, flowId: string }) {

  const addTag = useKitStore((s) => s.addTag);

  const buttonHandler = () => {

    addTag(flowId, "foo");
  }

  const removeTag = (tag: string) => {
    useKitStore.getState().removeTag(flowId, tag);
  }



  return <div>
    <Stack direction="row" spacing={1} sx={{ marginTop: "2px" }}>
      {flow.tags.map((tag, index) => (
        <div key={index} style={{ background: "lightblue", border: "1px solid black", margin: "2px", padding: "2px" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <div>{tag}</div>
            <IconButton size="small" onClick={() => removeTag(tag)}>
              <Remove fontSize="small" />
            </IconButton>
          </Box>
        </div>
      ))}<AddTagDialog onClose={(newTag) => addTag(flowId, newTag)} />
    </Stack> </div>;
}