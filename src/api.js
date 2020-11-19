import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */


class JoblyApi {
  // the token for interactive with the API will be stored here.

  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      /** 
       { url: "auth/register", 
       method: "post", 
       data: {username, password...}, 
       params: {}, 
       header: "funny stuff" }
       **/ 
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getUserDetails(username) {
    let res = await this.request(`users/${username}`)
    return res.user;
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }
  
  static async getAllCompanies(filter) {
    let res = await this.request(`companies/`, { name: filter });
    return res.companies;
  }

  static async getAllJobs(filter){
    let res = await this.request(`jobs/`, {title: filter});
    return res.jobs;
  }
  // obviously, you'll add a lot here ...

  static async login(data){
    let res = await this.request(`auth/token/`, data, "post");
    return res.token;
  }

  static async register(data) {
    let res = await this.request(`auth/register/`, data, "post");
    return res.token;
  }

  static async updateInfo({ username, ...data }){
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  static async applyToJob(data) {
    let res = await this.request(`users/${data.username}/jobs/${data.jobId}`, data, "post");
    return res.applied;
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token 

// = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." + 
// "eyJ1c2VybmFtZSI6IlRpbmcgTGl1IiwiaXNBZG1pbiI6ZmFsc2UsImlhd" + 
// "CI6MTYwNTYzNjQ4OX0.W4pW0gmktJDGsEnlw9YuoQpAPvaMTX_-EutwIbp0VYI";

export default JoblyApi