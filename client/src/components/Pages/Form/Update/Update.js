import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spin from "../../../Spin/Spin";
import _ from "lodash";
import {
  alertError,
  alertSuccess,
} from "../../../../utils/alertUser/alertUser";
import messageError from "../../../../utils/messageError/messageError";
import opacityBackground from "../../../../utils/opacityBackground/opacityBackground";
import "../Form.css";

const Update = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    address: {},
    phone: "",
  });
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zipCode: "",
  });
  const [image, setImage] = useState(null);
  const [spin, setSpin] = useState(false);
  const [click, setClick] = useState(false);
  const configStyleEyes = {
    position: "absolute",
    right: 0,
    transform: "translate(0, -50%)",
    top: "50%",
    color: "#d9d9d9",
    padding: "10px",
  };
  const token = localStorage.getItem("Bearer");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alertError("You need to login");
      opacityBackground("1");
      navigate("/sign-in");
    } else {
      (async () => {
        try {
          setSpin(true);
          opacityBackground("0.5");
          const res = await axios.get(`https://nodejs-mongodb97.herokuapp.com/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser((prevUser) => {
            return { ...prevUser, ...res.data.user };
          });
          setAddress((prevAddress) => {
            return { ...prevAddress, ...res.data.user.address };
          });
          setSpin(false);
          opacityBackground("1");
        } catch (error) {
          const message = messageError(error);
          alertError(message + " Your token is expires or delete you have to signin again. If don't have account, please register");
          setSpin(false);
          opacityBackground("1");
          navigate("/sign-in");
        }
      })();
    }
  }, []);

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

      if (document.getElementsByName("password")[0].type === "text") {
        document.getElementsByName("password")[0].type = "password";
      }

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

      setSpin(true);
      opacityBackground("0.5");

      delete user._id;
      await axios.patch(`https://nodejs-mongodb97.herokuapp.com/users/me`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (image) {
        const formData = new FormData();
        formData.append("avatar", image);
        await axios.post(`https://nodejs-mongodb97.herokuapp.com/users/me/avatar`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      alertSuccess("Update Success");
      setSpin(false);
      setClick(false);
      opacityBackground("1");
      navigate("/profiles");
    } catch (error) {
      const message = messageError(error);
      alertError(message);
      setSpin(false);
      opacityBackground("1");
      setClick(false);
      navigate("/sign-in");
    }
  };

  return (
    <>
      <div className="wrapSignIn">
        <img className="wave" src="images/wave.png" alt="" />
        {!spin ? <div className=""></div> : <Spin />}
        <div className="container-signin">
          <div className="login-content">
            <form action="index.html">
              <img src="images/avatar.svg" alt="" />
              <h2 className="title">Update</h2>
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
                type="button"
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

export default Update;
