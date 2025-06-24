import React from "react";

import { useState } from "react";
import ToDo from "./ToDo";
const ToDoForm = () => {
  const [value, setvalue] = useState("");
      const [addValue, setaddValue] = useState([]);


 
  const handleSubmit = (e) => {
    e.preventDefault();
        if (value.trim() !== "") {
          setaddValue([...addValue, value]);
          setvalue("");
        }
    console.log(value);
  };

    const handleDelete = (indexToDelete) => {
    const updatedTasks = addValue.filter((_, index) => index !== indexToDelete);
    setaddValue(updatedTasks);
    console.log('index delete ',indexToDelete)
  };

  return (
    <>
      <form className="ToDoForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          value={value}
          placeholder="what is task today?"
          onChange={(e) => {
            setvalue(e.target.value);
          }}
        />
        <button
          type="submit"
          className="todo-btn"
           >
          Add Task
        </button>
      </form>
      <ul>
        {addValue.map((val, i) => {
          return <ToDo key={i} val={val} index={i} onDelete={handleDelete}/>
        })}
      </ul>
    </>
  );
};

export default ToDoForm;
