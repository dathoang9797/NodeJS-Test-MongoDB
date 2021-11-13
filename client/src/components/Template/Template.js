import React from "react";
import axios from "axios";
import Button from "../Button/Button";
import { alertError, alertSuccess } from "../../utils/alertUser/alertUser";
import { useNavigate } from "react-router-dom";
import messageError from "../../utils/messageError/messageError";
import opacityBackground from "../../utils/opacityBackground/opacityBackground";
import { Link } from "react-router-dom";
import "./Template.css";
import "../Spin/Spin.css";

const Template = (props) => {
  const navigate = useNavigate();
  const {
    name,
    email,
    address = "",
    Update,
    Delete,
    image,
    alt,

    phone,
  } = props;

  const DeleteUserProfile = async (e) => {
    try {
      e.preventDefault();
      opacityBackground("0.5");
      const token = localStorage.getItem("Bearer");
      await axios.delete(`https://nodejs-mongodb97.herokuapp.com/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("Bearer");
      alertSuccess("Delete Success");
      opacityBackground("1");
      navigate("/");
    } catch (error) {
      const message = messageError(error);
      alertError(message);
      opacityBackground("1");
    }
  };

  return (
    <>
      <div className={"home__hero-section"}>
        <div className="container">
          <div
            className="row home__hero-row"
            style={{
              display: "flex",
            }}
          >
            <div className="col">
              <div className="home__hero-text-wrapper">
                <h1 className="top-line">{!name ? "" : name}</h1>
                <h1 className="heading ">
                  {!address ? "" : `${address.street} ${address.city}`}
                </h1>
                <p className="home__hero-subtitle ">
                  {!email ? "" : `${email}-${phone}`}
                </p>

                <Link to="/update">
                  {!Update ? (
                    ""
                  ) : (
                    <Button
                      buttonSize="btn--wide"
                      className="mr-2"
                      buttonColor="blue"
                    >
                      {Update}
                    </Button>
                  )}

                  {!Update ? (
                    ""
                  ) : (
                    <Button
                      buttonSize="btn--wide"
                      buttonColor="red"
                      onClick={DeleteUserProfile}
                    >
                      {Delete}
                    </Button>
                  )}
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="home__hero-img-wrapper">
                {typeof image === "object" ? (
                  <img
                    className="home__hero-img"
                    src={`data:${image.mimetype};base64,${image.buffer}   `}
                    alt={alt}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;
