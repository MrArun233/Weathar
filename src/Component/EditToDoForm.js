import React from 'react'

const EditToDoForm = (props) => {

   const handleSubmit=(e)=>{
    e.preventDefault();
    props.setisupDate(true);
    props.setisClick(false)  
  }
  return (
    <div> 
     
      {props.isClick===true?<form className="Todo-edit" onSubmit={handleSubmit}>
         <input
          type="text"
          className="Input-edit"
          value={props.upDateVal}
          placeholder="Edit task?"
          onChange={(e) => {
            props.setupDateVal(e.target.value);
          }}
        />
        <button
          type="submit"
          className="todo-btn-edit"
           >
          Save
        </button>
      </form>:<></>}</div>
  )
}

export default EditToDoForm