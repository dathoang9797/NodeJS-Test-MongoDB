import React, { useState, useEffect } from "react";
import axios from "axios";
import Template from "../../Template/Template";
import { useNavigate } from "react-router-dom";
import { alertError } from "../../../utils/alertUser/alertUser";

function Home(props) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://nodejs-mongodb97.herokuapp.com/users")
      .then((data) => {
        const user = data.data.users;
        if (user.length === 0) {
          alertError("Don't have user. Please Register");
          navigate("/sign-up");
          return;
        }
        setUsers((prevUsers) => {
          return [...prevUsers, ...user];
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const renderUsers = users.map((user) => {
    return (
      <Template
        key={user._id}
        id={user._id}
        name={user.name}
        email={user.email}
        address={user.address}
        phone={user.phone}
        image={user.image}
        alt="Profile User"
        Update=""
        Delete=""
      />
    );
  });

  return <>{renderUsers}</>;
}
export default Home;
