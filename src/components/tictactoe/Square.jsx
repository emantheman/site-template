import React from 'react'

const Square = props => (
  <button
    className={"Square " + props.className}
    onClick={ props.onClick }>
    { props.value }
  </button>
)

export default Square