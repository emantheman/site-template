import React from 'react'
import generateLinks from '../config/navlinks'
import '../styles/Nav.scss'

const Nav = ({ path="", name="emmanuel zen price" }) => {
  const Links = generateLinks(path)
  return (
    <header className="Nav">
      <h1 className={"title " + (path !== "/" ? "abroad" : "")}>
        { name }
      </h1>
      <nav className="bar">
        <ul>
          { Links }
        </ul>
      </nav>
    </header>
  )
}

export default Nav