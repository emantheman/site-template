import React from 'react'
import '../styles/Description.scss'

/**
 * A description for a project.
 * 
 * @param {Object} props - properties being passed from upstream
 */
const Description = props => {
  return (
    <article className="Description">
      {props.children}
    </article>
  )
}

export default Description