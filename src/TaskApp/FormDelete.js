import React, { useContext } from 'react'
import { DataContext } from './Context/DataContext'

const FormDelete = ({id,setIsDelete}) => {
  const {FormGetFetch}= useContext(DataContext)
  console.log('delete okay')
   fetch(`https://crudetaskapp-backend.onrender.com/wishes/${id}`,{
    method: "DELETE"
  }).then((res)=>res.json())
  .then((data)=>{
    console.log("✅ Deleted successfully:", data);
    FormGetFetch();
    setIsDelete(false)
  }).catch((error)=>{
      console.error("❌ Delete error:", error);
  })
  return (
    <div>
<></>
    </div>
  )
}

export default FormDelete