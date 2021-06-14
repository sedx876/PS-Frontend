import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/footer.css'
import rainInsta from '../images/rainInsta.png'
import rainTwit from '../images/rainTwit.png'

const Footer = () => {
  return (
    <div class="footer gradient">
      <p className='footerPara'>© 2021 PrideSupport</p>
      
        <img className='rainInsta' src={rainInsta}/>
        <img className='rainTwit' src={rainTwit}/>
      
      <ul className='footerLinks'>

        <li className='footerLinks'>
          <Link className='footerLinks' to='/links'>
            Links
          </Link>
        </li>

        <li className='footerLinks'>
          <Link className='footerLinks' to='/tos'>
            Terms of Service
          </Link>
        </li>

        <li className='footerLinks'>
          <Link className='footerLinks' to='/tos'>
            About
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Footer
