import React from 'react'
import Life from '../components/cgol/Life'
import Description from '../components/Description'
import '../styles/Life.scss'

const CGOL = () => (
  <div className="CGOL fade-in">
    {/* Title */}
    <h1>Conway's Game of Life</h1>
    {/* Game of Life */}
    <Life/>
    {/* Description of game */}
    <Description>
      <strong className="small-list-pre">Special features of Emmanuel's version:</strong>
      <ul className="small-list">
        <li>the grid is toroidal, meaning its edges wrap around, like a donut</li>
        <li>preset seeds can be chosen in the dropdown</li>
        <li>tick-rate can be altered via the slider</li>
        <li>grid-density can be alterer via the magnifying-glass</li>
        <li>cells can be created or destroyed by clicking and dragging</li>
      </ul>
      <p>
        I first encountered Conway's Game of Life in a coding course, where we were shown the rules and asked to consider how we might implement them programmatically. Within an hour or two a friend and I had a bug-riddled (but functioning!) implementation. For a week or so after, I became completely obsessed with Life—studying its history; refining my code; adding features; cultivating seeds for their beauty, complexity, and longevity—at the end of which my computer got laterally bisected in a bicycle accident and all my work was lost. But Life goes on, right? And now that I'm diving into React I thought recreating CGOL would be a fun and nostalgiac way to get my bearings with lifecycle and state management.
      </p>
      <p>
        <strong>A little background into Conway's Game:</strong> In the late 40s, polymathic genius John von Neumann defined life as being (a) Turing-complete and (b) self-replicable. Around the same time his colleague at Los Alamos, Stanislaw Ulam, began to play with patterns that evolved over time based on local constraints, what he conceived of as "recursively defined geometries." Later, Ulam unified these patterns into a single model, the <i>cellular automaton</i> (pl. cellular automata, abbrev. CA), a theoretically infinite grid of cells, each existing in a finite number of states (e.g., <i>on</i> and <i>off</i>), such that a cell's state is determined by a pre-defined relationship to the states of nearby cells. Nearby cells within the purview of a cell, C, are said to comprise C's <i>neighborhood</i>. Typically, the rule for each cell is the same and doesn't change over time. Births and deaths occur simultaneously and the exact moment when the rule is applied to every cell in the grid is called a <i>tick</i>. Games are interacted with solely through the initial grid configuration, known as the <i>seed</i>; each generation, <i>g</i>, is calculated by applying Life's rules (see below) as a pure function, <i>L</i>, to the previous generation, s.t. <span className="math">L(g<sub>n-1</sub>) &#8594; g<sub>n</sub>, where n-1 &#8805; 1.</span>
      </p>
      <p>
        Ulam and Von Neumann's initial attempts at CA (involving electromagnetic components floating randomly in liquid) turned out to be ahead of their time technologically, and interest in CA didn't bleed out of academia for another three decades. However, in the early 70s, motivated by questions in mathematical logic and interest in simulation games, Cambridge mathematician John Horton Conway began experimenting with rules for a 2D CA, aiming to satisfy a few general criteria. For his simulation he asserted that 
        there should be no explosive growth;
        there should exist small initial patterns with chaotic, unpredictable outcomes;
        there should be potential for Von Neumann universal constructors;
        and the rules should be as simple as possible, whilst adhering to the above constraints. The rules that he eventually landed on, known technically as B3/S23 (and popularly as Conway's Game of Life), are these few:
      </p>
      <ol>
        <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
        <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
        <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
        <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
      </ol>
      <p>While Conway didn't initially set out to prove that his game was "alive" in the Von Neumann sense, it was eventually shown by a group of CA experts that Conway's Game indeed satisfies Von Neumann's two general conditions.</p>
      <p>Conway's Game of Life has gained an unusual degree of popularity for a CA, owing probably to the suprising and often beautiful patterns that it spawns. It has been used across many fields (from physics to philosophy and economics) to illustrate how simple deterministic physical laws can beget complex and intelligent behaviors. It is no accident that Life borrows its name from the real organic process: its cells flourish and die, fall into cyclic patterns, organize into groups and structures that can themselves become units of greater levels of abstraction—all by following simple physical laws. This property has led numerous scholars to question whether the universe itself might be an extremely sophisticated CA.</p>
    </Description>
  </div>
)

export default CGOL