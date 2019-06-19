import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import generateLinks from '../config/navlinks'
import '../styles/Nav.scss'

/**
 * Renders a panel for site navigation.
 * 
 * @param {Object} props - props being passed from upstream.
 */
const Nav = ({ path="/", name="emmanuel zen price" }) => {
  const Links = generateLinks(path)
  return (
    <header className="Nav">
      <h1 className={"title " + (path !== "/" ? "abroad" : "")}>
        {name}
      </h1>
      <nav className="bar">
        <ul>
          {Links}
          <li>
            <a
              href="mailto:mail@emmanuelprice.com"
              title="email"
              style={{fontSize: '15px'}}>
              <FontAwesomeIcon icon={faEnvelope}/>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Nav