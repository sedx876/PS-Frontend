import React, { Component } from 'react'
import { singlePost, remove, like, unlike } from './apiPost'
import DefaultPost from "../images/rainHands.png"
import { Link, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Comment from './Comment'
import '../styles/singlepost.css'

class SinglePost extends Component {
  state = {
    post: '',
    redirectToHome: false,
    redirectToSignin: false,
    like: false,
    likes: 0,
    comments: []
  }

  checkLike = likes => {
    const userId = isAuthenticated() && isAuthenticated().user._id
    let match = likes.indexOf(userId) !== -1
    return match
  }

  componentDidMount = () => {
    const postId = this.props.match.params.postId
    singlePost(postId).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({
        post: data,
        likes: data.likes.length,
        like: this.checkLike(data.likes),
        comments: data.comments
      })
    }
  })
  }

  updateComments = comments => {
    this.setState({ comments })
  }

  likeToggle = () => {
    if (!isAuthenticated()) {
      this.setState({ redirectToSignin: true })
      return false
    }
    let callApi = this.state.like ? unlike : like
    const userId = isAuthenticated().user._id
    const postId = this.state.post._id
    const token = isAuthenticated().token

  callApi(userId, token, postId).then(data => {
    if (data.error) {
      console.log(data.error)
    } else {
				this.setState({
          like: !this.state.like,
          likes: data.likes.length
    })
    }
    })
  }

  deletePost = () => {
    const postId = this.props.match.params.postId
    const token = isAuthenticated().token
    remove(postId, token).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
          this.setState({ redirectToHome: true })
      }
    })
  }

  deleteConfirmed = () => {
    let answer = window.confirm('Are you sure you want to delete your post?')
    if (answer) {
      this.deletePost()
    }
  }

  renderPost = post => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ''
    const posterName = post.postedBy ? post.postedBy.name : ' Unknown'
    const { like, likes } = this.state
  return (
    <div className="postBody">
      <img
        src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
        alt={post.title}
        onError={i => (i.target.src = `${DefaultPost}`)}
        className=""
        style={{
          height: '50%',
          width: '50%',
          objectFit: 'cover',
          
        }}
      />
      <br/>
        {like ? (
          <button className='createPostBtn'
          style={{margin: '15px', padding: '2px'}}>
            <h3 onClick={this.likeToggle}>
            <i
              className="fa fa-thumbs-up thumb"
              style={{ padding: '10px', borderRadius: '50%' }}
          />
					{' '}
          {likes} Like
          </h3>
          </button>
          
        ) : (
          <button className='createPostBtn'
          style={{margin: '15px', padding: '2px'}}>
            <h3 onClick={this.likeToggle}>
          <i
            className="fa fa-thumbs-up"
            style={{ padding: '10px', borderRadius: '50%' }}
          />
					{' '}
          {likes} Like
        </h3>
          </button>
        
        )}
        <p className="" style={{textAlign: 'center'}}>
          Posted by <Link to={`${posterId}`}>{posterName} </Link>
          on {new Date(post.created).toDateString()}
        </p>
        <p className="postPara">{post.body}</p>
        <br />
        
        <div className="d-inline-block">
          <button className='createPostBtn'>
          <Link to={`/posts`}>
            Back to posts
          </Link>
          </button>
          
          {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id && (
            <>
            <button className='createPostBtn'>
            <Link to={`/post/edit/${post._id}`}>
                Update Post
              </Link>
            </button>
              
              <button onClick={this.deleteConfirmed} className="createPostBtn">
                Delete Post
              </button>
            </>
          )}
          <div>
            {isAuthenticated().user && isAuthenticated().user.role === 'admin' && (
              <div class="adminDiv">
                <div className="">
                  <h5 className="">Admin</h5>
                  <p className="">Edit/Delete as an Admin</p>
                  <button className='createPostBtn'>
                  <Link
                    to={`/post/edit/${post._id}`}
                    className=""
                  >
                    Update Post
                  </Link>
                  </button>
                  
                    <button onClick={this.deleteConfirmed} className="createPostBtn">
                      Delete Post
                    </button>
              </div>
          </div>
          )}
        </div>
      </div>
    </div>
		)
  }

  render() {
    const { post, redirectToHome, redirectToSignin, comments } = this.state
      if (redirectToHome) {
        return <Redirect to={`/`} />
      } else if (redirectToSignin) {
        return <Redirect to={`/signin`} />
      }
      return (
        <div className="">
          <h2 className="profileHead">{post.title}</h2>
            {!post ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
          ) : (
            this.renderPost(post)
          )}
          <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updateComments} />
        </div>
      )
    }
}

export default SinglePost