import './App.css';
import Index from './components/Background/index';
import Weather from './components/Weather/index';

function App() {
  return (
    <div className='main'>
      <div className='index'><Index /></div>
      <div className='weather'><Weather /></div>
    </div>
  );
}

export default App;
