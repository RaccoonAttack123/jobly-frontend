import { useHistory } from "react-router-dom";
import LoginReq from "./LoginReq";
import { useState, useEffect } from "react";
import JoblyApi from "./api";

function Profile({ token, username, setUserInfo, setToken }) {
  const [userDetails, setUserDetails] = useState('');
  
  useEffect(function getDetails() {
    async function getUserDetails() {
      if (username) setUserDetails(await JoblyApi.getUserDetails(username));
    }
    getUserDetails();
  }, [username])

  const [formData, setFormData] = useState({
    username: username,
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  });
  
  const history = useHistory();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await JoblyApi.login({username: formData.username, password: formData.password})
      setUserDetails(await JoblyApi.updateInfo(formData));
      setUserInfo(userDetails);
      history.push('/');
    } catch (error){
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(oldFormData => ({...oldFormData, [name]: value}));
  }

  if (!token) return (<LoginReq />)

  return (
    <div>
      <div> {username} </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first name">First Name</label>
        <input placeholder={userDetails.firstName} name="firstName" value={formData.firstName} onChange={handleChange} />
        <label htmlFor="last name">Last Name</label>
        <input placeholder={userDetails.lastName} name="lastName" value={formData.lastName} onChange={handleChange} />
        <label htmlFor="email">E-mail</label>
        <input placeholder={userDetails.email} name="email" value={formData.email} onChange={handleChange} />
        <label htmlFor="password">Comfirm Password To Make Change</label>
        <input placeholder="password" name="password" value={formData.password} onChange={handleChange} />
        <button>Save Changes</button>
      </form>
    </div>
  )
}

export default Profile;