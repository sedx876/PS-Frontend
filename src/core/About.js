import React from 'react'
import {Link} from 'react-router-dom'
import rainHeart from '../images/rainHeart.png'
import '../styles/about.css'

const About = () => {
  return (
    <div className='pinkGradient'>
      <div className='pinkGradient'>
      <div class="center">
      <div class="property-card">
      <div class="property-image2">
        <div class="property-image-title">
         
        </div>
      </div>
      <div class="property-description">
        {/* <img className='rainHeart' src={rainHeart}/> */}
        <h5>About PrideSupport</h5>
        <p className='aboutPara'>We are thrilled that you found us here!
        PrideSupport strives to provide a safe and nurturing social 
        environment for LGBTQ+ Youth. We understand that not all LGBTQ+ Youth 
        do not have a loving and nurturing environment to thrive in. It is a 
        sad reminder of the state of our world. Pride Support wants you to 
        reach out and support one another. Make the connection that 
        can make the difference. There is more than enough hate in the world. 
        We DO NOT need more here at PS. Bullying, Trolling and Hate Speech 
        WILL NOT be tolerated. Any infractions of the site rules will result 
        in immediate removal from the site and permenent ban. Please refer to
        <br/>
         <Link to='/tos'>TERMS of SERVICE</Link> page for complete list of 
        rules.
        </p>
        
        
        
        
      </div>
    </div>
  </div>
    </div>
    </div>
  )
}

export default About
