import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import JoblyApi from "./api";
import LoginReq from './LoginReq';

function Jobs({ token, username }) {  

  const [jobs, setJobs] = useState([]);
  const [userJobs, setUserJobs] = useState([]);
  const [formData, setFormData] = useState({ search: '' })

  useEffect(function getJobs() {
      async function fetchJobs() {
        if (username) {
          let userDetails = await JoblyApi.getUserDetails(username);
          setUserJobs(userDetails.applications);
        }
      }
      fetchJobs();
    }, []);

  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormData(oldFormData => ({...oldFormData, [name]: value}));
  }

  async function handleClick(evt) {
    let jobId = evt.target.getAttribute("jobid");
    await JoblyApi.applyToJob({ username, jobId});
    setUserJobs(userJobs => [...userJobs, Number(jobId)]);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let filter = formData.search;
    const jobs = await JoblyApi.getAllJobs(filter);
    setJobs(jobs);
  }

  useEffect(function getJobs() {
    async function fetchJobs() {
      const jobs = await JoblyApi.getAllJobs(); //two jobs :s
      setJobs(jobs);
    }
    fetchJobs();
  }, []);

  if (!token) return (<LoginReq />);

  return (
    <div>
      <form onSubmit={handleSubmit}>      
        <input placeholder="Enter search term" name="search" value={formData.search} onChange={handleChange} />
        <button>Search</button>
      </form>
      <ul>
          {jobs.map(job => 
                        <li key={job.id}>
                          <p>Title: {job.title}</p>
                          <p>Salary: {job.salary}</p>
                          <p>Equity: {job.equity}</p>
                          <button disabled={userJobs.includes(job.id)} jobid={job.id} onClick={handleClick}>
                            {userJobs.includes(job.id) ? "Applied" : "Apply"} 
                          </button>
                        </li>
                        )}
      </ul>
    </div>
  )
}

export default Jobs;