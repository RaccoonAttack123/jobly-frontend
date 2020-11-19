import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import JoblyApi from "./api";
import LoginReq from './LoginReq';

function Company({ token }) {
  const { handle } = useParams();
  const [company, setCompany] = useState({jobs: []});
  // put a loading spinner in later

  useEffect(function getCompany() {
    async function fetchCompany() {
      const company = await JoblyApi.getCompany(handle);
      setCompany(company);
    }
    fetchCompany();
  }, [handle]);

  if (!token) return (<LoginReq />)

  return(
    <div>
      <h1> {handle} </h1>
      <div> {company.details} </div>
      <ul>
        {company.jobs.map(job => <li key={job.id}>
                                      <p>Title: {job.title}</p>
                                      <p>Salary: {job.salary}</p>
                                      <p>Equity: {job.equity}</p>
                                 </li>
                          )}
      </ul>
    </div>
  )
}

export default Company;