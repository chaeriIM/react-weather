import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import locationIcon from "./assets/locationicon.png";
import clothesIcon from "./assets/clothesicon.png";

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_WEATHER_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}&lang=kr`;

  //현재 위치 날씨
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude; //위도
        const lon = position.coords.longitude; //경도
        console.log("위도 경도", lat, lon);
        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=kr`;
          const response = await axios.get(url);
          setData(response.data);
          setLoading(false);
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
  }, [API_KEY]);

  //검색
  const searchLoaction = (event) => {
    if (event.key === "Enter") {
      if (!/^[A-Za-z\s]+$/.test(location)) {
        alert("지역을 영어로 입력해주세요.");
        return;
      }
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
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
      return "민소매, 반팔, 반바지, 원피스";
    } else if (22 < temp && temp < 28) {
      return "반팔, 얇은 셔츠, 반바지, 면바지";
    } else if (19 < temp && temp < 23) {
      return "얇은 가디건, 긴팔, 면바지, 청바지";
    } else if (16 < temp && temp < 20) {
      return "얇은 니트, 맨투맨, 가디건, 청바지";
    } else if (11 < temp && temp < 17) {
      return "자켓, 가디건, 야상, 스타킹, 청바지, 면바지";
    } else if (8 < temp && temp < 12) {
      return "자켓, 트렌치코트, 야상, 니트, 청바지, 스타킹";
    } else if (4 < temp && temp < 9) {
      return "코트, 가죽자켓, 히트텍, 니트, 레깅스";
    } else if (temp < 5) {
      return "패딩, 두꺼운코트, 목도리, 기모제품";
    }
  };

  return (
    <div className="app">
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
              <img src={locationIcon} alt="locationicon" />
              <p>
                {data.name}{" "}
                {data.sys && data.sys.country && `, ${data.sys.country}`}
              </p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </div>
            <div className="icon">
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
              <img src={clothesIcon} alt="clothesIcon" />
              <br></br>
              <p>{clothesRecommendation()}</p>
            </div>
          )}

          {data.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{data.main.feels_like.toFixed()}°</p>
                ) : null}
                <p>체감 온도</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity}%</p>
                ) : null}
                <p>습도</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed}m/s</p>
                ) : null}
                <p>풍속</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Weather;
