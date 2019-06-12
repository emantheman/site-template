import React from 'react'
import '../styles/Description.scss'

/**
 * A description for a project.
 * 
 * @param {jsx} children - jsx elements
 */
const Description = ({ children }) => (
  <article className="Description">
    {children}
  </article>
)

export default Description