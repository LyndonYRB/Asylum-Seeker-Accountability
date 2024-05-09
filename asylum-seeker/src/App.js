import './App.css';
import Floors from './components/Floors.jsx';
import Rooms from './components/Rooms.jsx';
import Guests from './components/Guests.jsx';
import Log from './components/Log.jsx';

export default function App() {
  return (
    <main>
      <div className='main-body'>
        <div className='title-bar'>
          <h2 className='title-text'>Mela Hotel Sign In/Out Log</h2>
        </div>
        <Floors />
        <Rooms />
        <Guests />
        <Log />
      </div>
    </main>
  );
}
