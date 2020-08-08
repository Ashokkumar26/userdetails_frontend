import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./home";

const hasLoggedIn = () => localStorage.getItem("token");

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="/login"
            render={() => {
              return !hasLoggedIn() ? (
                <Login></Login>
              ) : (
                <Redirect to="/dash"></Redirect>
              );
            }}
          />
          <Route
            path="/signup"
            render={() => {
              return !hasLoggedIn() ? (
                <Signup></Signup>
              ) : (
                <Redirect to="/dash"></Redirect>
              );
            }}
          />
          <Route
            path="/dash"
            render={() => {
              return hasLoggedIn() ? (
                <Dashboard></Dashboard>
              ) : (
                <Redirect to="/login"></Redirect>
              );
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
