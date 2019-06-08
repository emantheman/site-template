import React from 'react'
import '../styles/Home.scss'

/**
 * Clickable thumbnail image.
 */
const Thumbnail = ({ href="", src="", alt="", title="" }) => (
  <div className="Thumbnail">
    <a className="link" href={href}>
      <img
        className="img"
        src={src}
        title={title}
        alt={alt}/>
    </a>
  </div>
)

/**
 * Displays a grid of thumbnails.
 */
const Home = () => (
  <div className="Home">
    <Thumbnail src="https://placeimg.com/310/310/tech"/>
    <Thumbnail src="https://placeimg.com/310/310/animals"/>
    <Thumbnail src="https://placeimg.com/310/310/architecture"/>
    <Thumbnail src="https://placeimg.com/310/310/people"/>
    <Thumbnail src="https://placeimg.com/310/310/nature/grayscale"/>
  </div>
)

export default Home