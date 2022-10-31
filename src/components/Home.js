import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const users = useLoaderData();
  const [displayUsers, setDisplayUsers] = useState(users);

  const handleDelete = (user) => {
    const agree = window.confirm(`Are you sure want to delete ${user.name}`);
    // console.log(agree);
    if (agree) {
      // console.log(user._id);
      fetch(`http://localhost:5000/users/${user._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("deleted successfully");
            const remainingUsers = displayUsers.filter(
              (urs) => urs._id !== user._id
            );
            setDisplayUsers(remainingUsers);
          }
        });
    }
  };

  //   console.log(users);
  return (
    <div>
      <h1>users: {displayUsers.length}</h1>
      {displayUsers.map((user) => (
        <p key={user._id}>
          {user.name} {user.address} {user.email}
          <Link to={`/update/${user._id}`}>
            <button>Update</button>
          </Link>
          <button onClick={() => handleDelete(user)}>X</button>
        </p>
      ))}
    </div>
  );
};

export default Home;
