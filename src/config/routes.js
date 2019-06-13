import CGOL from '../views/CGOL'
import Home from '../views/Home'
import Rotator from '../views/Rotator'
import SpinningCube from '../views/SpinningCube'
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
}, {
  View: SpinningCube,
  path: '/dicube'
}, {
  View: Rotator,
  path: '/t-rot'
}]

export default routes