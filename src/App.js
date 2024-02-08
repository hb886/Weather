import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import CityComponent from "./modules/CityComponent";
import WeatherComponent from "./modules/WeatherInfoComponent";

export const WeatherIcons = {
  "01d": "/Weather/icons/sunny.svg",
  "01n": "/Weather/icons/night.svg",
  "02d": "/Weather/icons/day.svg",
  "02n": "/Weather/icons/cloudy-night.svg",
  "03d": "/Weather/icons/cloudy.svg",
  "03n": "/Weather/icons/cloudy.svg",
  "04d": "/Weather/icons/perfect-day.svg",
  "04n": "/Weather/icons/cloudy-night.svg",
  "09d": "/Weather/icons/rain.svg",
  "09n": "/Weather/icons/rain-night.svg",
  "10d": "/Weather/icons/rain.svg",
  "10n": "/Weather/icons/rain-night.svg",
  "11d": "/Weather/icons/storm.svg",
  "11n": "/Weather/icons/storm.svg",
  "50d": "/Weather/icons/cloudy.svg",
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
