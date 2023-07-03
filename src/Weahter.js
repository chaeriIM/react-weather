import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Weather() {

    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const API_KEY = process.env.REACT_APP_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}&lang=kr`;

    //검색
    const searchLoaction = (event) => {
        if (event.key === 'Enter'){
            if(!/^[A-Za-z]+$/.test(location)){
                alert('지역을 영어로 입력해주세요.');
                return;
            }
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                if(error.response && error.response.status === 404) {
                    alert('존재하지 않는 지역입니다.');
                } else {
                    alert('날씨 정보를 가져오는 중에 오류가 발생했습니다.');
                }
            });
        setLocation('')
        }
    }
    
    // const getCurrentLocation = () => {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     let lat = position.coords.latitude; //위도
    //     let lon = position.coords.longitude; //경도
    //     console.log('위도 경도', lat, lon);
    //   });
    // };
    // useEffect(() => {
    //   getCurrentLocation();
    // }, []);

    // const getWeather = async(lat, lon) => {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     let lat = position.coords.latitude; //위도
    //     let lon = position.coords.longitude; //경도
    //     console.log('위도 경도', lat, lon);
    //   });
    //   let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    //   let response = await fetch(url)
    //   let data = await response.json();
    //   console.log('현재 날씨 데이터', data);
    // }
    // useEffect(() => {
    //   getWeather();
    // }, []);

    //{data.sys.country}
    return (
        <div className="app">
        <div className="search">
            <input 
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyDown={searchLoaction}
            placeholder='지역을 입력해주세요.'
            type="text"/>
        </div>
        <div className="container">
            <div className="top">
            <div className="location">
                <p>{data.name}</p>
            </div>
            <div className="temp">
                {data.main ? <h1>{data.main.temp.toFixed()}°</h1> : null}
            </div>
            <div className="description">
                {data.weather ? <p>{data.weather[0].description}</p> : null}
                {data.weather ? <p><img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} /></p> : null}
            </div>
        </div>

        {data.name !== undefined &&
        <div className="bottom">
            <div className="feels">
                {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°</p> : null}
                <p>체감 온도</p>
            </div>
            <div className="humidity">
                {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                <p>습도</p>
            </div>
            <div className="wind">
                {data.wind ? <p className="bold">{data.wind.speed}m/s</p> : null}
                <p>풍속</p>
            </div>
        </div>
        }
        </div>
        </div>
    );
}

export default Weather;
