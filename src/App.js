import React from "react";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import Register from './Register'
import Login from './Login';
import Profile from './Profile';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import JoblyApi from './api';
import jwt from "jsonwebtoken";

function App() {

  const [token, setToken] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(function getToken(){
    JoblyApi.token = token;
    if (jwt.decode(token)) setUsername(jwt.decode(token).username)
  }, [token])

  return( 
    <div className="App">
      <BrowserRouter>
        <Nav setToken={setToken} setUsername={setUsername} username={username}/>
        <Switch>
          <Route exact path="/register">
            <Register setToken={setToken}/>
          </Route>
          <Route exact path="/login">
            <Login setToken={setToken}/>
          </Route>
          <Route exact path="/profile">
            <Profile token={token} username={username} setUserInfo={setUserInfo} setToken={setToken} />
          </Route>
          <Route exact path="/companies">
            <Companies />
          </Route>
          <Route exact path="/companies/:handle">
            <Company token={token}/>
          </Route>
          <Route exact path="/jobs">
            <Jobs token={token} username={username}/>
          </Route>
          <Route exact path="/">
            <Home token={token} username={username}/>
          </Route>
          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
