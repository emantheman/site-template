import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faQuestion, faQuoteRight, faHome } from '@fortawesome/free-solid-svg-icons'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'

// link data
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

/**
 * Takes an array and returns a function that takes a string--the current path--and converts the link-data into jsx. The path is used to add a class "current" to the link to the path currently being served.
 * 
 * @param {Array} linkData - array of objects containing link data
 * @param {String} path - the current path
 */
const hydrate = linkData => path => linkData.map((data, i) => {
  let link
  if (data.external) { // if the link is external, return an anchor tag
    link = (
      <a
        href={data.href}
        title={data.title}
        target="_blank"
        rel="noopener noreferrer">
        <FontAwesomeIcon icon={data.icon}/>
      </a>
    )
  } else { // otherwise, a link to a route
    link = (
      <Link
        className={(path === data.to ? 'current' : '')}
        style={data.style}
        title={data.title}
        to={data.to}>
        <FontAwesomeIcon icon={data.icon}/>
      </Link>
    )
  }
  return <li key={i}>{link}</li>
})

// prime with link-data, await path
const generateLinks = hydrate(navLinks)

export default generateLinks