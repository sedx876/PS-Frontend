import React from 'react'
import '../styles/links.css'
import suicide from '../images/suicide.png'
import trevor from '../images/trevor.jpg'
import theCenter from '../images/theCenter.png'
import timeOut from '../images/timeOut.png'

const Links = () => {
  return (
    <div>
      <ul class="cards">

  <li>
    <a href="" class="card">
      <img src={suicide} class="card__image" alt="" />
      <div class="card__overlay">
        <div class="card__header">
          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
          
          <div class="card__header-text">
            
          </div>
        </div>
        <p class="card__description">Suicide Prevention HotLine</p>
      </div>
    </a>      
  </li>

  <li>
    <a href="" class="card">
      <img src={trevor} class="card__image" alt="" />
      <div class="card__overlay">        
        <div class="card__header">
          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
          <div class="card__header-text">
           
          </div>
        </div>
        <p class="card__description">The Trevor Project</p>
      </div>
    </a>
  </li>

  <li>
    <a href="" class="card">
      <img src={theCenter} class="card__image" alt="" />
      <div class="card__overlay">
        <div class="card__header">
          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
          
          <div class="card__header-text">

          </div>
        </div>
        <p class="card__description">The Center</p>
      </div>
    </a>
  </li>

  <li>
    <a href="" class="card">
      <img src={timeOut} class="card__image" alt="" />
      <div class="card__overlay">
        <div class="card__header">
          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                 
          
          <div class="card__header-text">
            
          </div>          
        </div>
        <p class="card__description">Time Out Youth</p>
      </div>
    </a>
  </li>    
</ul>
    </div>
  )
}

export default Links
