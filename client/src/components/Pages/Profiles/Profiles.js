import React, { useState, useEffect } from "react";
import axios from "axios";
import Template from "../../Template/Template";
import { useNavigate } from "react-router-dom";
import { alertError } from "../../../utils/alertUser/alertUser";
import messageError from "../../../utils/messageError/messageError";

function Profiles(props) {
  const [userProfile, setUserProfile] = useState({});
  const [deleteProfile, setDeleteProfile] = useState("");
  const [updateProfile, setUpdateProfile] = useState("");
  const token = localStorage.getItem("Bearer");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alertError("You need to login");
      navigate("/sign-in");
    } else {
      (async () => {
        try {
          const res = await axios.get(`https://nodejs-mongodb97.herokuapp.com/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setUserProfile((prevUserProfile) => {
            return { ...prevUserProfile, ...res.data.user };
          });
          setUpdateProfile("Update");
          setDeleteProfile("Delete");
          navigate("/profiles");
        } catch (error) {
          const message = messageError(error);
          alertError(
            message +
              " Your token is expires or delete you have to signin again. If don't have account, please register"
          );
          navigate("/sign-in");
        }
      })();
    }
  }, []);

  return (
    <>
      {!userProfile ? (
        ""
      ) : (
        <Template
          {...userProfile}
          Delete={deleteProfile}
          Update={updateProfile}
          alt="Profile User"
          imgStar=""
          lightBg={true}
          lightText={true}
          lightTextDesc={true}
        />
      )}
    </>
  );
}

export default Profiles;
