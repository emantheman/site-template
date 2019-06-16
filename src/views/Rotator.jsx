import React, { Component } from 'react'
import TextRotator from '../components/TextRotator'
import '../styles/Rotator.scss'

const ADJECTIVES = [
  'web dev',
  'meditator',
  'creative',
  'gamer',
  'chess-player',
  'mentor',
  'hiker',
  'book-reader',
  'logophile',
  'visionary'
]

export default class Rotator extends Component {
  state = {
    blend: false
  }

  /**
   * Handles checkbox change.
   */
  handleChange = () => {
    this.setState(prev => {
      return { blend: !prev.blend }
    })
  }

  render() {
    const { blend } = this.state
    const bgColor = blend ? 'white' : '#ff7f50d5'
    const fontColor = blend ? 'black' : 'white'
    return (
      <div className="Rotator fade-in">
        <div className="container">
          <span className="proclamation">Emmanuel&nbsp; Price:&nbsp; </span>
          <TextRotator
            words={ ADJECTIVES }
            spinRate={ 4.2 }
            reverseRotation={ true }
            positionRight={ '-90px' }
            width="300px"
            backgroundColor={ bgColor }
            fontColor={ fontColor }/>
          <label className="options">
            <input
              type="checkbox"
              name="blend"
              onChange={this.handleChange}/>blend
          </label>
        </div>
        <span className="description">
          This shiny doohickey, sensibly named the <strong>TextRotator</strong>, will jazz up any static webpage it adorns. All you need to do is pass in a list of words and watch that baby spin!
        </span>
      </div>
    )
  }
}
