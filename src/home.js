import React, { useState, useEffect } from "react";
import Mountain from "./Mountain.jpg";
import Mount from "./mount.jpg";
import Hill from "./hill.jpg";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export function Carosel() {
  return (
    <div>
      <div id="demo" className="carousel slide" data-ride="carousel">
        <ul className="carousel-indicators">
          <li data-target="#demo" data-slide-to="0" className="active"></li>
          <li data-target="#demo" data-slide-to="1"></li>
          <li data-target="#demo" data-slide-to="2"></li>
        </ul>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Mountain} alt="Los Angeles" className="sizing" />
          </div>
          <div className="carousel-item">
            <img src={Mount} alt="Chicago" className="sizing" />
          </div>
          <div className="carousel-item">
            <img src={Hill} alt="New York" className="sizing" />
          </div>
        </div>

        <a className="carousel-control-prev" href="#demo" data-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </a>
        <a className="carousel-control-next" href="#demo" data-slide="next">
          <span className="carousel-control-next-icon"></span>
        </a>
      </div>
    </div>
  );
}
function Dashboard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddres] = useState("");
  const history = useHistory();
  useEffect(() => {
    Axios.get(process.env.REACT_APP_PROFILE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((result) => {
        setFirstName(result.data.first_name);
        setLastName(result.data.last_name);
        setEmailAddres(result.data.email);
      })
      .catch((err) => {
        console.log("err::", err);
      });
  }, []);
  const removeToken = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <div className="bg-light">
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <a className="navbar-brand" href="#">
          {firstName} {lastName}
        </a>
        <ul
          className="navbar-nav"
          style={{ position: "absolute", right: "20px" }}
        >
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={removeToken}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
      <Carosel />
      <div className="bg-primary py-5 text-white text-center">
        <h1>Your Email Address is {emailAddress}</h1>
      </div>
    </div>
  );
}

export default Dashboard;
