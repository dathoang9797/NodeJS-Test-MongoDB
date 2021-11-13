import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { alertError } from "../../../../utils/alertUser/alertUser";
import messageError from "../../../../utils/messageError/messageError";
import opacityBackground from "../../../../utils/opacityBackground/opacityBackground";
import Spin from "../../../Spin/Spin";
import "../Form.css";

const SignUp = (props) => {
  const configStyleEyes = {
    position: "absolute",
    right: 0,
    transform: "translate(0, -50%)",
    top: "50%",
    color: "#d9d9d9",
    padding: "10px",
  };
  const [user, setUser] = useState({ email: "", password: "" });
  const [spin, setSpin] = useState(false);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const onChangeUser = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };

  const showPassword = (e) => {
    const changePasswordToShow = document.getElementsByName("password");
    if (!click) {
      setClick(true);
      changePasswordToShow[0].type = "text";
    } else {
      setClick(false);
      changePasswordToShow[0].type = "password";
    }
  };

  const onSubmitUser = async (e) => {
    try {
      e.preventDefault();

      if (user.email.length === 0 || user.password.length === 0) {
        return alertError("Email or Password is empty. Please enter.");
      }

      if (document.getElementsByName("password")[0].type === "text") {
        document.getElementsByName("password")[0].type = "password";
      }

      setSpin(true);
      opacityBackground("0.5");

      //SignIn and Store Token in local
      const res = await axios.post(
        `https://nodejs-mongodb97.herokuapp.com/users/login`,
        user
      );
      const token = res.data.user.token;
      window.localStorage.setItem("Bearer", token);

      setSpin(false);
      setClick(false);
      opacityBackground("1");
      navigate("/");
    } catch (error) {
      const message = messageError(error);
      alertError(message);
      opacityBackground("1");
      setSpin(false);
      setClick(false);
    }
  };

  return (
    <>
      <div className="wrapSignIn">
        <img className="wave" src="images/wave.png" alt="" />
        {!spin ? <div className=""></div> : <Spin />}
        <div className="container-signin">
          <div className="login-content">
            <form>
              <img src="images/avatar.svg" alt="" />
              <h2 className="title">Please Login</h2>
              <div className="input-div pass">
                <div className="i">
                  <i className="fas fa-envelope-square"></i>
                </div>
                <div className="div">
                  <input
                    type="email"
                    className="input"
                    onChange={onChangeUser}
                    name="email"
                    placeholder="Email"
                    value={user.email}
                  />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                  <input
                    type="password"
                    className="input"
                    onChange={onChangeUser}
                    name="password"
                    placeholder="Password"
                    value={user.password}
                  />
                  <i
                    className="fas fa-eye"
                    style={configStyleEyes}
                    onClick={showPassword}
                  ></i>
                </div>
              </div>{" "}
              <a href="/">Forgot Password?</a>
              <br />
              <button
                type="submit"
                onClick={onSubmitUser}
                className="btn btn-sigin"
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
