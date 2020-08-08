import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import axios from "axios";

function Login({ history: historyFromProp }) {
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [isEnabled, setisEnabled] = useState(true);
  const history = useHistory();
  console.log("history:::", history);
  useEffect(() => {
    emailAddress !== "" && password !== "" && setisEnabled(false);
  }, [emailAddress, password]);

  const emailAddressHandler = (e) => {
    setEmailAddress(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const loginHandler = (e) => {
    e.preventDefault();
    let payload = {
      email: emailAddress,
      password: password,
    };
    console.log(
      "process.env.SIGNUP_URLSS ::: ",
      process.env.REACT_APP_SIGNUP_URL
    );
    axios
      .post(process.env.REACT_APP_LOGIN_URL, payload)
      .then((result) => {
        console.log("result.status ::: ", result.status);
        if (result.status === 200) {
          localStorage.setItem("token", result.data.token);
          // history.replace("/dash");
          historyFromProp.push("/dash");
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
              <h5 className="card-title text-center">Sign In</h5>
              <form className="form-signin">
                <div className="form-label-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                    value={emailAddress}
                    onChange={emailAddressHandler}
                  />
                </div>
                <br />
                <div className="form-label-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={passwordHandler}
                  />
                </div>
                <div className="py-2">
                  <Link to="/signup">create a new account</Link>
                </div>
                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase cursor"
                  type="submit"
                  disabled={isEnabled}
                  onClick={loginHandler}
                >
                  Sign in
                </button>
                <hr className="my-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
