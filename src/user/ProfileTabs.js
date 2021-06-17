import React, { Component } from "react"
import { Link } from "react-router-dom"
import DefaultProfile from "../images/gaycat.png"
import '../styles/profiletabs.css'

class ProfileTabs extends Component {
  render() {
    const { following, followers, posts } = this.props
      return (
				<div class="tabsDiv">
					 
            <div className="followersDiv">
              <h3 className="tabsHeader">
                {followers.length} <strong>Followers</strong>
              </h3>
                <hr />
                  {followers.map((person, i) => (
                    <div key={i}>
                      <div>
                        <Link to={`/user/${person._id}`}>
                          <img
                            style={{
                              borderRadius: "50%",
                              border: "1px solid black"
                            }}
                            className="float-left mr-2"
                            height="30px"
                            width="30px"
                            onError={i =>
                            (i.target.src = `${DefaultProfile}`)
                            }
                            src={`${
                            process.env.REACT_APP_API_URL
                            }/user/photo/${person._id}`}
                            alt={person.name}
                          />
                          <div>
                            <p className="lead">
                              {person.name}
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                    ))}
            </div>
            <div className="followersDiv">
              <h3 className="tabsHeader">
                {following.length} <strong>Following</strong>
              </h3>
              <hr />
							<br/>
                {following.map((person, i) => (
              <div key={i}>
                <div >
                  <Link
									 to={`/user/${person._id}`}
									 style={{
										display: 'flex',	
										}}>
                    <img
                      style={{
												display: 'flex',
                        borderRadius: "50%",
                        border: "1px solid black",
                      }}
                      className=""
                      height="30px"
                      width="30px"
                      onError={i =>
                        (i.target.src = `${DefaultProfile}`)
                      }
                      src={`${
                        process.env.REACT_APP_API_URL
                      }/user/photo/${person._id}`}
                      alt={person.name}
                    />
                    <div>
                      <p className="lead">
                        {person.name}
                      </p>
                    </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
              <div className="followersDiv">
                <h3 className="tabsHeader">{posts.length} <strong>Posts</strong></h3>
                  <hr />
                    {posts.map((post, i) => (
                    <div key={i}>
                    <div>
                      <Link to={`/post/${post._id}`}>
                    <div>
                      <p className="lead">{post.title}</p>
                  </div>
                      </Link>
                </div>
              </div>
            ))}
          </div>
        
				</div>
    )
  }
}

export default ProfileTabs