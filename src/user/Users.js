import React, { Component } from 'react'
import { list } from './apiUser'
import { Link } from 'react-router-dom'
import DefaultProfile from '../images/gaycat.png'
import '../styles/users.css'

class Users extends Component {
  constructor(){
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    list()
    .then(data => {
      if (data.error) {
        console.table(data.error)
    } else {
        this.setState({ users: data })
    }
    })
  }

  renderUsers = users => (

    <div className='userDiv'>
      {users.map((user, i) => (
        <div className='container2'>
          <div className='cover-photo'>
          <img src={`${process.env.REACT_APP_API_URL}/user/photo/${
            user._id
          }`} 
             class="profile2"
             onError={i => (i.target.src = `${DefaultProfile}`)}
             alt={user.name}
           />
          </div>
          {/* <div class="profile-name">{user.name}</div> */}
          <br/>
          <p>
          <div class="nameTitle"><h4>{user.name}</h4></div>
           <strong>Joined: </strong> 
           {`${new Date(user.created).toDateString()}`}
         </p>
         <button>
         <Link
            to={`/user/${user._id}`}
            className="">
            View Profile
        </Link>
         </button>
         
        </div>
      ))}
    </div>

   
      
  )

  render() {
    const {users} = this.state
    return (
      <div className=''>
        <h2 className='profileHead'>
          <strong>Members Directory</strong>
        </h2>
        {this.renderUsers(users)}
      </div>
    )
  }
}

export default Users
