import React from 'react'
import '../styles/navbar.css'
import thumb from '../images/thumb.png'

const Navbar = () => {
  return (
    <div class="nav gradient">
      <input type="checkbox" id="nav-check"/>
    <div class="nav-header">
    <div class="nav-title">
      <img className='thumbImg' src={thumb}/>
      PrideSupport
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
      <a href="//github.io/jo_geek" target="_blank">LogIn</a>
      <a href="http://stackoverflow.com/users/4084003/" target="_blank">Register</a>
      <a href="https://in.linkedin.com/in/jonesvinothjoseph" target="_blank">Member Directory</a>
      <a href="https://codepen.io/jo_Geek/" target="_blank">Post Feed</a>
      <a href="https://jsfiddle.net/user/jo_Geek/" target="_blank">Create Post</a>
      <a href="https://jsfiddle.net/user/jo_Geek/" target="_blank">Profile</a>
      <a href="https://jsfiddle.net/user/jo_Geek/" target="_blank">Log Out</a>
    </div>
  </div>
  )
}

export default Navbar
