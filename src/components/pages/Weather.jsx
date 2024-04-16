import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TiWeatherCloudy } from "react-icons/ti";

const Weather = () => {
  const { loc } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "1ce277a005e41ac56313713970207a6a";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    fetchWeatherData();
  }, [loc, apiKey]);

  if (!weatherData) return <div>Loading...</div>;

  const { main, weather, wind, sys } = weatherData;

  return (
    <>
    <div className="bg-gradient-to-r from-teal-400 to-blue-500  min-h-screen flex items-center justify-center">

   <div className=" bg-white  rounded-xl p-8 lg:p-12">

      <div className="flex items-center gap-3 lg:gap-4 ">
        <h2 className="text-3xl lg:text-4xl">{loc} Weather</h2>
        <span className="text-4xl lg:text-5xl">
          <TiWeatherCloudy />
        </span>
      </div>

      <div className="pl-5 mt-2 lg:mt-4">
        <p>
          <span className=" text-lg lg:text-xl">Temperature:</span>
          {main.temp}°C
        </p>
        <p>
          <span className="text-lg lg:text-xl"> Description:</span>
          {weather[0].description}
        </p>
        <p>
          <span className="text-lg lg:text-xl"> Humidity: </span>
          {main.humidity}%
        </p>
        <p>
          <span className="text-lg lg:text-xl"> Wind Speed: </span>
          {wind.speed} m/s
        </p>
        <p>
          <span className="text-lg lg:text-xl"> Pressure: </span>
          {main.pressure} hPa
        </p>
        <p>
          <span className="text-lg lg:text-xl"> Sunrise: </span>

          {new Date(sys.sunrise * 1000).toLocaleTimeString()}
        </p>
        <p>
          <span className="text-lg lg:text-xl"> Sunset: </span>

          {new Date(sys.sunset * 1000).toLocaleTimeString()}
        </p>
      </div>
      </div>
   
    </div>
    </>
  );
};

export default Weather;
