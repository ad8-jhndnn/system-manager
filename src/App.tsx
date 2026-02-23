import './App.css';
//import { Kit, Flow } from './system/kit';
import { Grid } from '@mui/material';
import FlowView from './flow/FlowView';
import { ReactFlowProvider } from '@xyflow/react';
import KitView from './KitView';


// declare const window: Window &
  // typeof globalThis & {
  //   updateFlows: (flows: Flow[]) => void;
  // };

function App() {
  // function onKitChanged(newKit: Kit) {
  //   window.updateFlows(newKit.items.flatMap(item => item.flows));
  // }

  return (
    <ReactFlowProvider>
      <div className="App" style={{ width: '100vw', height: '100vh' }}>
        <Grid container width={'100%'} height={'100%'}>
          <Grid size={12} height={"50%"}>
            <KitView/>
          </Grid>
          <Grid size={12} height={"50%"}>
            <FlowView/>
          </Grid>
        </Grid>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
