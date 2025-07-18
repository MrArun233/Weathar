import React, { useEffect, useState } from 'react';

const DataFetch = () => {
  const [getData, setgetData] = useState({}); // now an object: { category: [items] }

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        // Group by category
        const grouped = {};
        data.forEach((item) => {
          if (!grouped[item.category]) {
            grouped[item.category] = [];
          }
          grouped[item.category].push(item);
        });
        setgetData(grouped);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {Object.entries(getData).map(([category, items]) => (
        <div key={category}>
          <h2 style={{ textTransform: 'capitalize', marginTop: '30px' }}>
            🛍️ {category}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {items.map((item) => (
              <div className="men-div" key={item.id}>
                <img src={item.image} width={100} height={100} alt={item.title} />
                <h4>{item.title}</h4>
                <p>${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default DataFetch;