import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuthenticated } from '../auth'
import '../styles/navbar.css'
import rainHeart from '../images/rainHeart.png'

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#53000E' };
  else return { color: '#53000E' };
}

const Navbar = ({history}) => {
  return (
    <div class="nav gradient">
      <input type="checkbox" id="nav-check"/>
    <div class="nav-header">
    <div class="nav-title">
      <Link className='nav-title' to='/'>
      <img className='thumbImg' src={rainHeart}/>
      PrideSupport
      <img className='thumbImg' src={rainHeart}/>
      </Link>
    </div>
    </div>
    <div class="nav-btn">
    <label for="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
    </div>
  
    <div class="nav-links">
      {!isAuthenticated() && (
        <>
        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
          Log In
        </Link>

        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
          Register
        </Link>
        </>
      )}

      {isAuthenticated() && 
        <>
        <Link className="nav-link" style={isActive(history, '/users')} to="/users">
          Members Directory
        </Link>
        
        <a href="https://codepen.io/jo_Geek/" target="_blank">Post Feed</a>
        <a href="https://jsfiddle.net/user/jo_Geek/" target="_blank">Create Post</a>

        <span className="nav-link">
          <Link to={`/user/${isAuthenticated().user._id}`}
            style={(isActive(history, `/user/${isAuthenticated().user._id}`))}>
            {`${isAuthenticated().user.name} Profile`} 
          </Link>
        </span>
        
        
        
        
        <span
          style={{margin: '5px'}}
          onClick={() => signout(() => history.push('/'))}>
          Log Out 
        </span>
        </>
      }




      

      

     

      
    </div>
  </div>
  )
}

export default withRouter(Navbar)
