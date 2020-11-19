import JoblyApi from './api';
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ setToken }) {
  const [formData, setFormData] =  useState({
    username: '',
    password: ''
  });
  
  const history = useHistory();
  
  async function handleSubmit(evt) {
    evt.preventDefault();
    setToken(await JoblyApi.login(formData));
    history.push('/');
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(oldFormData => ({...oldFormData, [name]: value}));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input placeholder="username" name="username" value={formData.username} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login;

