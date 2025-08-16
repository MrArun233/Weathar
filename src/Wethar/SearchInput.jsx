import React from 'react';

const SearchInput = ({ getWeatharDetails,searchInputRef }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  // console.log("API_KEY:", API_KEY); //  check if it's loading

  const handleCitySearch = async (e) => {
    e.preventDefault();

    const searchInput = e.target.querySelector('.serach-input'); //  fixed typo
    const cityName = searchInput.value;

  const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=2&aqi=no`;
    console.log("entered: CityName", cityName);
    console.log("API URL:", API_URL);
  getWeatharDetails(API_URL)
  }
  // Gets  user's current loacation {latitude,latitude}

  const HandleLocationSearch=()=>{
    navigator.geolocation.getCurrentPosition(
      position=>{
        console.log(position)
        const {latitude,longitude}= position.coords;
         const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2&aqi=no`;
           getWeatharDetails(API_URL) // Fetches wether details for the user's current location
               console.log("API URL:", API_URL);
               window.innerWidth >= 768 && searchInputRef.current.focus();
      },
      ()=>{
        alert('Location accces denied. pleass enable permissions  to use this feature.'); 
      }
    )
  }
  return (
    <div>
      <div className="search-section">  
        <form action="#" className="serach-form" onSubmit={handleCitySearch}>
          <span className="material-symbols-rounded">search</span>
          <input
            type="search"
            placeholder="Enter Your City Name"
            ref={searchInputRef}
            className="serach-input"
            required
          />
        </form>
        <button className="location-button" onClick={HandleLocationSearch}>
          <span className="material-symbols-rounded">my_location</span>
        </button>
      </div>
    </div>
  );
};

export default SearchInput;