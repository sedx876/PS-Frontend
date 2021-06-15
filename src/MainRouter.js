import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from './core/Navbar'
import Footer from './core/Footer'
import Home from './core/Home'
import TOS from './core/TOS'
import Links from './core/Links'
import Signup from './user/Signup'

const MainRouter = () => {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/tos' component={TOS}/>
        <Route path='/links' component={Links}/>
        <Route path='/signup' component={Signup}/>
      </Switch>
      <Footer/>
    </div>
  )
}

export default MainRouter
