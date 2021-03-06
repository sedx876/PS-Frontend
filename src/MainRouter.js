import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import Navbar from './core/Navbar'
import Footer from './core/Footer'
import Home from './core/Home'
import TOS from './core/TOS'
import Links from './core/Links'
import Signup from './user/Signup'
import Signin from './user/Signin'
import About from './core/About'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import Users from './user/Users'
import Posts from './post/Posts'
import Admin from './admin/Admin'
import SinglePost from "./post/SinglePost"
import EditPost from "./post/EditPost"

const MainRouter = () => {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/tos' component={TOS}/>
        <Route path='/links' component={Links}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/signin' component={Signin}/>
        <Route path='/about' component={About}/>
        <PrivateRoute exact path='/user/:userId' component={Profile}/>
        <Route exact path='/users' component={Users}/>
        <Route path='/posts' component={Posts}/>
        <PrivateRoute exact path='/user/edit/:userId' component={EditProfile}/>
        <Route path='/admin' component={Admin}/>
        <Route exact path="/post/:postId" component={SinglePost} />
        <PrivateRoute exact path="/post/edit/:postId" component={EditPost}/>
      </Switch>
      <Footer/>
    </div>
  )
}

export default MainRouter
