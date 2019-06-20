import React, { Component } from 'react'
import '../styles/Bezier.scss'

export default class Bezier extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      hexColor: '000',
      lineWidth: 2,
      scale: 1, 
      startingValue: 0,
      maxValue: 1300,
      step: 100,
      startX: 800,
      startY: 500,
      ip1: 200,
      ip2: 100,
      ip3: 1000,
      ip4: 'i',
      endX: 150,
      endY: 50
    }
  }
  

  componentDidMount() {
    const ctx = this.refs.canvas.getContext("2d")
    ctx.lineWidth = 2
    ctx.strokeStyle = "#000"
    ctx.beginPath()
    for (let i = 0; i < 1300; i += 100) {
      ctx.moveTo(800, 500)
      ctx.bezierCurveTo(200, 100, 1000, i, 150, 50)
    }
    // for (let i = 0; i < 1200; i += 30) {
    //   ctx.moveTo(0, i*2)
    //   ctx.bezierCurveTo(100, 200, 900, i, 300, -i)
    // }
    // for (let i = 0; i < 900; i += 50) {
    //   ctx.moveTo(100, 200)
    //   ctx.bezierCurveTo(150, 50, 900, i, 200, 400)
    // }
    ctx.stroke()
  }

  invalid = (name, value) => {
    switch (name) {
      case 'lineWidth':
      case 'startingValue':
      case 'maxValue':
      case 'step':
      case 'scaleX':
      case 'scaleY':
        return isNaN(value) || value >= 3000
      default:
        return false
    }
  }

  draw = () => {
    let {
      hexColor,
      lineWidth,
      scale,
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
    ctx.scale(scale, scale)
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

  ignore = name => ['hexColor', 'scale'].includes(name)

  onChange = ({ target: { name, value } }) => {
    if (this.invalid(name, value)) return
    this.setState({ [name]: isNaN(value) || this.ignore(name) ? value : +value }, this.draw)
  }


  render() {
    const {
      hexColor,
      lineWidth,
      scale,
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
      <div className="Bezier">
        <canvas ref="canvas" width={1000} height={600} />
        <code>
          color = #
          <input
            type="text"
            value={hexColor}
            name="hexColor"
            title="hexColor"
            onChange={this.onChange} />
          <br/>
          lineWidth = <input type="text" value={lineWidth} name="lineWidth" title="lineWidth" onChange={this.onChange} />
          <br/>
          scale = <input type="text" value={scale} name="scale" title="scale" onChange={this.onChange} />
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
      </div>
    )
  }
}