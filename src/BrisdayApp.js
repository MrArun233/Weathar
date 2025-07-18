import React, { useSyncExternalStore } from 'react'
import { useState,useEffect } from 'react'
import './App.css'
import DataFetch from './Component/DataFetch'
import GetMthodUse from './Component/GetMthodUse'
import PostMethodUse from './Component/PostMethodUse'
import AddProduct from './Component/AddProduct'
import Bariday from './AddTask/Bariday'
import ShowBariday from './AddTask/ShowBariday'

function App() {
  const [addData, setaddData] = useState([])
      const fetchWishes = () => {
    fetch('http://localhost:5000/wishes')
  .then((res)=>{
   return res.json()
  })
  .then((data)=>{ 
    console.log('data succss fully get',data)
    setaddData(data)

  }).catch((error)=>{
    console.error(error.massage)
  });
      }
   useEffect(() => {
    fetchWishes(); // initial fetch
  }, []);

    const handleWishSent = () => {
    fetchWishes(); // re-fetch after new wish sent
  };
  

  return (
<div>
      <h2>🎂 Birthday App</h2>
      <Bariday  onSend={handleWishSent} />
      <hr />  
      <ShowBariday wishes={addData} />
    </div>
  )
}

export default App