import React from 'react'
import Life from '../components/cgol/Life'
import Description from '../components/Description'
import '../styles/Life.scss'

const CGOL = () => (
  <div className="CGOL fade-in">
    {/* Title */}
    <h1>Emmanuel's Game of Life</h1>
    {/* Game of Life */}
    <Life />
    {/* Description of game */}
    <Description>
      <strong className="small">Special feature's of Emmanuel's version:</strong>
      <ul className="small">
        <li>the grid is toroidal, meaning its edges wrap around</li>
        <li>preset seeds can be chosen in the dropdown</li>
        <li>game-speed can be altered via the slider</li>
        <li>cell-density can be alterer via the magnifying-glass</li>
        <li>cells can be created or destroyed by clicking and dragging</li>
      </ul>
      <p></p>
    </Description>
  </div>
)

export default CGOL

/* <ul className="special-features">
          Special features of Emmanuel's Game of Life: 
      <li>the grid is toroidal, meaning its edges wrap around</li> 
      <li>preset seeds can be chosen in the dropdown</li> 
      <li>game-speed can be altered via the slider</li> 
      <li>users can 'play god', stopping the game of life to resurrect or destroy cells at will (or rather by clicking & dragging)</li>
    </ul>
    <div className="description">
      <div>
      <h3>Life's History</h3>
        <p>
          <strong>Life</strong>, a <span className="zero">0</span>-player game devised by mathematician John Horton Conway, is an example of "design and organization emerging in the absence of a designer." After providing an initial configuration, known as the <i>seed</i> of the game, nothing else need be done. Simply watch as the game's rules generate mesmerizing and often surprising patterns and behaviors.
        </p>
        <hr width="96%"/>
        <h3>The Rules</h3>
        <span className="note">
          A neighbor is defined as any horizontally, vertically, or diagonally adjacent square, giving each cell a total of 8 neighbors.
        </span>
        <ol>
          <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
          <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
          <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
          <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
        </ol>
        <hr width="96%"/>
        <h3>How It Works</h3>
        <p>
          The initial pattern constitutes the seed of the system. The first generation is created by applying
          the above rules simultaneously to every cell in the seed; births and deaths occur simultaneously, and
          the discrete moment at which this happens is sometimes called a tick. Each generation is a pure function
          of the preceding one. The rules continue to be applied repeatedly to create further generations.
        </p>
      </div>
    </div> */