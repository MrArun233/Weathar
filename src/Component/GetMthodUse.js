import React, { useState,useEffect } from 'react'
const GetMthodUse = () =>{
  const [Data, setData] = useState([])
  const [Looding, setLooding] = useState(true)
  const [error, seterror] = useState(null)
  useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/post')
.then(res=>res.json()
).then(data=>{
  setInterval(()=>{
        setData(data)
  console.log(data)
  setLooding(false)
  },2000)

})
.catch(error=>{
  console.error(error.message)
  seterror(error.message)
})
  },[])

  if(Looding){
    return<h1>⏳ Loading data...</h1>
  }
  if(error)
  {
    return <h3>❌ Error:  api fetch</h3>;
  }
  return (
    <div>
      {Data.slice(0,10).map((item,i)=>{
        return(
            <div key={i}> 
                <h1>{item.id}{item.title}</h1>
                <p>{item.body}</p>
            </div>
        )
      })}
      
    </div>
  )
}

export default GetMthodUse