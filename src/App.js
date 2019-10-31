import React from 'react';
import './App.css';

import { Container } from 'reactstrap';

import Board from './components/Board';
import TrainInput from './components/TrainInput';
import Clock from './components/Clock';

const App = () => {

  return (
    <Container fluid className="App">
      <Clock />
      <br/>
      <Board />
      <br/>
      <TrainInput/>
    </Container>
  );
}

export default App;
