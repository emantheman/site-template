import React, { Component } from 'react'
import Board from '../components/tictactoe/Board'
import Description from '../components/Description'
import '../styles/TicTacToe.scss'

export default class TicTacToe extends Component {
  constructor(props) {
    super(props)

    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      cpu: {
        isOpponent: false,
        level: '1'
      }
    }
  }

  /**
   * Calculates winner of game.
   * 
   * @param {Array} squares - tictactoe board
   */
  calculateWinner = squares => {
    // winning combinations
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    const win = {
      token: null,
      combo: [null]
    }
    // iterate through winning combos
    for (let i = 0; i < lines.length; i++) {
      // store indices
      const [a, b, c] = lines[i]
      // if the square at each index is equal and NOT empty
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        // adds values to winObj
        win.token = squares[a]
        win.combo = [a, b, c]
        // return the winObj
        return win
      }
    }
    // otherwise there is no winner
    return win
  }

  /**
   * If square at index is empty, adds current token.
   * 
   * @param {Number} i - index of square
   */
  handleClick = i => {
    // copy most recent game
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = [...current.squares]

    // exit if game is over OR square is filled
    if (this.calculateWinner(squares).token || squares[i]) return

    // add token to square
    squares[i] = this.state.xIsNext ? 'X' : 'O'

    // setState
    this.setState(prevState => {
      return {
        history: history.concat([{
          squares
        }]),
        stepNumber: prevState.stepNumber + 1,
        xIsNext: !prevState.xIsNext
      }
    }, () => {
      setTimeout(() => {
        this.makeComputerMove()
      }, 1200)
    })
  }

  /**
   * Makes computer's move.
   */
  makeComputerMove = () => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    // copy current tictactoe board
    const squares = [...current.squares]
    // get available moves
    const availableSquares = this.getAvailableMoves(squares)

    // EXIT procedure if:
    if (!this.state.cpu.isOpponent || // computer is not on
      this.calculateWinner(squares).token || // or game is won
      availableSquares.length === 0 || // or game is tie
      this.state.xIsNext) return // or HU has next move

    // get index of rand available move
    const rand = availableSquares[this.getRandIndex(availableSquares.length)]

    switch (this.state.cpu.level) {
      case '2': // challenging
        const win = this.winPossible([...squares])
        if (win > -1) {
          squares[win] = 'O'
        } else {
          squares[rand] = 'O'
        }
        break
      case '3': // impossible
        // get best move
        const { index } = this.minimax([...squares], 'O')
        squares[index] = 'O'
        break
      default: // facile
        // computer makes random move
        squares[rand] = 'O'
        break
    }

    this.setState(prevState => {
      return {
        history: history.concat([{
          squares
        }]),
        stepNumber: prevState.stepNumber + 1,
        xIsNext: !prevState.xIsNext
      }
    })
  }

  /**
   * If win is possible returns index of win, otherwise returns null.
   * 
   * @param {Array} arr - copy of tictactoe board
   */
  winPossible = arr => {
    const availableSquares = this.getAvailableMoves(arr)
    for (let i = 0; i < availableSquares.length; i++) {
      const freeIndex = availableSquares[i]
      arr[freeIndex] = 'O'
      if (this.calculateWinner(arr)) return freeIndex
      arr[freeIndex] = freeIndex
    }
    return -1
  }

  /**
   * Gets a random index to an array.
   * 
   * @param {Number} len - length of the array
   */
  getRandIndex = len => Math.floor(Math.random() * len)

  /**
   * Jumps to point in game's history.
   * 
   * @param {Number} step - index of board state
   */
  jumpTo = step => {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    })
    // if step is odd, attempt computer move
    step % 2 && setTimeout(this.makeComputerMove, 1500)
  }

  /**
   * Returns array of empty spaces on a board.
   * 
   * @param {Array} board - tictactoe board
   */
  getAvailableMoves = board => board.map((sq, i) => sq === null ? i : sq).filter(sq => Number.isInteger(sq))

  /**
   * Applies minimax algorithm to tictactoe. Calculates best possible move for CPU.
   * 
   * @param {Array} board - representation of tictactoe board
   * @param {String} player - token of current player ('X'/'O')
   */
  minimax = (board, player, depth = 0) => {
    // declare moves array to collect the move objects the function will create later
    const moves = []
    // get available spaces on the board
    const availableMoves = this.getAvailableMoves(board)
    // check for the terminal states such as win, lose, and tie and return a value accordingly
    const { token } = this.calculateWinner(board)

    // BASE CASE
    if (token === 'O') { // if computer win
      // add to branch
      return { score: 100 - depth }
    } else if (token === 'X') { // if human win
      // subtract from branch
      return { score: depth - 100 }
    } else if (!availableMoves.length) { // tie
      // branch is unchanged
      return { score: 0 }
    }

    const nextPlayer = player === 'X' ? 'O' : 'X'

    // loop through available spots to create an array of possible move objects with associated score and index values
    for (let i = 0; i < availableMoves.length; i++) {
      // initialize a new move object
      const move = {}
      // sets the move index to an available spot on the board
      move.index = availableMoves[i]
      // add token to available square
      board[move.index] = player
      // tests outcome of move, pass in next token
      const result = this.minimax(board, nextPlayer, depth + 1)
      // give the move the appropriate score
      move.score = result.score
      // reset the spot to empty
      board[move.index] = move.index
      // moves array will store all moves at this depth and their associated scores
      moves.push(move)
    }

    /*
    Each move obj contains an index referring to a space on the board
    and a score that refers to the likelihood of success after the move:
    - a 10 results from an CPU win
    - a 0 from a tie
    - a 10 from a HU win
    Computer recurses through all possible moves, and kicks them upstream for evaluation,
    picking the highest score for its own turns (meaning the best possible outcome),
    and lowest score for human turns (meaning the worst possible outcome).
    */
    let bestMove, bestScore
    if (player === 'O') { // if CPU turn
      bestScore = -Infinity // start low
      for (let i = 0; i < moves.length; i++) {
        // if score at index is greater than best score
        if (moves[i].score > bestScore) {
          // score at index becomes best score
          bestScore = moves[i].score
          bestMove = i
        }
      }
    } else { // if HU turn
      bestScore = Infinity // start high
      for (let i = 0; i < moves.length; i++) {
        // if score at index is less than best score
        if (moves[i].score < bestScore) {
          // score at index becomes best score
          bestScore = moves[i].score
          bestMove = i
        }
      }
    }

    // now return the chosen move (object) from the moves array
    return moves[bestMove]
  }

  /**
   * Sets difficulty level of cpu.
   * 
   * @param {Event} e - event object
   */
  handleLvlChange = e => {
    const cpu = { ...this.state.cpu }
    cpu.level = e.target.value
    const stepNumber = 0
    const xIsNext = true
    this.setState({ cpu, stepNumber, xIsNext })
  }

  /**
   * Toggles opponent (HU/CPU). Resets game.
   */
  handleVsChange = () => this.setState(prevState => {
    const isOpponent = !prevState.cpu.isOpponent
    const level = '1'
    const cpu = { isOpponent, level }
    const stepNumber = 0
    const xIsNext = true
    return { cpu, stepNumber, xIsNext }
  })

  render() {
    const {
      history,
      stepNumber,
      cpu,
      xIsNext
    } = this.state
    const current = history[stepNumber]
    const squares = [...current.squares]
    const isTie = squares.every(el => typeof el === 'string')
    const win = this.calculateWinner(squares)
    let status
    // if there is a winner, declare winner
    if (win.token) {
      status = `Winner: ${win.token}`
    } else if (isTie) {
      // it is a tie if every square is NOT null (and there is no winner)
      status = "It's a tie!"
    } else if (cpu.isOpponent && !xIsNext) {
      status = "...running diagnostics..."
    } else {
      // otherwise show next player
      status = `Next player is: ${xIsNext ? 'X' : 'O'}`
    }

    // get past moves
    const Moves = history.map((_, move) => {
      const desc = move ?
        `Go to move #${move}` :
        'Go to game start'
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className={move === stepNumber ? 'selected' : ''}>
            {desc}
          </button>
        </li>
      )
    })

    return (
      <div className="TicTacToe fade-in">
        {/* Title */}
        <h1 className="title">Tic Tac Toe</h1>
        {/* Game */}
        <div className="board-container">
          <Board
            onClick={i => this.handleClick(i)}
            changeLevel={e => this.handleLvlChange(e)}
            changeOpponent={this.handleVsChange}
            isTie={isTie}
            cpu={cpu}
            xIsNext={xIsNext}
            winSquares={win.combo}
            squares={squares}
            status={status}
            moves={Moves}/>
        </div>
        {/* Description of game */}
        <Description>
          <p>
            Tic-tac-toe (abbrev. TTT) is a simple game that everyone knows how to play, but when you're learning to code, building it is a different matter. It's not that it's difficult, per se. Just that, at first, you're amazed at how challenging it is to represent programmatically something that might appear obvious intuitively. A child could play tic-tac-toe, right? So what exactly are you getting hung up on? All sorts of questions ricochet in your head. Do you represent a board as a 1- or 2D array? How exactly do you render it in html/css? How do players alternate turns? Is there a simple algorithm to deal with win/lose/tie scenarios? It all feels pretty daunting at first, but as you code you get more comfortable testing out ideas and more discerning at knowing what to pursue and what to abandon.
          </p>
          <p>
            When I first completed TTT, I was earnestly proud of myself, that is, until another student in my coding bootcamp showed me his version, which was not only aesthetically pleasing (with perfect colors and a special font and everything all aligned and such) but allowed you to play with someone on another server via websocket and, more miraculously, <i>to play against the computer</i>. "Isn't this your first coding class?" I asked him; it was. He told me that he had seen the assignment two weeks before the course started and had been working on it since then, but this fact didn't much mitigate my envy. He was not only talented, however, but very kind, and together we stepped through the algorithm (and have since become good friends). It is known as the <i>minimax</i> algorithm, and really isn't too confusing—once you stare at it for an hour or so.
          </p>
          <h2>Minimax</h2>
          <p>
            Minimax (abbrev. MM) is a recursive backtracking algorithm that tests out game moves and tries to maximize the score of  one player, whom the algorithm is in favor of, while minimizing the score of the opponent. To begin, a minimizing ("MINR") and a maximizing ("MAXR") player are chosen. The algorithm recurses through the set of possible moves until it reaches a terminal state. If a terminal state is reached and it is MAXR's ply<sup>1</sup>, a positive score is returned; if it is MINR's, negative. Otherwise, MM is called on each available move branching from the potential game state, producing an array of move-indices mapped to -scores. If it is MAXR's move, then the move with the highest score is chosen from the array; otherwise, the lowest. Eventually, the index of the move that has the highest score is returned from the algorithm. This might be written as:
          </p>
          <pre>
            (* pseudocode *)
            <br/>
            <b>function</b> minimax(node, maximizing, depth):
              <br />&nbsp;&nbsp;
              <b>if</b> depth == 0 <b>or</b> is_terminal?(node):
                <br/>&nbsp;&nbsp;&nbsp;&nbsp;
            		<b>return</b> heuristic_value of node
                <br/>&nbsp;&nbsp;
            <b>if</b> maximizing:
                <br/>&nbsp;&nbsp;&nbsp;
            		value = −∞
                <br/>&nbsp;&nbsp;&nbsp;&nbsp;
           			<b>for each</b> child of node <b>do</b>:
                <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  value = max(value, minimax(child, <b>not</b> maximizing, depth - 1))
                <br/>&nbsp;&nbsp;&nbsp;&nbsp;
            		<b>return</b> value
                <br/>&nbsp;&nbsp;
            	<b>else</b>:
                <br/>&nbsp;&nbsp;&nbsp;
            		value = +∞
                <br/>&nbsp;&nbsp;&nbsp;&nbsp;
            		<b>for each</b> child of node <b>do</b>:
                  <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            			value = min(value, minimax(child, <b>not</b> maximizing, depth - 1))
                  <br/>&nbsp;&nbsp;&nbsp;&nbsp;
            		<b>return</b> value
          </pre>
          <p>
            Because TTT is a game with relatively few unique terminal states (255,168), it is fairly trivial to test each one. As the game progresses, and there are less moves to test, the algorithm takes less time. In my implementation, the AI's move is determined within fractions of a second, however I've added a small delay before the O token is placed to give the impression that the computer is "thinking"—that there is real intellectual work being done behind the scenes.
          </p>
          <div className="divider"/>
          <ol className="footnote">
            <li>
              denoting, game-theoretically, "one player's move"; used to distinguish from near-synonyms <i>turn</i> and <i>move</i>, because in some games (chess, for example) one turn/move is over only when each player has placed a token.
            </li>
          </ol>
        </Description>
      </div>
    )
  }
}