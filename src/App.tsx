import React from 'react';
import Container from '@material-ui/core/Container';
import { List } from './components/list';

function App() {
  return (
    <div className="App">
      <Container maxWidth="md">
      <List />
    </Container>
    </div>
  );
}

export default App;
