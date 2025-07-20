import React from "react";
import { useState } from "react";
import '../TaskAppCss/FormPost.css';
import FormGet from "./FormGet";
import { DataContext } from "../TaskApp/Context/DataContext";
const FormPost = () => {
  const [inputValue, setinputValue] = useState();
  const [error, seterror] = useState("");
  const [sendData, setsendData] = useState(false);
  const [inputdata, setinputdata] = useState([]);
  const FormGetFetch = () => {
 fetch("https://crudetaskapp-backend.onrender.com/wishes")
      .then((res) => res.json())
      .then((data) => {
        console.log("data fetch succssfully", data);
        setinputdata(data);
      })
      .catch((error) => {
        console.error("Error fetching:", error.message);
      });
  };

  const HandaleSubmit = (e) => {
    e.preventDefault();
    const inValue = { inputValue: inputValue };
    console.log(inputValue);
  fetch("https://crudetaskapp-backend.onrender.com/wishes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inValue),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to Send data. Please try again....");
        }
        return res.json();
      })
      .then((data) => {
        console.log("response succssfully ", data);
        setinputValue("");
        setsendData(true);
        FormGetFetch();
      })
      .catch((error) => {
        console.error(error.message);
        seterror(error.message);
      });
  };
  return (
    <DataContext.Provider value={{inputdata, FormGetFetch }}>
      <div className="man-dev">
      <span className="man-heading">Manage-Daily-TaskApp</span>
      <form onSubmit={HandaleSubmit}>
        <input
          type="text"
          name="taskAdd"
          value={inputValue}
          placeholder="Enter Dayliy Task....?"
          onChange={(e) => setinputValue(e.target.value)}
        />
        <button className="task-btn">AddTask</button>
        <p className="error">{error}</p>
      </form>
      {sendData && (
        <FormGet FormGetFetch={FormGetFetch} />
      )}
    </div>
   </DataContext.Provider>
  );
};

export default FormPost;
