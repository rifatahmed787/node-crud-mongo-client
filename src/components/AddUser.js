import React, { useState } from "react";

const AddUser = () => {
  const [user, setUser] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("user added successfully");
        }
      });

    event.target.reset("");
    console.log(user);
  };

  const handleInputBlur = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const newUser = { ...user };
    newUser[name] = value;
    setUser(newUser);
  };

  return (
    <div>
      <h2>Please add a new user</h2>
      <form onSubmit={handleSubmit}>
        <input
          onBlur={handleInputBlur}
          type="text"
          name="name"
          placeholder="name"
          required
        />
        <br />
        <input
          onBlur={handleInputBlur}
          type="text"
          name="address"
          placeholder="address"
          required
        />
        <br />
        <input
          onBlur={handleInputBlur}
          type="email"
          name="email"
          placeholder="email"
          required
        />
        <br />
        <button type="submit">Add user</button>
      </form>
    </div>
  );
};

export default AddUser;
