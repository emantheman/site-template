import React, { Component } from 'react'
import { ChromePicker } from 'react-color'
import ColorPicker from '../components/ColorPicker'
import DiCube from '../components/DiCube'
import Description from '../components/Description'

export default class SpinningCube extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      innerColor: "rgba(17,122,181,1)",
      outerColor: "rgba(33,139,131,0.34)"
    }
  }

  render() {
    const { innerColor, outerColor } = this.state

    return (
      <div className="SpinningCube">
        <div style={{width: '423px', margin: '0 auto'}}>
          <DiCube
            innerColor={innerColor}
            outerColor={outerColor}
            alternate/>
          <div className="outer" style={{ display: 'inline-block' }}>
            <ColorPicker
              setColor={color => this.setState({ outerColor: color })}
              default={{r: 33, g: 139, b: 131, a: 0.34}}/>
          </div>
          <div className="inner" style={{ display: 'inline-block' }}>
            <ColorPicker
              setColor={color => this.setState({ innerColor: color })}
              default={{r: 17, g: 122, b: 188, a: 1}}/>
          </div>
        </div>
        <Description>
          <p className="center">
            The <strong>DiCube</strong> component, a proposed verb in an imagined neocorporate visual language, serves no purpose except to quench briefly your thirst for nifty little sleek designs.
          </p>
        </Description>
      </div>
    )
  }
}