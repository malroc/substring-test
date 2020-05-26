import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import CalculationsScreen from '../components/CalculationsScreen'

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <CalculationsScreen />
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
