import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CalculationsScreen from '../components/CalculationsScreen'
import SignInScreen from '../components/SignInScreen'
import SignUpScreen from '../components/SignUpScreen'

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <CalculationsScreen />
          </Route>
          <Route exact path="/sign_in">
            <SignInScreen />
          </Route>
          <Route exact path="/sign_up">
            <SignUpScreen />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
