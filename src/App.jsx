import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import ImagesList from './components/ImagesList';

const App = () => (
  <div>
    <NavBar />
    <Container>
      <ImagesList />
    </Container>
  </div>

);

export default App;
