import React from 'react'
const CurrentWeather = ({currentWeathar}) => {
  return (
    <div>
      <div className="current-weather">
          <img src={`icons/${currentWeathar.weatharIcon}.svg`} alt='Weathar Icon' className="weather-icon" />
          <h2 className="temperature"> 
            {currentWeathar.temperature}<span>°C</span>
          </h2>
          <p className="description">{currentWeathar.description}</p>
        </div>
    </div>
  )
}

export default CurrentWeather