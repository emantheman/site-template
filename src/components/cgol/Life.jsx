import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchMinus, faSearchPlus, faPlay, faUndo, faInfoCircle, faPencilAlt, faEraser } from '@fortawesome/free-solid-svg-icons'
import Cell from './Cell'

export default class Life extends Component {
  constructor(props) {
    super(props)

    // set svg height: 93vh;
    //         width: 73vw;
    // make col and row number dependent on svg offset width and height

    /*
    note: this is calculated from the height(600) and width(900)
    of the grid divided by the size of each cell(15)
    */
    const cols = 62, // number of rows
      rows = 38 // and columns in the grid 


    // returns a 2d array of false values
    const blankGrid = () => new Array(cols).fill(null).map(() => new Array(rows).fill(null).map(() => false))

    this.state = {
      cols,
      rows,
      height: 570,
      width: 930,
      cellSize: 15,
      paused: true,
      generation: 0,
      tick: 250, // time between each frame
      grid: blankGrid(),
      default: blankGrid(),
      mouseIsDown: false,
      penType: true,
      enlarged: true,
      config: { // preset cells
        gosperGlider: [[1, 5], [1, 6], [2, 5], [2, 6], [11, 5], [11, 6],
        [11, 7], [12, 4], [12, 8], [13, 3], [13, 9], [14, 3],
        [14, 9], [15, 6], [16, 4], [16, 8], [17, 5], [17, 6],
        [17, 7], [18, 6], [21, 3], [21, 4], [21, 5], [22, 3],
        [22, 4], [22, 5], [23, 2], [23, 6], [25, 1], [25, 2],
        [25, 6], [25, 7], [35, 3], [35, 4], [36, 3], [36, 4]],
        shruiken: [[30, 33], [30, 36], [31, 37], [31, 38], [30, 39], [29, 38],
        [29, 37], [33, 33], [34, 34], [35, 34], [36, 33], [35, 32],
        [34, 32], [30, 30], [31, 29], [31, 28], [30, 27], [29, 28],
        [29, 29], [27, 33], [26, 34], [26, 32], [25, 32], [24, 33],
        [25, 34], [37, 35], [28, 40], [23, 31], [32, 26]].map(([x, y]) => [x, y - 13]),
        dragonfly: [[25, 32], [26, 32], [27, 32], [28, 32], [29, 32], [30, 32],
        [31, 32], [32, 32], [34, 32], [35, 32], [36, 32], [37, 32],
        [38, 32], [42, 32], [43, 32], [44, 32], [51, 32], [52, 32],
        [53, 32], [54, 32], [55, 32], [56, 32], [57, 32], [59, 32],
        [60, 32], [61, 32], [62, 32], [63, 32]].map(([x, y]) => [x - 13, y - 11]),
        butterfly: [[45, 27], [44, 28], [46, 28], [43, 29], [47, 29], [46, 30], [44, 30]]
          .map(([x, y]) => [x - 15, y - 8]),
        ascension: [[45, 27], [45, 24], [44, 25], [45, 25], [46, 25], [47, 26],
        [48, 27], [48, 28], [48, 29], [47, 29], [46, 29], [44, 29],
        [43, 29], [42, 29], [42, 28], [42, 27], [43, 26]].map(([x, y]) => [x - 14, y - 6]),
        gammadion: ([[44, 29], [44, 28], [45, 28], [46, 28], [46, 29], [46, 30],
        [45, 30], [44, 30]].concat([[30, 36], [31, 37], [31, 38],
        [30, 39], [29, 38], [29, 37], [33, 33], [34, 34], [35, 34],
        [36, 33], [35, 32], [34, 32], [30, 30], [31, 29], [31, 28],
        [30, 27], [29, 28], [29, 29], [27, 33], [26, 34], [26, 32],
        [25, 32], [24, 33], [25, 34], [37, 35], [28, 40], [23, 31],
        [32, 26]].map(([x, y]) => [x + 15, y - 4]))).map(([x, y]) => [x - 14, y - 11]),
        megagammadion: ([[44, 29], [44, 28], [45, 28], [46, 28], [46, 29], [46, 30],
        [45, 30], [44, 30], [45, 31], [47, 29], [45, 27], [43, 29]]
          .concat([[30, 36], [31, 37], [31, 38], [30, 39], [29, 38],
          [29, 37], [33, 33], [34, 34], [35, 34], [36, 33], [35, 32],
          [34, 32], [30, 30], [31, 29], [31, 28], [30, 27], [29, 28],
          [29, 29], [27, 33], [26, 34], [26, 32], [25, 32], [24, 33],
          [25, 34], [37, 35], [28, 40], [23, 31], [32, 26]].map(([x, y]) => [x + 15, y - 4]))).map(([x, y]) => [x - 14, y - 11])
      }
    }
  }

