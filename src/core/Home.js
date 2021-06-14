import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/home.css'
import rainHeart from '../images/rainHeart.png'


const Home = () => {
  return (
    <div className='pinkGradient'>
      <div class="center">
      <div class="property-card">
      <div class="property-image">
        <div class="property-image-title">
         
        </div>
      </div>
      <div class="property-description">
        <img className='rainHeart' src={rainHeart}/>
        <h5>Welcome to PrideSupport</h5>
        <p className='homePara'>A Safe Social Space for LGBTQ+ Youth</p>
        <br/><br/>
        <Link className='signupLink' to='/signup'>Not A Member Yet? SignUp Here!</Link>
        
        
      </div>
    </div>
  </div>
    </div>
    
  )
}

export default Home
