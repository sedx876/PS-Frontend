import React, {Component} from 'react'
import '../styles/profile.css'
import { isAuthenticated } from "../auth"
import { Redirect, Link } from "react-router-dom"
import { read } from "./apiUser"
import { listByUser } from "../post/apiPost"
import DefaultProfile from "../images/gaycat.png"
import FollowProfileButton from "./FollowProfileButton"
import rainHeart from '../images/rainHeart.png'
import abstract from '../images/abstract.jpg'


class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false,
      error: "",
      posts: []
    }
  }

  checkFollow = user => {
    const jwt = isAuthenticated()
    const match = user.followers.find(follower => {
    // one id has many other ids (followers) and vice versa
    return follower._id === jwt.user._id
  })
    return match
  }

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id
    const token = isAuthenticated().token
    callApi(userId, token, this.state.user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({ user: data, following: !this.state.following })
    }
  })
  }

  init = userId => {
    const token = isAuthenticated().token
    read(userId, token).then(data => {
    if (data.error) {
      this.setState({ redirectToSignin: true })
    } else {
      let following = this.checkFollow(data)
      this.setState({ user: data, following })
      this.loadPosts(data._id)
    }
  })
  }

  loadPosts = userId => {
    const token = isAuthenticated().token
    listByUser(userId, token).then(data => {
    if (data.error) {
      console.log(data.error)
    } else {
      this.setState({ posts: data })
    }
  })
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.init(userId)
  }

  UNSAFE_componentWillReceiveProps(props) {
    const userId = props.match.params.userId
    this.init(userId)
  }

  

  render(){
    const { redirectToSignin, user, posts } = this.state
    if (redirectToSignin) return <Redirect to="/signin" />
    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfile
    return (
      <>
      <h2 className='profileHead'>
        <img className='rainHeart' src={rainHeart}/>
          <strong>{user.name} Profile</strong>
          <img className='rainHeart' src={rainHeart}/>
        </h2>
      <div className='profDiv'>
        
      <div>
        

        <div class="container">
        <div class="cover-photo">
          <img src={photoUrl} 
            class="profile"
            onError={i => (i.target.src = `${DefaultProfile}`)}
            alt={user.name}
          />
        </div>
        <div class="profile-name">{user.name}</div>
        <br/>
        <p>
          <strong>Joined: </strong> 
          {`${new Date(user.created).toDateString()}`}
        </p>
        {/* <button class="msg-btn">Message</button> */}
        
        
        <FollowProfileButton
                following={this.state.following}
                onButtonClick={this.clickFollowButton}
              />
      </div>
      </div>

      <div className='aboutMe'>
        <div className=''>
          <p className=""
            style={{width: '30rem'}}>
          <h5 
            style={{textDecoration: 'underline', textAlign: 'center'}}
          >
              <strong>About {user.name}:</strong>
          </h5>
          <br/>
            <strong className='aboutPara'>{user.about}</strong></p>
        </div>
      </div>


      

      </div>

      <div className='adminDiv'>
          {isAuthenticated().user && 
          isAuthenticated().user.role === "admin" && (
            <div class="">
              <div className="">
                <h5 className="">Admin</h5>
                <p className="">
                  Edit/Delete as an Admin
                </p>
                <Link
                  className="adminEditBtn"
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>
                {/* <DeleteUser /> */}
              </div>
            </div>
            
            )}
            </div>
      </>
      
    )
  }
  
}

export default Profile
