import React from 'react';
import './ShowBariday.css'; // CSS file import

const ShowBariday = ({ wishes }) => {
  return (
    <div className="show-container">
      <h2 className="heading">🎈 All Birthday Wishes 🎂</h2>
      <div className="card-grid">
        {wishes.map((wish, index) => (
          <div key={index} className="wish-card">
            <h3>🎉 {wish.name}</h3>
            <p className="wish-text">"{wish.wish}"</p>
            <p className="phone">📞 {wish.number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowBariday;