import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddres] = useState("");
  const [password, setPassword] = useState("");
  const [isenabled, setisEnabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    firstName !== "" &&
      lastName !== "" &&
      emailAddress !== "" &&
      password !== "" &&
      setisEnabled(false);
  }, [firstName, lastName, emailAddress, password]);
  const firstNameHandler = (e) => {
    e.preventDefault();
    setFirstName(e.target.value);
  };
  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const emailAddressHandler = (e) => {
    setEmailAddres(e.target.value);
  };
  const signupHandler = (e) => {
    e.preventDefault();
    let payload = {
      first_name: firstName,
      last_name: lastName,
      email: emailAddress,
      password: password,
    };
    console.log(
      "process.env.SIGNUP_URLSS ::: ",
      process.env.REACT_APP_SIGNUP_URL
    );
    axios
      .post(process.env.REACT_APP_SIGNUP_URL, payload)
      .then((result) => {
        console.log("result.status ::: ", result);
        if (result.status === 200) {
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log("error ::: ", err);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">REGISTER</h5>
              <form className="form-signin">
                <div className="form-label-group mb-1">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    first={firstName}
                    onChange={firstNameHandler}
                  />
                </div>
                <div className="form-label-group mb-1">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    value={lastName}
                    onChange={lastNameHandler}
                  />
                </div>
                <div className=" form-label-group mb-1">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                    value={emailAddress}
                    onChange={emailAddressHandler}
                  />
                </div>
                <div className="form-label-group mb-1">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    value={password}
                    onChange={passwordHandler}
                  />
                </div>
                <div className="mb-2">
                  <Link to="/login">click here for existing account</Link>
                </div>
                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                  disabled={isenabled}
                  onClick={signupHandler}
                >
                  Sign up
                </button>
                <hr className="my-2" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
