import React from "react";
import { weatherConditionMap } from "../constant";
const HourlyWeatharItem = ({ hourlyWeathar }) => {
  const tempereature = Math.floor(hourlyWeathar.temp_c);
  const time = hourlyWeathar.time.split(" ")[1].substring(0, 5);
  const weatharIcon = Object.keys(weatherConditionMap).find((icon) =>
    weatherConditionMap[icon].includes(hourlyWeathar.condition.code)
  );

  return (
    <li className="weather-item">
      <p className="weather-time">{time}</p>
      <img src={`icons/${weatharIcon}.svg`} alt='Weathar Icon' className="weather-icon" />
      <p className="temperature">{tempereature}°</p>
    </li>
  );
}; 

export default HourlyWeatharItem;
