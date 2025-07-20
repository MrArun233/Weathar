import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "../TaskAppCss/FormGet.css";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataContext } from "./Context/DataContext";
import FormDelete from "./FormDelete";
const FormUpdate = ({ id, showData }) => {
  const { FormGetFetch } = useContext(DataContext);
  const [editeValue, setediteValue] = useState(false);
  const [chack, setchack] = useState(false);
  const [UpdateValue, setUpdateValue] = useState(showData);
  const [IsDelete,  setIsDelete] = useState(false)
  useEffect(() => {
    setUpdateValue(showData);
  }, [showData]);
  const UpdateHandaler = (e) => {
    e.preventDefault();
    fetch(`https://crudetaskapp-backend.onrender.com/wishes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValue: UpdateValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Update Data Successfully:", data);
        setediteValue(false);
        FormGetFetch();
        setchack(false);
      })
      .catch((error) => {
        console.error("❌ Update Error:", error);
      });
  };
  const editeForm = () => {
    setediteValue(true);
    setchack(true);
  };
  const HandalDelete = () => {
    setIsDelete(true)
     console.log('delete okay')
  };
  return (
    <div className="div-show-data">
      <form onSubmit={UpdateHandaler}>
        {chack === true ? (
          <></>
        ) : (
          <>
            <p>{showData}</p>
          </>
        )}
        {editeValue === true ? (
          <input
            type="text"
            className="showData"
            value={UpdateValue}
            onChange={(e) => setUpdateValue(e.target.value)}
          />
        ) : (
          <></>
        )}
        {editeValue === true ? (
          <button className="get-btn">AddTask</button>
        ) : (
          <></>
        )}
      </form>
      <div className="icon-div">
        {editeValue === true ? (
          <></>
        ) : (
          <>
            <FontAwesomeIcon
              onClick={editeForm}
              className="edit-icon"
              icon={faPenToSquare}
            />
            <FontAwesomeIcon
              className="delete-icon"
              onClick={HandalDelete}
              icon={faTrash}
            />
          </>
        )}
      </div>
      { IsDelete=== true?  <FormDelete id={id} setIsDelete={setIsDelete}/>:<></> }
    </div>
  );
};

export default FormUpdate;
