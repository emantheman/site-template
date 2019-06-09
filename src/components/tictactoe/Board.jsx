import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      vsCPU: false,
      level: '1'
    }
  }

  renderSquare = i => {
    const {
      winSquares,
      cpu,
      squares,
      isTie,
      xIsNext,
      onClick
    } = this.props
    const win = winSquares.includes(i) ? 'win' : ''
    const cpuWin = cpu.isOpponent && winSquares.includes(i) && squares[i] === 'O' ? 'cpu-win' : ''
    const tie = winSquares.length < 3 && isTie ? 'tie' : ''
    const clickable = (xIsNext && !squares[i]) ||  (!cpu.isOpponent && !squares[i]) ? 'clickable' : ''
    return (
      <Square
        key={ i }
        className={ `${win} ${cpuWin} ${tie} ${clickable}` }
        value={ squares[i] }
        onClick={() => cpu.isOpponent && !xIsNext ? undefined : onClick(i)}/>
    )
  }
  
  render() {
    const { status, moves, cpu, changeOpponent, changeLevel } = this.props
    return (
      <div className="Board">
        {/* Interface */}
        <div className="interface">
          {/* Choose opponent */}
          <label className="switch">
            <input
              type="checkbox"
              checked={ cpu.isOpponent }
              onChange={() => changeOpponent()}/>
            <span className="slider round" />
            <span className="versus">vs computer</span>
          </label>
          {/* If opponent is CPU, choose difficulty */}
          <div className={"level " + (!cpu.isOpponent ? 'hidden' : '')}>
            <label>
              <input
                className={"choice " + (cpu.isOpponent ? 'clickable' : '')}
                type="radio"
                checked={ cpu.level === '1' }
                value="1"
                onChange={e => changeLevel(e)}/>Facile
            </label>
            <label>
              <input
                className={"choice " + (cpu.isOpponent ? 'clickable' : '')}
                type="radio"
                checked={ cpu.level === '2' }
                value="2"
                onChange={e => changeLevel(e)}/>Moderate
            </label>
            <label>
              <input
                className={"choice " + (cpu.isOpponent ? 'clickable' : '')}
                type="radio"
                checked={ cpu.level === '3' }
                value="3"
                onChange={e => changeLevel(e)}/>Unbeatable
            </label>
          </div>
          {/* Show current game's history */}
          <ol>History:{ moves }</ol>
        </div>
        {/* Gameboard */}
        <div className="row">
          { this.renderSquare(0) }
          { this.renderSquare(1) }
          { this.renderSquare(2) }
        </div>
        <div className="row">
          { this.renderSquare(3) }
          { this.renderSquare(4) }
          { this.renderSquare(5) }
        </div>
        <div className="row">
          { this.renderSquare(6) }
          { this.renderSquare(7) }
          { this.renderSquare(8) }
        </div>
        {/* Status of game */}
        <div className="status">{ status }</div>
      </div>
    )
  }
}