  componentWillMount() {
    // event listener checks if window is resized
    window.addEventListener('resize', this.resizeGrid)
  }

  /**
   * Resizes game of life on screen-size change.
   */
  resizeGrid = () => {
    // get width of screen
    const x = window.innerWidth
    const width = x - 56 // accounts for left and right margins

    // if both cellSizes divide evenly into new width
    if (Number.isInteger(width / 15) && Number.isInteger(width / 10)) {
      // get size of cell
      const { cellSize } = this.state
      // calculates number of columns (width / cellsize)
      const cols = width / cellSize

      // reset state
      this.setState({
        width,
        cols,
        grid: this.newGrid()
        // reset grid
      }, this.resetGrid)
    }
  }

  /**
   * Flips the value of the current cell
   * 
   * @param {Number} x - the x-coordinate of the cell being set
   * @param {Number} y - the y-coordinate of the cell being set
   * @param {Boolean} drawCell - whether or not cell is being manually drawn
   */
  flipCell = (x, y, drawCell = false) => {
    this.setState(prevState => {
      return {
        grid: prevState.grid.map((col, i) => col.map((cell, j) => {
          // if at target coordinates (x, y), alter cell
          if (i === x && j === y) {
            // if cell is being drawn, return pen type
            if (drawCell) return this.state.penType
            // else reverse cell's state
            return drawCell ? this.state.penType : !cell
          }
          // otherwise return cell
          return cell
        }))
      }
    })
  }

  /**
   * Count the game's current cell population
   */
  countPopulation = () => this.state.grid.flat().filter(cell => cell === true).length

  /**
   * Prints the game's current cell population
   */
  printPopulation = () => {
    // find the population
    const population = this.countPopulation()
    if (!this.state.paused && population === 0) this.resetGrid()

    // if the population exceeds 100
    if (population > 100) {
      // returns a string in the form: '~<digit exceeding 100, floored to a multiple of 50'
      // e.g., '~70' -- where the '~' character denotes 'approximately'
      return '~' + +(Math.ceil(population / 50.0) * 50)
    } else {
      return population
    }
  }

