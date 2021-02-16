import './App.css';
import LoginButton from './components/LoginButton';
import Hub from './components/Hub';
import { useAuth0 } from '@auth0/auth0-react';
import Spinner from 'react-bootstrap/Spinner'

function App() {
  const {isLoading} = useAuth0();
  if (isLoading) return (
    
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
    )

  return (
    <div>   
      <LoginButton/>
      <Hub />
    </div>
  );
}

export default App;
