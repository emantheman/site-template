import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faQuestion, faQuoteRight, faHome } from '@fortawesome/free-solid-svg-icons'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import '../styles/Nav.scss'

const Nav = ({ path="" }) => (
  <header className="Nav">
      <h1 className={"title " + (path !== "/" ? "abroad" : "")}>
        emmanuel zen price
      </h1>
      <nav className="nav">
        <ul>
          <li className="home">
            <Link
              to="/"
              style={{ fontSize: '15px' }}
              title="home">
              <FontAwesomeIcon icon={faHome}/>
            </Link>
          </li>
          <li className="about">
            <Link
              to="/about"
              style={{ fontSize: '14px' }}
              title="about">
              <FontAwesomeIcon icon={faQuestion}/>
            </Link>
          </li>
          <li className="quotes">
            <Link
              to="/quotes"
              style={{ fontSize: '14px' }}
              title="quotes">
              <FontAwesomeIcon icon={faQuoteRight}/>
            </Link>
          </li>
          <li className="coffee">
            <Link
              to="/work"
              style={{ fontSize: '15px' }}
              title="work">
              <FontAwesomeIcon icon={faCoffee}/>
            </Link>
          </li>
          <li className="github" title="github">
            <a href="https://github.com/emantheman" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithubAlt}/>
            </a>
          </li>
        </ul>
      </nav>
    </header>
)

export default Nav