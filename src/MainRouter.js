import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbar from './core/Navbar'
import Footer from './core/Footer'
import Home from './core/Home'

const MainRouter = () => {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home}/>
      </Switch>
      <Footer/>
    </div>
  )
}

export default MainRouter
