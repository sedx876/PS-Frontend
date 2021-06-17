import React, { Component } from "react"
import { isAuthenticated } from "../auth"
import { read, update, updateUser } from "./apiUser"
import { Redirect } from "react-router-dom"
import DefaultProfile from "../images/gaycat.png"

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      redirectToProfile: false,
      error: "",
      fileSize: 0,
      loading: false,
      about: ""
    }
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true })
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          error: "",
          about: data.about
        })
      }
    })
  }

  componentDidMount() {
    this.userData = new FormData()
    const userId = this.props.match.params.userId
    this.init(userId)
  }

  isValid = () => {
    const { name, email, password, fileSize } = this.state
    if (fileSize > 1000000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false
      })
      return false
    }
    if (name.length === 0) {
      this.setState({ error: "Name is required", loading: false })
      return false
    }
    // email@domain.com
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({
        error: "A valid Email is required",
        loading: false
      })
      return false
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error: "Password must be at least 6 characters long",
        loading: false
      });
      return false
    }
    return true
  }

  handleChange = name => event => {
    this.setState({ error: "" })
    const value = name === "photo" ? event.target.files[0] : event.target.value
    const fileSize = name === "photo" ? event.target.files[0].size : 0
    this.userData.set(name, value)
    this.setState({ [name]: value, fileSize })
  }

  clickSubmit = event => {
    event.preventDefault()
    this.setState({ loading: true })
    if (this.isValid()) {
      const userId = this.props.match.params.userId
      const token = isAuthenticated().token
      update(userId, token, this.userData).then(data => {
        if (data.error) {
          this.setState({ error: data.error })
        } else if (isAuthenticated().user.role === "admin") {
          this.setState({
            redirectToProfile: true
          })
        } else {
          updateUser(data, () => {
            this.setState({
              redirectToProfile: true
            })
          })
        }
      })
    }
  }

  editForm = (name, email, password, about) => (
    <form id='editForm' style={{width: '700px'}}>
      <div>
        <label className="">Profile Photo: </label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className=""
          
        />
      </div>
        <br/><br/>
      <div className="form-group">
        <label className="">Name: </label>
        <input
          style={{backgroundColor: '#FCE4EC'}}
          onChange={this.handleChange("name")}
          type="text"
          className="form-control"
          value={name}
          
        />
      </div>
        <br/><br/>
      <div className="form-group">
        <label className="text-muted">Email: </label>
        <input
          style={{backgroundColor: '#FCE4EC'}}
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
        <br/><br/>
      <div className="form-group">
        <label className="text-muted">About: </label>
        <br/><br/>
        <textarea
          style={{backgroundColor: '#FCE4EC'}}
          onChange={this.handleChange("about")}
          type="text"
          className=""
          value={about}
          cols='55'
          rows='20'
        />
      </div>
        <br/><br/>
      <div className="form-group">
        <label className="text-muted">Password: </label>
        <input
          style={{backgroundColor: '#FCE4EC'}}
          onChange={this.handleChange("password")}
          type="password"
          className=""
          value={password}
        />
      </div>
      <br/><br/>
      <button onClick={this.clickSubmit} 
        className=''
        style={{marginLeft: '200px'}}
        >
          Update Profile
      </button>
    </form>
  )

  render(){
    const {
      id,
      name,
      email,
      password,
      redirectToProfile,
      error,
      loading,
      about
    } = this.state

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URL
        }/user/photo/${id}?${new Date().getTime()}`
      : DefaultProfile

    return(
    <div>
      <h2 className='' style={{textAlign: 'center'}}>
        <strong>Update Profile</strong>
      </h2>

      <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}

        <div>
        <img
          style={{ height: "400px", width: "auto", marginLeft: '300px' }}
          className=""
          src={photoUrl}
          onError={i => (i.target.src = `${DefaultProfile}`)}
          alt={name}
        />
        </div>

        

        {isAuthenticated().user.role === "admin" &&
          this.editForm(name, email, password, about)}

        {isAuthenticated().user._id === id &&
          this.editForm(name, email, password, about)}
    </div>
    )
  }
}

export default EditProfile
