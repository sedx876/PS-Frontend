import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {signup} from '../auth/index'
import '../styles/signup.css'


class Signup extends Component{
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      error: '',
      open: false
    }
  }

  clickSubmit = event => {
		event.preventDefault()
		const { name, email, password } = this.state
		const user = {
			name,
			email,
			password
		}
		signup(user)
			.then(data => {
				if(data.error) this.setState({ error: data.error })
				else this.setState({
					error: '',
					name: '',
					email: '',
					password: '',
					open: true
				})
			})
	}

  handleChange = name => event => {
    this.setState({ error: "" })
    this.setState({ [name]: event.target.value })
  }

  signupForm = (name, email, password) => (

    <div class="overlay">
      <form>
        <div class="con">
          <header class="head-form">
            <h2>Sign Up</h2>
          </header>
            <br/>
        <div class="field-set">
         <input class="form-input" 
          onChange={this.handleChange('name')}
          id="txt-input" 
          type="text" 
          placeholder="@UserName" 
          value={name}
          />
      <br/>
         <input class="form-input" 
          onChange={this.handleChange('email')}
          id="txt-input" 
          type="text" 
          placeholder="Email" 
          value={email}
          />
      <br/>
        <input class="form-input"
          onChange={this.handleChange('password')} 
          type="password" 
          placeholder="Password" 
          id="pwd"  
          name="password" 
          value={password}
        />
      <br/>
      <button class="log-in" onClick={this.clickSubmit}> Register </button>
   </div>
   <div class="other">

      <button class="btn submits frgt-pass">
        <Link to='/signin'>Member LogIn</Link>
        </button>
   </div>
  </div>
</form>
</div>
  )

  render(){
    const { name, email, password, error, open } = this.state
    return(
      <div className='container'>
      <div 
        className='alert alert-danger'
        style={{ display: error ? '' : 'none'}}>
          {error}
      </div>
      <div 
        className='alert alert-info'
        style={{ display: open ? '' : 'none'}}>
          NEW ACCOUNT WAS SUCCESSFULLY CREATED!! PLEASE <Link to='/signin'>Log In</Link>
      </div>
        {this.signupForm(name, email, password)}
      </div>
    )
  }
}

export default Signup 