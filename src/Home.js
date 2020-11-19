import { Link } from 'react-router-dom'; //don't forget to npm install this
import JoblyApi from './api'

function Home({ token, username }) {
  // if (!token) then redirect, otherwise display:

  return (
    <div>
      <h1>Jobly</h1>
      <p>All the jobs. One place.</p>
      {!token ? <Link to="/login"><button>Log in</button></Link> : <p>Welcome {username}!</p>}
      {!token ? <Link to="/register"><button>Sign up</button></Link> : null}
    </div>
  )
}

export default Home;