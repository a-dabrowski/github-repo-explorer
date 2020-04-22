import React from 'react';
import Container from '@material-ui/core/Container';
import logo from './logo.svg';
import { List } from './components/list';
import './App.css';

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
