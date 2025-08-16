import React, { useEffect, useRef, useCallback, useState } from "react";
import SearchInput from "./SearchInput";
import CurrentWeather from "./CurrentWeather";
import HourlyWeatharItem from "./HourlyWeatharItem";
import { weatherConditionMap } from "../constant";
import NoResulteDev from "./NoResulteDev";
import DevloperName from "./DevloperName";

function Wethar() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [currentWeathar, setCurrentWeathar] = useState({});
  const [HourlyForecast, setHourlyForecast] = useState([]);
  const [hasNoResulte, sethasNoResulte] = useState(false);
  const searchInputRef = useRef(null);

  // ✅ Filter hourly forecast (next 24 hours only)
  const filterHourlyForecast = useCallback((hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });

    setHourlyForecast(next24HoursData);
  }, []);

  // ✅ Weather API call
  const getWeatharDetails = useCallback(
    async (API_URL) => {
      sethasNoResulte(false);

      if (window.innerWidth <= 768 && searchInputRef.current) {
        searchInputRef.current.focus();
      }

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

        // combine hourly data from both forecast days
        const combindHourlyData = [
          ...data.forecast.forecastday[0].hour,
          ...data.forecast.forecastday[1].hour,
        ];

        // set city name in input
        if (searchInputRef.current) {
          searchInputRef.current.value = data.location.name;
        }

        filterHourlyForecast(combindHourlyData);
      } catch (error) {
        console.error(error);
        sethasNoResulte(true);
      }
    },
    [filterHourlyForecast] // ✅ stable dependency
  );

  // ✅ Load default city on mount
  useEffect(() => {
    const defaultCity = "India";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2&aqi=no`;
    getWeatharDetails(API_URL);
  }, [API_KEY, getWeatharDetails]);

  return (
    <div className="cantainer">
      {/* search-section */}
      <SearchInput
        getWeatharDetails={getWeatharDetails}
        searchInputRef={searchInputRef}
      />

      {hasNoResulte ? (
        <NoResulteDev />
      ) : (
        <div className="weather-section">
          {/* Current Weather */}
          <CurrentWeather
            currentWeathar={currentWeathar}
            searchInputRef={searchInputRef}
          />

          {/* Hourly weather forecast list */}
          <div className="hourly-forecast">
            <ul className="weather-list">
              {HourlyForecast.map((hourlyWeathar) => (
                <HourlyWeatharItem
                  key={hourlyWeathar.time_epoch}
                  hourlyWeathar={hourlyWeathar}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
      <DevloperName/>
    </div>
  );
}

export default Wethar;
