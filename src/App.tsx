import React from 'react';
import Container from '@material-ui/core/Container';
import { RepoExplorer } from './components/repoExplorer';

function App() {
  return (
    <div className="App">
      <Container maxWidth="md">
      <RepoExplorer />
    </Container>
    </div>
  );
}

export default App;
