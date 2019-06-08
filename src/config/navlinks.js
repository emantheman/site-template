import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faQuestion, faQuoteRight, faHome } from '@fortawesome/free-solid-svg-icons'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'

const navLinks = [{
  to: '/',
  title: 'home',
  icon: faHome,
  style: { fontSize: '15px' },
  external: false
}, {
  to: '/about',
  title: 'about',
  icon: faQuestion,
  style: { fontSize: '14px' },
  external: false
}, {
  to: '/quotes',
  title: 'quotes',
  icon: faQuoteRight,
  style: { fontSize: '14px' },
  external: false
}, {
  to: '/work',
  title: 'work',
  icon: faCoffee,
  style: { fontSize: '15px' },
  external: false
}, {
  href: 'https://github.com/emantheman',
  title: 'github',
  icon: faGithubAlt,
  external: true
}]

const hydrate = a => path => a.map((link, i) => {
  let anchor
  if (link.external) {
    anchor = (
      <a
        href={link.href}
        title={link.title}
        target="_blank"
        rel="noopener noreferrer">
        <FontAwesomeIcon icon={link.icon}/>
      </a>
    )
  } else {
    anchor = (
      <Link
        className={(path === link.to ? 'current' : '')}
        style={link.style}
        title={link.title}
        to={link.to}>
        <FontAwesomeIcon icon={link.icon}/>
      </Link>
    )
  }
  return <li key={i}>{anchor}</li>
})

const generateLinks = hydrate(navLinks)

export default generateLinks