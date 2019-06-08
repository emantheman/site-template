import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faQuestion, faQuoteRight, faHome } from '@fortawesome/free-solid-svg-icons'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import '../styles/Nav.scss'

const Nav = ({ path="", name="emmanuel zen price" }) => (
  <header className="Nav">
      <h1 className={"title " + (path !== "/" ? "abroad" : "")}>
        { name }
      </h1>
      <nav className="nav">
        <ul>
          <li className="home">
            <Link
              className="hvr-icon-wobble-vertical"
              style={{ fontSize: '15px' }}
              title="home"
              to="/">
              <FontAwesomeIcon className="hvr-icon" icon={faHome}/>
            </Link>
          </li>
          <li>
            <Link
              className="hvr-icon-wobble-vertical"
              to="/about"
              style={{ fontSize: '14px' }}
              title="about">
              <FontAwesomeIcon className="hvr-icon" icon={faQuestion}/>
            </Link>
          </li>
          <li>
            <Link
              className="hvr-icon-wobble-vertical"
              to="/quotes"
              style={{ fontSize: '14px' }}
              title="quotes">
              <FontAwesomeIcon className="hvr-icon" icon={faQuoteRight}/>
            </Link>
          </li>
          <li>
            <Link
              className="hvr-icon-wobble-vertical"
              to="/work"
              style={{ fontSize: '15px' }}
              title="work">
              <FontAwesomeIcon className="hvr-icon" icon={faCoffee}/>
            </Link>
          </li>
          <li title="github">
            <a
              className="hvr-icon-wobble-vertical"
              href="https://github.com/emantheman"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon className="hvr-icon" icon={faGithubAlt}/>
            </a>
          </li>
        </ul>
      </nav>
    </header>
)

export default Nav