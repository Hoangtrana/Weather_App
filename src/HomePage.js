import React, { useState } from "react";

import "./HomePage.css";

function HomePage() {
  const [city, setCity] = useState("");
  const [weatherInfor, setWeatherInfor] = useState({});
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  //console.log(fethWeather(data[0].Key)
  const fetchData = () => {
    fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=5LBV1Rl7Ovd3tUmuEqa1BcWl4egNzfZT&&q=${city}`
    )
      .then((response) => response.json())

      .then((data) => {
        console.log(data[0]);
        fethWeather(data[0].Key);
        setCity({ name: data[0].LocalizedName });
      })
      .catch((e) =>
        setError(
          "Sorry we can not find the result! Please check the city name again!"
        )
      );
    setLoad(true);
  };

  const fethWeather = (id) => {
    fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=5LBV1Rl7Ovd3tUmuEqa1BcWl4egNzfZT`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        setWeatherInfor({
          temp: data[0].Temperature.Metric.Value,
          unit: data[0].Temperature.Metric.Unit,
          text: data[0].WeatherText,
        });
      })
      .catch((err) => console.log(err));
  };

  const currentTime = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className="homepage">
      <div className="search">
        <h1>Weather App</h1>
        <input
          className="inputText"
          type="text"
          placeholder="Enter the name of a city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />

        <button onClick={fetchData}>Search</button>
      </div>
      <div className="displaySearchResult">
        {error && <div>{error}</div>}
        {!error && (
          <div>
            {load && (
              <div>
                <h1>{city.name}</h1>
                <div className="date">{currentTime(new Date())}</div>
                <h1>{weatherInfor.temp}°C</h1>
                <h1>{weatherInfor.text}</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
