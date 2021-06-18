import React, { Component } from "react"
import { list } from "./apiPost"
import DefaultPost from "../images/rainHands.png"
import { Link } from "react-router-dom"
import '../styles/posts.css'

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      page: 1
    }
  }

  loadPosts = page => {
    list(page).then(data => {
    if (data.error) {
      console.log(data.error)
    } else {
      this.setState({ posts: data })
    }
  })
  }

  componentDidMount() {
    this.loadPosts(this.state.page)
  }

  loadMore = number => {
    this.setState({ page: this.state.page + number })
    this.loadPosts(this.state.page + number)
  }

  loadLess = number => {
    this.setState({ page: this.state.page - number })
    this.loadPosts(this.state.page - number)
  }

  renderPosts = posts => {
    return (
      <div className='postsDiv'>
        {posts.map((post, i) => {
          const posterId = post.postedBy
          ? `/user/${post.postedBy._id}`
          : "";
        const posterName = post.postedBy
          ? post.postedBy.name
          : " Unknown";
          return(
            <div className='container2'>
          <div className='cover-photo'>
          <img
                    src={`${
                      process.env.REACT_APP_API_URL
                    }/post/photo/${post._id}`}
											alt={post.title}
											onError={i =>
                    (i.target.src = `${DefaultPost}`)
                    }
                    className="profile2"
                    
                  />
          </div>
          {/* <div class="profile-name">{post.title}</div> */}
          <br/>
          {/* <div class="profile-name">{post.title}</div> */}
          <p className="card-text">
            <strong>{post.title}</strong>
          
          <br/>
            {post.body.substring(0, 100)}...
          </p>
         <button>
         <Link
                      to={`/post/${post._id}`}
                      className="btn btn-raised btn-primary btn-sm"
                    >
                      Read more
                    </Link>
         </button>
         
        </div>
          )
        })}
      </div>
        )
    }

  render() {
    const { posts, page } = this.state;
      return (
        <div className="">
          <h2 className="">
            {!posts.length ? 
            "You have reached the end of the posts!!" 
            : 
            <h3 className='profileHead'>
              <strong>Recent Posts</strong>
            </h3>}
          </h2>
            {this.renderPosts(posts)}
              {page > 1 ? (
              <button
                className=""
                onClick={() => this.loadLess(1)}
              >
                Previous ({this.state.page - 1})
              </button>
              ) : (
                ""
              )}
                {posts.length ? (
                  <button
                    className=""
                    onClick={() => this.loadMore(1)}
                  >
                    Next ({page + 1})
                  </button>
                ) : (
                  ""
              )}
          </div>
        )
    }
}

export default Posts
