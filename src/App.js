import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { NavBar } from './components/NavBar';
import { ImagesList } from './components/ImagesList';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div>
      <NavBar />
      <Container>
        <ImagesList />
      </Container>
    </div>

  );
}

export default App;
