import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import CityComponent from "./modules/CityComponent";
import WeatherComponent from "./modules/WeatherInfoComponent";

export const WeatherIcons = {
  "01d": "/react-weather-app/icons/sunny.svg",
  "01n": "/react-weather-app/icons/night.svg",
  "02d": "/react-weather-app/icons/day.svg",
  "02n": "/react-weather-app/icons/cloudy-night.svg",
  "03d": "/react-weather-app/icons/cloudy.svg",
  "03n": "/react-weather-app/icons/cloudy.svg",
  "04d": "/react-weather-app/icons/perfect-day.svg",
  "04n": "/react-weather-app/icons/cloudy-night.svg",
  "09d": "/react-weather-app/icons/rain.svg",
  "09n": "/react-weather-app/icons/rain-night.svg",
  "10d": "/react-weather-app/icons/rain.svg",
  "10n": "/react-weather-app/icons/rain-night.svg",
  "11d": "/react-weather-app/icons/storm.svg",
  "11n": "/react-weather-app/icons/storm.svg",
  "50d": "/react-weather-app/icons/cloudy.svg",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
`;

const AppLabel = styled.span`
  color: black;
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
`;

function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();

  const fetchWeather = async (e) => {
    if (!city) {
      alert("Please Enter City Name");
    } else {
      e.preventDefault();
      await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`
      )
        .then((response) => updateWeather(response.data))
        .catch((error) => {
          if (error.response?.status === 404) {
            alert("Unable to find the city");
            return undefined;
          }
          alert(error);
        });    
    }
  };
  return (
    <Container>
      <AppLabel>React Weather App</AppLabel>
      {city && weather ? (
        <WeatherComponent weather={weather} city={city} />
      ) : (
        <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
      )}
    </Container>
  );
}

export default App;
