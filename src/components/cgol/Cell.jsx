import React from 'react'

const Cell = ({ xPos, yPos, paused, enlarged }) => (
  <rect
    className={'Cell ' + (paused ? 'paused ' : '')}
    x={ xPos }
    y={ yPos }
    style={{
      width: enlarged ? '14.7px' : '9.7px',
      height: enlarged ? '14.7px' : '9.7px'
    }}
  />
)

export default Cell