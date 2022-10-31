import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Update = () => {
  const users = useLoaderData();
  const [user, setUser] = useState(users);

  const handleUpdate = (event) => {
    event.preventDefault();
    // console.log(user);
    fetch(`http://localhost:5000/users/${users._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("user updated");
        }
      });
  };

  const handleUpdateChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const newUser = { ...user };
    newUser[name] = value;
    setUser(newUser);
  };

  return (
    <div>
      <h1>please update: {users.name}</h1>
      <form onSubmit={handleUpdate}>
        <input
          onChange={handleUpdateChange}
          type="text"
          name="name"
          defaultValue={users.name}
        />
        <br />
        <input
          onChange={handleUpdateChange}
          type="text"
          name="address"
          defaultValue={users.address}
        />
        <br />
        <input
          onChange={handleUpdateChange}
          type="email"
          name="email"
          defaultValue={users.email}
        />
        <br />
        <button type="submit">update user</button>
      </form>
    </div>
  );
};

export default Update;
