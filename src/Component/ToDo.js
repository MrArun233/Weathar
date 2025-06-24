import React, { useState } from "react";
import ToDoForm from "./ToDoForm";
import '../App.css'
import EditToDoForm from'./EditToDoForm'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ToDo(props) {
  const [upDateVal, setupDateVal] = useState(props.val);
  const [isClick, setisClick] = useState(false)
  const [isupDate, setisupDate] = useState(true)

  const upDate = () => {
    setisClick(true)
    setisupDate(false)
    // setupDateVal("") 
    console.log('run updaClick')
  };
   const HandalDelete = () => {
    props.onDelete(props.index); // ✅ call parent delete function
  };

  console.log(upDateVal)
  return (
    <div className="Todo">
    {}  <EditToDoForm isClick={isClick } setisupDate={setisupDate} isupDate={isupDate} upDateVal={upDateVal} setupDateVal={setupDateVal} setisClick={setisClick} /> 
    
           <p>{isupDate===true?<>{upDateVal}</>:<></>}</p>
      <div>
        {
          isClick=== false?<>  <FontAwesomeIcon onClick={upDate} className="edit-icon" icon={faPenToSquare} />
        <FontAwesomeIcon className="delete-icon"  onClick={HandalDelete} icon={faTrash} /></>:<></>
        }
      </div>
    </div>
  );
}

export default ToDo;

//  

//  {isClick===true?<input type="text" className="todo-input" value={upDateVal}
//           onChange={(e) => {
//             setupDateVal(e.target.value);
//           }}
//         />:<></>}
