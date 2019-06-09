import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import Nav from './components/Nav'
import routes from './config/routes'
import './App.scss'

/**
 * Container for views and navigation.
 * 
 * @param {Object} props - contains props being passed from router
 */
function App(props) {
  // destructure props
  const { pathname: path } = props.history.location

  // convert route-data into jsx.
  const Routes = routes.map((r, i) => (
    <Route
      key={i}
      exact path={r.path}
      render={() => <r.View />} />
  ))
  
  return (
    <div className={"App " + (path !== "/" ? "abroad" : "")}>
      <Nav
        path={path}
        name="Manny Price"/>
      { Routes }
    </div>
  )
}

export default withRouter(App)
