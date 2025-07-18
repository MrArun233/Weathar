import React from "react";
import { useState } from "react";
const PostMethodUse = () => {
  const [title, settitle] = useState("");
  console.log(title);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("respose succssfule okay", data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div>
      <h2>Simple POST Example</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title..?"
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
export default PostMethodUse;
