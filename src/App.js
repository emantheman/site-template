import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import Nav from './components/Nav'
import routes from './config/routes'
import './App.scss'

function App(props) {
  const Routes = routes.map((r, i) => (
    <Route
      key={i}
      exact path={r.path}
      render={() => <r.View />} />
  ))

  const path = props.history.location.pathname
  
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
