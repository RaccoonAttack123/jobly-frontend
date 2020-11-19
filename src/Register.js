import JoblyApi from './api';
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Register({ setToken }) {
  
  const [formData, setFormData] =  useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  });
  
  const history = useHistory();
  
  async function handleSubmit(evt) {
    evt.preventDefault();
    setToken(await JoblyApi.register(formData));
    history.push('/');
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(oldFormData => ({...oldFormData, [name]: value}));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usernamew</label>
          <input placeholder="username" name="username" value={formData.username} onChange={handleChange} />
        <label htmlFor="password">Password</label>
          <input placeholder="password" name="password" value={formData.password} onChange={handleChange} />
        <label htmlFor="firstname">First Name</label>
          <input placeholder="first name" name="firstName" value={formData.firstName} onChange={handleChange} />
        <label htmlFor="lastname">Last Name</label>
          <input placeholder="last name" name="lastName" value={formData.lastName} onChange={handleChange} />
        <label htmlFor="email">E-mail</label>
          <input placeholder="E-email" name="email" value={formData.email} onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}


export default Register;