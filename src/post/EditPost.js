import React, { Component } from "react"
import { singlePost, update } from "./apiPost"
import { isAuthenticated } from "../auth"
import { Redirect } from "react-router-dom"
import DefaultPost from "../images/rainHands.png"
import '../styles/editprofile.css'

class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      body: "",
      redirectToProfile: false,
      error: "",
      fileSize: 0,
      loading: false
    }
  }

  init = postId => {
    singlePost(postId).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true })
      } else {
          this.setState({
            id: data.postedBy._id,
            title: data.title,
            body: data.body,
            error: ""
        })
      }
    })
  }

  componentDidMount() {
    this.postData = new FormData()
    const postId = this.props.match.params.postId
    this.init(postId)
  }

  isValid = () => {
    const { title, body, fileSize } = this.state
    if (fileSize > 10000000) {
      this.setState({
      error: "File size should be less than 100kb",
      loading: false
    })
      return false
    }
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required", loading: false })
      return false
    }
      return true
  }

  handleChange = name => event => {
    this.setState({ error: "" })
    const value =
    name === "photo" ? event.target.files[0] : event.target.value
      const fileSize = name === "photo" ? event.target.files[0].size : 0;
      this.postData.set(name, value);
      this.setState({ [name]: value, fileSize });
  }

  clickSubmit = event => {
    event.preventDefault()
    this.setState({ loading: true })
    if (this.isValid()) {
      const postId = this.props.match.params.postId
      const token = isAuthenticated().token
      update(postId, token, this.postData).then(data => {
    if (data.error) this.setState({ error: data.error })
      else {
        this.setState({
          loading: false,
          title: "",
          body: "",
          redirectToProfile: true
			})
    }
  })
  }
  }

  editPostForm = (title, body) => (
    <form>

      <div className="form-group">
        <label className="">Post Photo: </label>
        <input
          style={{backgroundColor: '#FCE4EC'}}
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className=""
        />
        <br/><br/>

      </div>
      <div className="form-group">
        <label className="">Post Title: </label>
        <input
          style={{backgroundColor: '#FCE4EC'}}
          onChange={this.handleChange("title")}
          type="text"
          className=""
          value={title}
        />
      </div>
      <br/>

      <div className="form-group">
        <label className="">Post Body:</label>
        <textarea
          style={{backgroundColor: '#FCE4EC'}}
          onChange={this.handleChange("body")}
          type="text"
          className=""
          value={body}
          cols='55'
          rows='20'
        />
      </div>

      <button
        style={{marginLeft: '75px'}}
        onClick={this.clickSubmit}
        className=""
      >
        Update Post
      </button>
    </form>
  )
  render() {
    const {
      id,
      title,
      body,
      redirectToProfile,
      error,
      loading
    } = this.state

      if (redirectToProfile) {
        return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
      }
      return (
        <div className="">
          <h2 className="profileHead">{title}</h2>
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
          <img
            style={{ height: "400px", width: "auto", marginLeft: '250px' }}
            className="img-thumbnail"
            src={`${
              process.env.REACT_APP_API_URL
            }/post/photo/${id}?${new Date().getTime()}`}
            onError={i => (i.target.src = `${DefaultPost}`)}
            alt={title}
          />
            {isAuthenticated().user.role === "admin" &&
              this.editPostForm(title, body)}
                {isAuthenticated().user._id === id &&
                  this.editPostForm(title, body)}
        </div>
      )
    }
}

export default EditPost