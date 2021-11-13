import React, { useState } from "react";
import axios from "axios";
import {
  alertError,
  alertSuccess,
} from "../../../../utils/alertUser/alertUser";
import messageError from "../../../../utils/messageError/messageError";
import opacityBackground from "../../../../utils/opacityBackground/opacityBackground";
import { useNavigate } from "react-router-dom";
import Spin from "../../../Spin/Spin";
import _ from "lodash";
import "../Form.css";

const Signin = (props) => {
  const configStyleEyes = {
    position: "absolute",
    right: 0,
    transform: "translate(0, -50%)",
    top: "50%",
    color: "#d9d9d9",
    padding: "10px",
  };

  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    address: {},
    phone: "",
  });
  const [spin, setSpin] = useState(false);
  const [click, setClick] = useState(false);
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zipCode: "",
  });
  const navigate = useNavigate();
  
  const onGetImage = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  const onChangeUser = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };

  const onChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => {
      return { ...prevAddress, [name]: value };
    });
  };

  const showPassword = () => {
    const changePasswordToShow = document.getElementsByName("password");
    if (!click) {
      changePasswordToShow[0].type = "text";
      setClick(true);
    } else {
      changePasswordToShow[0].type = "password";
      setClick(false);
    }
  };

  const onSubmitUser = async (e) => {
    try {
      e.preventDefault();
      user.address = { ...address };

      if (
        user.name.length === 0 ||
        user.password.length === 0 ||
        user.email.length === 0 ||
        user.phone.length === 0 ||
        _.isEmpty(user.address.street) ||
        _.isEmpty(user.address.city) ||
        _.isEmpty(user.address.zipCode)
      ) {
        return alertError("Field can not empty");
      }

      if (document.getElementsByName("password")[0].type === "text") {
        document.getElementsByName("password")[0].type = "password";
      }

      setSpin(true);
      opacityBackground("0.5");

      //CREATE USER AND UPLOAD IMAGE IF USER INSERT
      const res = await axios.post(`https://nodejs-mongodb97.herokuapp.com/users`, user);
      if (image) {
        const formData = new FormData();
        formData.append("avatar", image);
        await axios.post(
          `https://nodejs-mongodb97.herokuapp.com/users/${res.data.user._id}/avatar`,
          formData
        );
      }

      alertSuccess('Create Success"');
      setSpin(false);
      setClick(false);
      opacityBackground("1");
      navigate("/");
    } catch (error) {
      const message = messageError(error);
      alertError(message);
      setSpin(false);
      setClick(false);
      opacityBackground("1");
     
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
              <h2 className="title">Welcome</h2>
              <div className="input-div one">
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <input
                    type="text"
                    className="input"
                    onChange={onChangeUser}
                    name="name"
                    placeholder="Username"
                    value={user.name}
                  />
                </div>
              </div>
              <div className="input-div">
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
              </div>
              <div className="input-div pass">
                <div className="i">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="div">
                  <input
                    type="text"
                    className="input"
                    onChange={onChangeUser}
                    name="phone"
                    placeholder="Phone"
                    value={user.phone}
                  />
                </div>
              </div>
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
                  <i className="fa fa-map-signs"></i>
                </div>
                <div className="div">
                  <input
                    type="text"
                    className="input"
                    onChange={onChangeAddress}
                    name="street"
                    placeholder="Street"
                    value={address.street}
                  />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <i className="fa fa-city"></i>
                </div>
                <div className="div">
                  <input
                    type="text"
                    className="input"
                    onChange={onChangeAddress}
                    name="city"
                    placeholder="City"
                    value={address.city}
                  />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <i className="fa fa-barcode"></i>
                </div>
                <div className="div">
                  <input
                    type="text"
                    className="input"
                    onChange={onChangeAddress}
                    name="zipCode"
                    placeholder="ZipCode"
                    value={address.zipCode}
                  />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <i className="fa fa-file"></i>
                </div>
                <div className="div">
                  <input
                    type="file"
                    name="file"
                    id="uploadfile"
                    className="input"
                    accept=".jpg,.jpeg,.png,.bmp"
                    onChange={onGetImage}
                  />
                </div>
              </div>
              <br />
              <button
                type="submit"
                onClick={onSubmitUser}
                className="btn btn-sigin"
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
