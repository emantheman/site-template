import React, { Component } from 'react'
import Description from '../components/Description'
import '../styles/Bezier.scss'

export default class Bezier extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      hexColor: '000',
      lineWidth: 2,
      startingValue: 0,
      maxValue: 800,
      step: 20,
      startX: 975,
      startY: 100,
      ip1: 0,
      ip2: 1000,
      ip3: 800,
      ip4: 'i',
      endX: 150,
      endY: 0
    }
  }
  

  componentDidMount() {
    this.draw()
  }

  invalid = (name, value) => {
    switch (name) {
      case 'lineWidth':
      case 'startingValue':
      case 'maxValue':
      case 'step':
        return isNaN(value) || value >= 3000
      default:
        return false
    }
  }


  randomize = () => {
    this.setState({
      hexColor: Math.floor(Math.random()*16777215).toString(16),
      lineWidth: Math.ceil(Math.random() * 3),
      maxValue: Math.ceil(Math.random() * 1200) + 300,
      step: Math.ceil(Math.pow(Math.random(), 1.8) * 95) + 5,
      startX: [Math.floor(Math.random() * (1000)), 'i'][Math.floor(Math.pow(Math.random(), 1.75) * 2)],
      startY: [Math.floor(Math.random() * (200)), 'i'][Math.floor(Math.pow(Math.random(), 1.75) * 2)],
      ip1: [Math.floor(Math.random() * (1000)), 'i'][Math.floor(Math.pow(Math.random(), 1.75) * 2)],
      ip2: [Math.floor(Math.random() * (1000)), 'i'][Math.floor(Math.pow(Math.random(), 1.75) * 2)],
      ip3: [Math.floor(Math.random() * (1000)), 'i'][Math.floor(Math.pow(Math.random(), 1.75) * 2)],
      ip4: [Math.floor(Math.random() * (1000)), 'i'][Math.floor(Math.pow(Math.random(), 1.75) * 2)],
      endX: [Math.floor(Math.random() * (1000)), 'i'][Math.floor(Math.pow(Math.random(), 1.75) * 2)],
      endY: [Math.floor(Math.random() * (200)), 'i'][Math.floor(Math.pow(Math.random(), 1.75) * 2)]
    }, this.draw)
  }

  draw = () => {
    let {
      hexColor,
      lineWidth,
      startingValue,
      maxValue,
      step,
      startX,
      startY,
      ip1,
      ip2,
      ip3,
      ip4,
      endX,
      endY
    } = this.state
    const { canvas } = this.refs
    // default step - prevents infinite loop
    if (step < 1) step = 1
    // get context
    const ctx = canvas.getContext("2d")
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.setTransform(1, 0, 0, 1, 0, 0) // resets transformations
    // set line width, color, and scale
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = `#${hexColor}`
    // creates the path
    ctx.beginPath()
    /* 
    index is used in the following way:
        If a variable's value is 'i' it can retrieve the current value of i from the for loop.
        Otherwise, the Map-get will return null and the numerical value of the variable will be applied.
    */
    const index = new Map()
    // creates an array of bezier curves from input values
    for (let i = startingValue; i < maxValue; i += step) {
      index.set('i', i)
      ctx.moveTo(startX, startY)
      ctx.bezierCurveTo(index.get(ip1) || ip1,
                        index.get(ip2) || ip2,
                        index.get(ip3) || ip3,
                        index.get(ip4) || ip4, 
                        index.get(endX) || endX, 
                        index.get(endY) || endY)
    }
    ctx.stroke() // adds stroke to path
  }

  onChange = ({ target: { name, value } }) => {
    if (this.invalid(name, value)) return
    this.setState({ [name]: isNaN(value) || name === 'hexColor' ? value : +value }, this.draw)
  }


  render() {
    const {
      hexColor,
      lineWidth,
      startingValue,
      maxValue,
      step,
      startX,
      startY,
      ip1,
      ip2,
      ip3,
      ip4,
      endX,
      endY
    } = this.state

    return (
      <div className="Bezier fade-in">
        <canvas ref="canvas" width={1000} height={500} />
        <code>
          lineWidth = <input type="text" value={lineWidth} name="lineWidth" title="lineWidth" onChange={this.onChange} />
          <span
            className="randomize"
            onClick={this.randomize}>
            randomize()
          </span>
          <br />
          hexColor = #
          <input
            className="color"
            type="text"
            value={hexColor}
            name="hexColor"
            title="hexColor"
            onChange={this.onChange} />
          <br/>
          for (let i = <input type="text" value={startingValue} name="startingValue" title="startingValue" onChange={this.onChange} />;
              i &lt; <input type="text" value={maxValue} name="maxValue" title="maxValue" onChange={this.onChange} />;
              i += <input type="text" value={step} name="step" title="step" onChange={this.onChange} />)
          <br/>&nbsp;&nbsp;&nbsp;&nbsp;
            bezierCurve(
              <input
                type="text"
                value={startX}
                name="startX"
                title="startX" 
                onChange={this.onChange} />,&nbsp;
              <input
                type="text"
                value={startY}
                name="startY"
                title="startY" 
                onChange={this.onChange} />,&nbsp;
              <input
                type="text"
                value={ip1}
                name="ip1"
                title="inflectionPoint1" 
                onChange={this.onChange} />,&nbsp;
              <input
                type="text"
                value={ip2}
                name="ip2"
                title="inflectionPoint2" 
                onChange={this.onChange} />,&nbsp;
              <input
                type="text"
                value={ip3}
                name="ip3"
                title="inflectionPoint3" 
                onChange={this.onChange} />,&nbsp;
              <input
                type="text"
                value={ip4}
                name="ip4"
                title="inflectionPoint4" 
                onChange={this.onChange} />,&nbsp;
              <input
                type="text"
                value={endX}
                name="endX"
                title="endX" 
                onChange={this.onChange} />,&nbsp;
              <input
                type="text"
                value={endY}
                name="endY"
                title="endY" 
                onChange={this.onChange} />
            )
        </code>
        <Description>
          <p>
            Here, a layer of abstraction overlays a complex interface, allowing users with no coding experience to get a feel for programmatic thinking through play.
          </p>
          <h2>Bézier curves</h2>
          <p>
            A Bézier curve is a parametric curve, commonly used in graphic design to render smooth curving lines as well as control the velocity of animations.
          </p>
        </Description>
      </div>
    )
  }
}