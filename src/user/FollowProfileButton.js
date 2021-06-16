import React, { Component } from "react"
import { follow, unfollow } from "./apiUser"
import '../styles/followprofilebutton.css'


class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow)
  }

    unfollowClick = () => {
        this.props.onButtonClick(unfollow)
    }

  render() {
    
    return (
      <div>
        {!this.props.following ? (
      <button
        onClick={this.followClick}
        className=".follow-btn"
      >
        Follow 
      </button>
      ) : (
      <button
        onClick={this.unfollowClick}
        className=".follow-btn"
      >
        UnFollow
      </button>
      )}
      </div>
    )
  }
}

export default FollowProfileButton