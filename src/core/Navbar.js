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
    <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
        Log In
      </Link>

      <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
        Register
      </Link>

      <a href="https://in.linkedin.com/in/jonesvinothjoseph" target="_blank">Member Directory</a>
      <a href="https://codepen.io/jo_Geek/" target="_blank">Post Feed</a>
      <a href="https://jsfiddle.net/user/jo_Geek/" target="_blank">Create Post</a>
      <a href="https://jsfiddle.net/user/jo_Geek/" target="_blank">Profile</a>

      <span className="nav-link" 
      style={{ cursor: 'pointer', color: '#53000E' }} 
      onClick={() => signout(() => history.push('/'))}>
      Log Out 
    </span>
    </div>
  </div>
  )
}

export default withRouter(Navbar)
