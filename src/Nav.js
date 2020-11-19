import { NavLink } from "react-router-dom";
import JoblyApi from './api';

function Nav({setToken, setUsername, username}) {

  function handleClick(){
    setToken(undefined);
    setUsername(undefined);
  }

  return (
    <nav className="NavBar">
      <NavLink exact to="/">
        Jobly
      </NavLink>
      <NavLink exact to="/companies">
        Companies
      </NavLink>
      <NavLink exact to="/jobs">
        Jobs
      </NavLink>
      <NavLink exact to="/profile">
        Profile
      </NavLink>
      {username
        ? <NavLink exact to="/" onClick={handleClick}>
          Logout {username}
        </NavLink>
        : null}
    </nav>
  );
}

export default Nav;