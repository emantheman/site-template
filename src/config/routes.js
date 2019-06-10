import CGOL from '../views/CGOL'
import Home from '../views/Home'
import TicTacToe from '../views/TicTacToe'

const routes = [{
  View: Home,
  path: '/'
}, {
  View: TicTacToe,
  path: '/tic-tac-toe'
}, {
  View: CGOL,
  path: '/cgol'
}]

export default routes