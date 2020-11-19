import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "./api";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({ search: '' });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(oldFormData => ({...oldFormData, [name]: value}));  
  }

  useEffect(function getCompanies() {
    async function fetchCompanies() {
      const companies = await JoblyApi.getAllCompanies();
      setCompanies(companies)
    }
    fetchCompanies();
  }, []);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let filter = formData.search;
    const companies = await JoblyApi.getAllCompanies(filter);
    setCompanies(companies)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>      
        <input placeholder="Enter search term" name="search" value={formData.search} onChange={handleChange} />
        <button>Search</button>
      </form>
        <ul>
          {companies.map(company => 
                        <Link key={company.handle} to={`/companies/${company.handle}`}>
                        <li>
                          <p>{company.name}</p>
                          <p>{company.description}</p>
                        </li>
                        </Link>
                        )}
        </ul>
    </div>
  )
}

export default Companies;

// import React from 'react';

// function SearchBar({ keyword, setKeyword }) {
//   const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };

//   return (
//     <input
//       style={BarStyling}
//       key="random1"
//       value={keyword}
//       placeholder={"search country"}
//       onChange={(e) => setKeyword(e.target.value)}
//     />
//   );
// }

// export default SearchBar