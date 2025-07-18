import React, { useState } from "react";
import Loader from "./Loader";
const Bariday = ({onSend}) => {
  const [YourName, setYourName] = useState("");
  const [Wish, setWish] = useState("");
  const [Numbar, setNumbar] = useState("");
  const [Loding, setLoding] = useState(false)

  const HandalSubmit = (e) => {
const newData = { name: YourName, wish: Wish, number: Numbar };
    e.preventDefault();
         setLoding(true)
   setTimeout(()=>{
     
    fetch('http://localhost:5000/wishes',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(newData),
    })
    .then((res)=> res.json())
    .then((data)=>{
      console.log('responsh succssfuly',data)
          setLoding(false)
        onSend(); 
    setYourName('')
    setWish('')
    setNumbar('')
    })
    .catch((error)=>{
      console.error(error.message);
    });
   },3000)
    
  };
  if(Loding){
    return <Loader/>
  }

  return (
    <div>
      <form onSubmit={HandalSubmit}>
        <label htmlFor="name">🧑 Your Name:</label>
        <br />
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          onChange={(e) => {
            setYourName(e.target.value);
          }}
          value={YourName}
          required
        />
        <label htmlFor="wish">🎉 Your Birthday Wish:</label>
        <br />
        <textarea
          type="text"
          id="wish"
          placeholder="Enter your name"
          onChange={(e) => {
            setWish(e.target.value);
          }}
          value={Wish}
          required
        ></textarea>
        <label htmlFor="number">📞 Send No.:</label>
        <br />
        <input
          type="number"
          id="number"
          placeholder="Enter your number"
          required
          value={Numbar}
          onChange={(e) => setNumbar(e.target.value)}
        />
        <br />

        <button type="submit" style={{ marginTop: "10px" }}>
          🎁 Send Wish
        </button>
      </form>
    </div>
  );
};

export default Bariday;