  /**
   * Count the number of TRUE neighbors around the current cell
   * 
   * @param {Number} x - the x coordinate of the current cell
   * @param {Number} y - the y coordinate of the current cell
   * @param {Boolean} c - the value of the current cell
   */
  updateCell = (x, y, c) => {
    const { grid } = this.state
    let n = 0 // number of alive neighbors
    const width = grid.length, // width and height of the grid, respectively
      height = grid[0].length

    // loop through neighbors of current cell
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        // skip current cell
        if (i === 0 && j === 0) continue

        // store neighbor's x and y coordinates,
        // add then mod coordinate by array-length to allow for wrap around
        const nX = (x + i + width) % width, nY = (y + j + height) % height
        // check if neighbor at coordinates is filled
        if (grid[nX][nY]) n++

        // if their are more than 3 living neighbors the cell dies
        if (n > 3) return false
      }
    }

    // if there are 3 neighbors the cell lives
    if (n === 3) return true
    // if there are 2 neighbors the cell stays the same
    if (n === 2) return c
    // if there is less than 2 the cell dies
    return false
  }

  /**
   * Returns a new blank or randomized grid
   * 
   * @param {Boolean} randomize - if true the new grid is randomized
   */
  newGrid = (randomize = false) => {
    const { cols, rows } = this.state
    // returns false vals
    let cb = () => false
    // if 'randomize' is true then mix in some trues
    if (randomize) cb = () => Math.random() >= .8
    // return a new grid
    return new Array(cols).fill(null).map(() => new Array(rows).fill(null).map(() => cb()))
  }

  /**
   * Configures the grid to the value of the select element
   * 
   * @param {Event} preset - destructured event object of the form "preset = event.target.value", i.e.,
   * the currently selected option
   */
  configureGrid = ({ target: { value: preset } }) => {
    // pause game
    this.setState({ paused: true })

    // if the preset is 'random' set rand to true
    const rand = preset === 'random'
    const blank = preset === 'blank' // same for blank

    // set blank grid
    const newGrid = this.newGrid(rand)


    // if the preset is NOT 'random'
    // loop through the preconfigured coordinates
    // and set the newGrid at those coordinates to true
    if (!rand && !blank) {
      this.state.config[preset].forEach((coordPair) => {
        const [x, y] = coordPair
        newGrid[x][y] = true
      })
    }

    // swap grids
    this.setState({ grid: newGrid, default: newGrid })

    // remove focus from select dropdown
    this.configSelect.blur()
  }

  /**
   * Create the next frame of the grid by applying the rules of the GoL to each cell.
   * 
   * The rules are as follows: "A cell is resurrected if three of its neighbors are living.
   * It remains alive if two or three of its neighbors are living. Otherwise, it perishes."
   */
  updateGrid = () => this.setState(prevState => {
    // 1. computes next generation
    // 2. increments generationCount
    return {
      grid: prevState.grid.map((col, i) => col.map((cell, j) => this.updateCell(i, j, cell))),
      generation: prevState.generation + 1
    }
  })

  /**
   * Draws cells on grid and calls next frame if the game is !paused
   */
  drawGrid = () => {
    const {
      grid,
      paused,
      enlarged,
      tick,
      cellSize
    } = this.state

    // if the game isn't paused call the next frame
    setTimeout(() => {
      if (!paused) {
        this.updateGrid()
      }
    }, tick)

    // stores Cell components
    const Cells = []
    // traverse grid
    grid.forEach((col, x) => col.forEach((cell, y) => {
      // if Cell is alive
      if (cell) {
        // get it's position (coordinates multiplied by cell size)
        const xPos = x * cellSize, yPos = y * cellSize
        // and add the Cell to the array
        Cells.push(
          <Cell
            key={[x, y]}
            xPos={xPos}
            yPos={yPos}
            paused={paused}
            enlarged={enlarged}
          />
        )
      }
    }))

    return Cells
  }

  /**
   * Pauses and sets grid to current default
   */
  resetGrid = () => {
    // pause game and bring generations to zero
    this.setState({ paused: true, generation: 0 })

    // slight delay
    setTimeout(() => {
      // reset grid to default
      this.setState({ grid: this.state.default })
    }, 150)
  }

  /**
   * Returns an object containing the coordinates of an event
   * 
   * @param {Event} e - object containing event data
   */
  getCoordPair = e => {
    const svg = e.nativeEvent.target.ownerSVGElement
    let pt = svg.createSVGPoint()
    pt.x = e.nativeEvent.clientX
    pt.y = e.nativeEvent.clientY
    pt = pt.matrixTransform(svg.getScreenCTM().inverse());
    return {
      x: Math.floor(pt.x / this.state.cellSize),
      y: Math.floor(pt.y / this.state.cellSize)
    }
  }

  /**
   * Changes the value of the cell at event-coordinates
   * 
   * @param {Event} e - object containing event data
   */
  changeCell = e => {
    // pause the GoL
    this.setState({ paused: true })

    // get coordinates of event
    const { x, y } = this.getCoordPair(e)

    console.log('[' + x + ',' + y + ']')

    // reverse cell-state at coordinates
    this.flipCell(x, y)
  }

  /**
   * Attaches event listener to mouse movement
   * @param {Event} e - object containing event data destructured in the form: x/y = e.nativeEvent.offset<X/Y>
   */
  _onMouseMove = ({ nativeEvent: { offsetX: x, offsetY: y } }) => {
    // pause the GoL
    this.setState({ paused: true })

    // correct for cell-size
    x = Math.floor(x / this.state.cellSize)
    y = Math.floor(y / this.state.cellSize)

    // create "draw" effect
    if (this.state.mouseIsDown) this.flipCell(x, y, true)
  }

  /**
   * If key pressed is shift key, changes penType
   * If key pressed is spacebar, pause/play game
   * @param {Event} e - object containing event data destructured in the form: e.shiftKey and e.keyCode
   */
  handleKeyDown = ({ shiftKey, keyCode }) => {
    if (shiftKey) this.setState(prevState => ({ penType: !prevState.penType }))
    if (keyCode === 32) this.setState(prevState => ({ paused: !prevState.paused }))
  }

  /**
   * Changes cell size and density of grid
   */
  changeCellSize = () => {
    this.setState(({ enlarged }) => {
      // if the cells are currently enlarged
      let rows, cols, cellSize
      if (enlarged) {
        // shrink cells; increase grid density
        cols = 105
        rows = 66
        cellSize = 10
        // otherwise,
      } else {
        // enlarge cells; reduce grid density
        cols = 70
        rows = 44
        cellSize = 15
      }

      return {
        cols,
        rows,
        cellSize,
        enlarged: !enlarged,
        paused: true
      }
    }, () => {
      // reset grid
      this.setState({ grid: this.newGrid() })
    })
  }

  render() {
    const {
      height,
      width,
      cellSize,
      penType,
      paused,
      enlarged,
      mouseIsDown,
      generation,
      tick
    } = this.state

    return (
      <div
        className="Life"
        onKeyDown={this.handleKeyDown}
        tabIndex={0}>
        {/* Liquid crystal display for the miracle of Life */}
        <svg
          height={height}
          width={width}
          style={{ border: '1px solid black' }}>
          {/* Injects units of Life into display */}
          {this.drawGrid()}
          {/* Creates grid pattern */}
          <g>
            <defs>
              <pattern
                id="grid"
                width={cellSize}
                height={cellSize}
                patternUnits="userSpaceOnUse">
                <path d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`} fill="none" stroke="gray" strokeWidth="0.2" />
              </pattern>
            </defs>
            {/* Clickable "screen" placed in foreground to detect mouse events without cells interfering */}
            <rect
              style={{cursor: 'pointer'}}
              width="100%"
              height="100%"
              fill="url(#grid)"
              onMouseDown={e => {
                this.setState({ mouseIsDown: true })
                this.changeCell(e)
              }}
              onMouseUp={() => this.setState({ mouseIsDown: false })}
              onMouseMove={mouseIsDown ? this._onMouseMove.bind(this) : undefined}
            />
          </g>
        </svg>
        {/* Allows user to interact with the game */}
        <div
          className="Interface"
          style={{ width: width - 6 }}>
          {/* Pause/Play button */}
          <FontAwesomeIcon
            className={paused ? "" : "unpaused"}
            style={{ fontSize: '15px', marginLeft: '8px' }}
            icon={faPlay}
            id="start"
            title={paused ? "play" : "pause"}
            onClick={() => this.setState(prevState => ({ paused: !prevState.paused }))} />
          {/* Reset button */}
          <FontAwesomeIcon
            icon={faUndo}
            style={{ marginLeft: '4px', cursor: 'pointer' }}
            title="reset"
            onClick={this.resetGrid} />
          {/* Change cell size */}
          <FontAwesomeIcon
            icon={enlarged ? faSearchMinus : faSearchPlus}
            style={{ marginLeft: '9px', cursor: 'pointer' }}
            title={enlarged ? "shrink grid" : "magnify grid"}
            onClick={this.changeCellSize} />
          {/* Current Pen Type - reverses onClick */}
          <FontAwesomeIcon
            icon={penType ? faEraser : faPencilAlt}
            style={{ marginLeft: '9px', cursor: 'pointer' }}
            title={penType ? "destroy life" : "create life"}
            onClick={() => this.setState(prevState => ({ penType: !prevState.penType }))} />
          {/* Info tooltip */}
          <i id="tooltip">
            <FontAwesomeIcon
              icon={faInfoCircle}
              title="info"
              style={{ marginLeft: '2px', cursor: 'pointer' }} />
            <p id="tooltiptext">
              <span id="generation">generation: {generation}</span>
              <span id="population">population: {this.printPopulation()}</span>
            </p>
          </i>
          {/* </FontAwesomeIcon> */}
          {/* Preset options */}
          <select
            ref={select => { this.configSelect = select; }}
            id="presets"
            onChange={this.configureGrid}>
            <optgroup label="presets">
              <option value="blank">blank</option>
              <option value="random">random</option>
              <option value="gosperGlider">gosperGlider</option>
              <option value="shruiken">shruiken</option>
              <option value="gammadion">gammadion</option>
              <option value="megagammadion">megagammadion</option>
              <option value="dragonfly">dragonfly</option>
              <option value="butterfly">butterfly</option>
              <option value="ascension">ascension</option>
            </optgroup>
          </select>
          {/* Tick rate range */}
          <label>Tick delay:
            <input
              id="tick-delay"
              type="range"
              min="50"
              max="450"
              step="50"
              list="steplist"
              name="tickrate"
              defaultValue=""
              onChange={({ target: { value } }) => {
                const isPause = paused
                this.setState({ paused: true, tick: value })
                if (!isPause) setTimeout(() => {
                  this.setState({ paused: false })
                }, 400)
              }} />
            <datalist id="steplist">
              <option>50</option>
              <option>100</option>
              <option>150</option>
              <option>200</option>
              <option>250</option>
              <option>300</option>
              <option>350</option>
              <option>400</option>
              <option>450</option>
            </datalist>
            <em className="display-tickrate">{tick}ms</em>
          </label>
        </div>
      </div>
    )
  }
}