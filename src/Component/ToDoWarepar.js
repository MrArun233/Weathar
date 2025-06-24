 import { useState } from 'react'
import React  from 'react'
import ToDoForm from './ToDoForm'
import ToDo from './ToDo'
 const ToDoWarepar = () => {
   return (
    <>
    <div>
      <h1 className="app-title">TaskTide</h1>
<p className="tagline">Flow through your day with clarity</p>
    </div>
     <div className='TodoWrapper'>
      
      <ToDoForm  />
     
     </div></>
    
   )
 }
 
 export default ToDoWarepar 