import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faQuoteRight, faHome } from '@fortawesome/free-solid-svg-icons'

// link data
const navLinks = [{
  to: '/',
  title: 'home',
  icon: faHome,
  style: { fontSize: '15px' }
}, {
  to: '/about',
  title: 'about',
  icon: faQuestion,
  style: { fontSize: '14px' }
}, {
  to: '/quotes',
  title: 'quotes',
  icon: faQuoteRight,
  style: { fontSize: '14px' }
}]

/**
 * Takes an array and returns a function that takes a string--the current path--and converts the link-data into jsx. The path is used to add a class "current" to the link to the path currently being served.
 * 
 * @param {Array} linkData - array of objects containing link data
 * @param {String} path - the current path
 */
const hydrate = linkData => path => linkData.map((data, i) => (
  <li key={i}>
    <Link
      className={(path === data.to ? 'current' : '')}
      style={data.style}
      title={data.title}
      to={data.to}>
      <FontAwesomeIcon icon={data.icon}/>
    </Link>
  </li>
))

// prime with link-data, await path
const generateLinks = hydrate(navLinks)

export default generateLinks