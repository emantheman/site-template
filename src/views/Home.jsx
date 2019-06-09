import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.scss'

/**
 * Clickable thumbnail image.
 * 
 * @param {String} to - route url
 * @param {String} src - img source (use process.env.PUBLIC_URL to access '/public' folder)
 * @param {String} alt - img text for when img can't load
 * @param {String} title - img text for cursor hover
 */
const Thumbnail = ({ to="", src="", alt="", title="" }) => (
  <div className="Thumbnail">
    <Link className="link" to={to}>
      <img
        className="img"
        src={src}
        title={title}
        alt={alt}/>
    </Link>
  </div>
)

/**
 * Displays a grid of thumbnails.
 */
const Home = () => (
  <div className="Home fade-in">
    <Thumbnail to="/tictactoe" src={`${process.env.PUBLIC_URL}/images/tictactoe.png`}/>
    <Thumbnail src="https://placeimg.com/310/310/animals"/>
    <Thumbnail src="https://placeimg.com/310/310/architecture"/>
    <Thumbnail src="https://placeimg.com/310/310/people"/>
    <Thumbnail src="https://placeimg.com/310/310/nature/grayscale"/>
  </div>
)

export default Home