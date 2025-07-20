import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./Context/DataContext";
import FormUpdate from "./FormUpdate";

const FormGet = () => {
  const {inputdata,FormGetFetch} = useContext(DataContext);
  const safeArray = Array.isArray(inputdata) ? inputdata : [];
useEffect(()=>{
FormGetFetch()
console.log('props.FormGetFetch() function call')
},[])

  return (
    <div className="get-men-div">
      <ul>
      {safeArray.map((item,i)=>(
        <FormUpdate key={i} id={item.id} showData={item.inputValue}/>
      ))}
      </ul>
    </div>
  );
};

export default FormGet;
