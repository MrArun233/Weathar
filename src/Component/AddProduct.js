import React from "react";
import { useState } from "react";
function AddProduct() {
  const [AddValue, setAddValue] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [Loading, setLoading] = useState(false);
  const [response, setresponse] = useState(false);

  const HandalSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    fetch(" https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(AddValue),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setresponse(true);
        console.log("response sucssfully", data);
        console.log(AddValue);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  if (Loading) {
    return <h1>⏳ Loading data...</h1>;
  }
  if (response) {
    return <h1>Your Data Send sucssfully</h1>;
  }

  return (
    <div>
      <form onSubmit={HandalSubmit}>
        <label>Enter Your Title</label>
        <input
          type="text"
          placeholder="Enter Your Title..?"
          name="title"
          onChange={(e) => {
            setAddValue({ ...AddValue, [e.target.name]: e.target.value });
          }}
        />
        <label>Enter Price </label>
        <input
          type="text"
          placeholder="Enter Your Price..?"
          name="price"
          onChange={(e) => {
            setAddValue({ ...AddValue, [e.target.name]: e.target.value });
          }}
        />
        <label>Enter Your Feedback</label>
        <textarea
          name="description"
          placeholder="Enter Your Feedback"
          required
          onChange={(e) => {
            setAddValue({ ...AddValue, [e.target.name]: e.target.value });
          }}
        ></textarea>
        <div className="button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
