import React, { useEffect, useRef } from "react";
import { useState } from "react";
import SearchInput from "./SearchInput";
import CurrentWeather from "./CurrentWeather";
import HourlyWeatharItem from "./HourlyWeatharItem";
import { weatherConditionMap } from "../constant";
import NoResulteDev from "./NoResulteDev";
function Wethar() {
    const API_KEY = process.env.REACT_APP_API_KEY;
  const [currentWeathar, setCurrentWeathar] = useState({});
  const [HourlyForecast, setHourlyForecast] = useState([]);
  const [hasNoResulte, sethasNoResulte] = useState(false);
  const searchInputRef = useRef(null);

  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    // Filter the hourly data to only include the next 24 hours
    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });
    setHourlyForecast(next24HoursData);
    console.log(HourlyForecast);
  };

  const getWeatharDetails = async (API_URL) => {
    sethasNoResulte(false);
      window.innerWidth <= 768 && searchInputRef.current.focus(); 
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("❌ Error fetching weather data:");
 
      const data = await res.json();
      console.log("Weather Data:", data);

      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatharIcon = Object.keys(weatherConditionMap).find((icon) =>
        weatherConditionMap[icon].includes(data.current.condition.code)
      );
      setCurrentWeathar({ temperature, description, weatharIcon });

      //  combine hourly data from both forcast days
      const combindHourlyData = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];
      //  searchInputRef
      searchInputRef.current.value = data.location.name;
 
      filterHourlyForecast(combindHourlyData);
    } catch (error) {
      sethasNoResulte(true);
    }                                                                                                                                                                                                                                                                                                                                                                                                                                         
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
const defaultCity = 'India'
  const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2&aqi=no`;
  getWeatharDetails(API_URL)
}, []);
  return (
    <div className="cantainer">
      {/* {search-section} */}
      <SearchInput
        getWeatharDetails={getWeatharDetails}
        searchInputRef={searchInputRef}
      />
      {hasNoResulte ? (
        <NoResulteDev /> 
      ) : ( 
         /* {weather-section} */
        <div className="weather-section">
          <CurrentWeather
            currentWeathar={currentWeathar} 
            searchInputRef={searchInputRef}
          />

          {/* {Hourly weathar forecast list } */}
          <div className="hourly-forecast">
            <ul className="weather-list">
              {HourlyForecast.map((hourlyWeathar, i) => (
                <HourlyWeatharItem
                  key={hourlyWeathar.time_epoch}
                  hourlyWeathar={hourlyWeathar}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wethar;
