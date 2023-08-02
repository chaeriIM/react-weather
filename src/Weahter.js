import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import locationIcon from "./assets/locationicon.png";
import clothesIcon from "./assets/clothesicon.png";
import humidityIcon from "./assets/humidityicon.png";
import sunsetIcon from "./assets/sunseticon.png";
import tempIcon from "./assets/tempicon.png";
import windIcon from "./assets/windicon.png";
import weatherDescKo from './weatherDescKo';

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [background, setBackground] = useState("");

  const API_KEY = process.env.REACT_APP_WEATHER_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  //현재 위치 날씨
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude; //위도
        const lon = position.coords.longitude; //경도
        console.log("위도 경도", lat, lon);
        try {
          const API_KEY = process.env.REACT_APP_WEATHER_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
          const response = await axios.get(url);
          setData(response.data);
          setLoading(false);
          setBackground(backgroundClass(response.data.weather[0].main));
          console.log(response.data);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );
  }, []);

  //검색
  const searchLoaction = (event) => {
    if (event.nativeEvent.isComposing === false && event.key === "Enter") {
      if (!/^[A-Za-z\s]+$/.test(location)) {
        alert("지역을 영어로 입력해주세요.");
        return;
      }
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setBackground(backgroundClass(response.data.weather[0].main));
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            alert("존재하지 않는 지역입니다.");
          } else {
            alert("날씨 정보를 가져오는 중에 오류가 발생했습니다.");
          }
        });
      setLocation("");
    }
  };

  const handleLocationClick = () => {
    window.location.reload(); //새로고침
  };

  //옷차림 추천
  const clothesRecommendation = () => {
    const temp = data.main.temp.toFixed();
    if (temp > 27) {
      return "민소매, 반팔, 반바지, 원피스 추천 ⸝ဗီူ⸜";
    } else if (22 < temp && temp <= 27) {
      return "반팔, 얇은 셔츠, 반바지, 면바지 추천 ⸝ဗီူ⸜";
    } else if (19 < temp && temp <= 22) {
      return "얇은 가디건, 긴팔, 면바지, 청바지 추천 ⸝ဗီူ⸜";
    } else if (16 < temp && temp <= 19) {
      return "얇은 니트, 맨투맨, 가디건, 청바지 추천 ⸝ဗီူ⸜";
    } else if (11 < temp && temp <= 16) {
      return "자켓, 가디건, 야상, 스타킹, 청바지, 면바지 추천 ⸝ဗီူ⸜";
    } else if (8 < temp && temp <= 11) {
      return "자켓, 트렌치코트, 야상, 니트, 청바지, 스타킹 추천 ⸝ဗီူ⸜";
    } else if (4 < temp && temp <= 8) {
      return "코트, 가죽자켓, 히트텍, 니트, 레깅스 추천 ⸝ဗီူ⸜";
    } else {
      return "패딩, 두꺼운코트, 목도리, 기모제품 ⸝ဗီူ⸜";
    }
  };

  //온도에 따른 배경
  const backgroundClass = (weatherMain) => {
    if (weatherMain === 'Thunderstorm') {
      return 'thunderstorm';
    } else if (weatherMain === 'Rain' || weatherMain === 'Drizzle') {
      return 'rain';
    } else if (weatherMain === 'Snow') {
      return 'snow';
    } else if (weatherMain === 'Dust' || weatherMain === 'Sand') {
      return 'dust';
    } else if (weatherMain === 'Mist' || weatherMain === 'Smoke' || weatherMain === 'Haze'
              || weatherMain === 'Fog' || weatherMain === 'Ash' || weatherMain === 'Squall') {
      return 'mist';
    } else if (weatherMain === 'Clear') {
      return 'clear';
    } else if (weatherMain === 'Clouds') {
      return 'clouds';
    }
  };

  //unix 시간 변환 함수
  function convertUnixTime(unixTime) {
    const date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let period = "오전";

    if(hours >= 12){
      period = "오후";
    }
    if(hours > 12) {
      hours -= 12;
    }

    minutes = minutes.toString().padStart(2, "0"); //ex)12:6 -> 12:06

    const formattedTime = `${period} ${hours}:${minutes}`;
    return formattedTime;
  }
  const sunsetTime = data.sys ? convertUnixTime(data.sys.sunset) : "";
  const sunriseTime = data.sys ? convertUnixTime(data.sys.sunrise) : "";

  //한글 설명
  function getKoreanWeatherDescription() {
    const code = data.weather[0].id
    const descriptionObj = weatherDescKo.find((desc) => Object.keys(desc)[0] === String(code));
    return descriptionObj ? Object.values(descriptionObj)[0] : '알 수 없는 날씨 상태';
  }

  return (
    <div className={`weather-container ${background}`}>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLoaction}
          placeholder="지역을 입력해주세요."
          type="text"
        />
      </div>

      {loading ? (
        <div className="loading">로딩중...</div>
      ) : (
        <div className="container">
          <div className="top">
            <div className="location" onClick={handleLocationClick}>
              <img src={locationIcon} alt="locationicon"/>
              <p>
                {data.name}, {data.sys ? <span>{data.sys.country}</span> : null }
              </p>
            </div>
            <div className="temp">
              <h1>{data.main.temp.toFixed()}°</h1>
            </div>
            <div className="description">
              {/* <p>{data.weather[0].description}</p> */}
              <p>{getKoreanWeatherDescription()}</p>
            </div>
            <div className="weathericon">
              {data.weather ? (
                <p>
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt="icon"
                  />
                </p>
              ) : null}
            </div>
          </div>

          {data.name !== undefined && (
            <div className="middle">
              <div className="box">
                <img src={tempIcon} alt="tempicon"/>
                <p>체감 온도</p>
                <p className="bold">{data.main.feels_like.toFixed()}°</p>
              </div>
              
              <div className="box">
                <img src={humidityIcon} alt="humidityicon"/>
                <p>습도</p>
                <p className="bold">{data.main.humidity}%</p>
              </div>
              <div className="box">
                <img src={windIcon} alt="locationicon"/>
                <p>풍속</p>
                <p className="bold">{data.wind.speed}m/s</p>
              </div>
              <div className="box">
                <img src={sunsetIcon} alt="sunseticon"/>
                <p>일몰</p>
                <p className="bold">{sunsetTime}</p>
                <span>일출: {sunriseTime}</span>
              </div>
            </div>
          )}

          {data.name !== undefined && (
            <div className="bottom">
              <img src={clothesIcon} alt="clothesIcon"/>
              <p>{clothesRecommendation()}</p>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
}

export default Weather;
