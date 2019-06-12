import React from 'react'
import Life from '../components/cgol/Life'
import Description from '../components/Description'
import '../styles/Life.scss'

const CGOL = () => (
  <div className="CGOL fade-in">
    {/* Title */}
    <h1>Conway's Game of Life</h1>
    {/* Game of Life */}
    <Life />
    {/* Description of game */}
    <Description>
      <strong className="small-list-pre">Special feature's of Emmanuel's version:</strong>
      <ul className="small-list">
        <li>the grid is toroidal, meaning its edges wrap around</li>
        <li>preset seeds can be chosen in the dropdown</li>
        <li>game-speed can be altered via the slider</li>
        <li>cell-density can be alterer via the magnifying-glass</li>
        <li>cells can be created or destroyed by clicking and dragging</li>
      </ul>
      <p>
        I first encountered Conway's Game of Life in a coding course, where we were shown the rules and asked to consider how we might implement them programmatically. Within an hour or two a friend and I had a bug-riddled (but functioning!) implementation. For a week or so after, I became completely obsessed with Life—adding features; refining my code; cultivating seeds for their beauty, complexity, and longevity—at the end of which my computer got exploded in a bicycle accident and all my work was lost. But Life goes on, right? And now that I'm diving into React I thought recreating CGOL would be a fun and nostalgiac way to get my bearings with lifecycle and state management.
      </p>
      <p>
        A little background into Conway's Game: In the late 40s, mathematician and genius John von Neumann defined life as being (a) Turing-complete and (b) self-replicable. Around the same time his colleague at Los Alamos, Stanislaw Ulam, began to play with patterns that evolved over time based on local constraints, which he spoke of as "recursively defined geometries." Later on, Ulam unified these patterns into a single concept, the <i>cellular automaton</i> (pl. cellular automata, abbrev. CA), a theoretically infinite grid of cells, each existing in a finite number of states (e.g., <i>on</i> and <i>off</i>), such that a cell's state is determined by a pre-defined relationship to the states of nearby cells. Those nearby cells within the purview of a cell, C, are said to comprise the <i>neighborhood</i> of C. Typically, the rule for each cell is the same and doesn't change over time. The exact moment when the rule is applied simultaneously to each cell in the grid is called a <i>tick</i>. Ulam and Von Neumann's initial attempts at CA (involving electromagnetic components floating randomly in liquid) ended up being ahead of their time technologically, and interest in CA didn't bleed out of academia for another three decades.
      </p>
      <p>
        Motivated by questions in mathematical logic and interest in simulation games, Cambridge mathematician John Horton Conway began experimenting with rules for a 2-dimensional CA, aiming to satisfy a few general criteria. For his simulation he asserted that 
        there should be no explosive growth;
        there should exist small initial patterns with chaotic, unpredictable outcomes;
        there should be potential for Von Neumann universal constructors;
        and the rules should be as simple as possible, whilst adhering to the above constraints. The rules that he eventually landed on, known in CA argot as B3/S23, are these few:
      </p>
      <ol>
        <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
        <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
        <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
        <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
      </ol>
      <p>While Conway didn't initially set out to prove that his game was "alive," it was eventually shown by a group of CA experts that Conway's Game indeed satisfies Von Neumann's two general conditions.</p>
      <p>As a CA, Conway's Game of Life has gained an unusual degree of popularity, owed probably to the suprising and often beautiful patterns that it spawns. The game—analogous to the fluctuations of real organismal populations—has been used across many fields (from physics to philosophy and economics) to illustrate how simple deterministic physical laws can beget complex and intelligent behaviors.</p>
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