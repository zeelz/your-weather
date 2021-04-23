import React, { Component, useState, useEffect } from 'react'; 
// import { BrowserRouter, NavLink, Redirect } from 'react-router-dom';
// import Route from 'react-router-dom/Route';
import './App.css';
const api = {
  key: '5caf0124e06bad156b83f1dde8ff0f2e',
  base: 'https://api.openweathermap.org/data/2.5/',

  lonLat: 'https://api.openweathermap.org/data/2.5/weather?lat=10.5158740&lon=7.4304860&appid=5caf0124e06bad156b83f1dde8ff0f2e'
}


const App  = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    window.navigator.geolocation
      .getCurrentPosition(success => {
          fetch(`${api.base}weather?lat=${success.coords.latitude}&lon=${success.coords.longitude}&APPID=${api.key}`)
          .then(response => response.json())
          .then(result => {
            setQuery("");
            setWeather(result);
            console.log(result);
          })

      }, failure => {
        console.log("geolocation failed", failure)
      });
  }, [])
    

  const search = evt => {
    if(evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => response.json())
        .then(result => {
          setQuery("");
          setWeather(result);
          console.log(result);
        })
    }
  }


  const dateBuilder = (d) => {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

  };

  return (

    <div className={typeof(weather.main) !== 'undefined' && weather.main.temp > 30 ? 'app warm' : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        
        {typeof(weather.main) !== 'undefined' ? (
          <div>
            <div className="location-box">
              <div className="location">
                {`${weather.name}, ${weather.sys.country}`}
              </div>
              <div className="date">
                {dateBuilder(new Date())}
              </div>
            </div>
            <div className="weather-box">
              <div className="temperature">{Math.ceil(weather.main.temp)}<span style={{fontSize:'50%'}}>°C</span></div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ("")
        }
        


      </main>



    </div>
  );
}

export default App;