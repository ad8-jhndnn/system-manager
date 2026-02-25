import './App.css';
import { Grid } from '@mui/material';
import FlowView from './flow/FlowView';
import { ReactFlowProvider } from '@xyflow/react';
import KitView from './KitView';

function App() {
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
