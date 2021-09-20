import './App.css';
import PixelCanvas from './components/PixelCanvas';

function App() {
  return (
    <div className="App">
      <PixelCanvas
        width={10}
        height={10}
        scale={80}
      ></PixelCanvas>
    </div>
  );
}

export default App;
