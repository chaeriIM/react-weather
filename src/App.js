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
            <p className="bold">26.4°</p>
            <p>체감 온도</p>
          </div>
          <div className="humidity">
            <p className="bold">91%</p>
            <p>습도</p>
          </div>
          <div className="wind">
            <p className="bold">2.2m/s</p>
            <p>풍속</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
