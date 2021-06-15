import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom"
import { signin, authenticate } from "../auth"
import '../styles/signup.css'

class Signin extends Component{
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      error: '',
      redirectToReferer: false,
      loading: false
    }
  }

  clickSubmit = event => {
    event.preventDefault()
    this.setState({loading: true})
    const { email, password } = this.state
    const user = {
      email,
      password
    }
    console.table(user)
    signin(user)
    .then(data => {
      if(data.error) {
        this.setState({ error: data.error, loading: false })
      }else{ 
        authenticate(data, () => {
          this.setState({ redirectToReferer: true })
        })
      }
    })
  }



  handleChange = name => event => {
    this.setState({ error: "" })
    this.setState({ [name]: event.target.value })
  }

  signinForm = (email, password) => (
    <div class="overlay">
    <form>
      <div class="con">
        <header class="head-form">
          <h2>Log In To Account</h2>
        </header>
          <br/>
      <div class="field-set">

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
    <button class="log-in" onClick={this.clickSubmit}> Log In </button>
 </div>
 <div class="other">

    <button class="btn submits frgt-pass">
      <Link to='/signup'>Not A Member Yet?</Link>
      </button>
 </div>
</div>
</form>
</div>
  )

  render(){
    const { email, password, error, redirectToReferer, loading } = this.state
    if (redirectToReferer) {
      return <Redirect to="/" />;
    }
    return(
      <div className='container'>
        
      <div 
        className='alert alert-danger'
        style={{ display: error ? '' : 'none'}}>
          {error}
      </div>
      {loading ? (
      <div className='jumbotron text-center'><h2>Loading...</h2></div>
      ):(
        ''
      )}
        {this.signinForm(email, password)}
        <p>
          <Link to="/forgot-password" className="text-danger">
            {" "}
            Forgot Password?
          </Link>
        </p>
      </div>
    )
  }
}

export default Signin