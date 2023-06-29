import logo from './logo.svg';
import './App.css';

function App() {
  // const API_KEY = process.env.REACT_APP_WEATHER_KEY;
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}`

  return (
    <div className="app">
      <div className="container">
        <div className="top">
          <div className="location">
            <p>Seoul</p>
          </div>
          <div className="temp">
            <h1>23.7°</h1>
          </div>
          <div className="description">
            <p>Clouds</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p>체감 온도 26.4°</p>
          </div>
          <div className="humidity">
            <p>습도 91%</p>
          </div>
          <div className="wind">
            <p>풍속 2.2m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
