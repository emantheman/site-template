import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.scss'

/**
 * Clickable thumbnail image.
 * 
 * @param {String} to - route url
 * @param {String} src - img source (use process.env.PUBLIC_URL to access '/public' folder)
 * @param {String} alt - text for when img can't load
 * @param {String} title - text for cursor hover
 */
const Thumbnail = ({ to="", src="", alt="", title="" }) => (
  <Link className="link" to={to} title={title}>
    <div className="Thumbnail">
        <img
          className="img"
          src={src}
          alt={alt}/>
    </div>
  </Link>
)

/**
 * Displays a grid of thumbnails.
 */
const Home = () => (
  <div className="Home fade-in">
    <Thumbnail
      to="/tic-tac-toe"
      src={`${process.env.PUBLIC_URL}/images/tictactoe.png`}
      title="tic-tac-toe"/>
    <Thumbnail
      to="/cgol"
      src={`${process.env.PUBLIC_URL}/images/cgol.png`}
      title="conway's game of life"/>
    <Thumbnail
      to="/dicube"
      src="https://placeimg.com/310/310/architecture"
      title="dicube"/>
    <Thumbnail src="https://placeimg.com/310/310/people"/>
    <Thumbnail src="https://placeimg.com/310/310/nature/grayscale"/>
  </div>
)

export default Home