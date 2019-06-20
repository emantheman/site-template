import React, { Component } from 'react'
import '../styles/Bezier.scss'

export default class Bezier extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      hexColor: '000',
      lineWidth: 2,
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
        return isNaN(value)
      default:
        return false
    }
  }

  draw = () => {
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
    const { canvas } = this.refs
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = `#${hexColor}`
    ctx.beginPath()
    for (let i = startingValue; i < maxValue; i += step) {
      ctx.moveTo(startX, startY)
      ctx.bezierCurveTo(ip1, ip2, ip3, ip4, endX, endY)
    }
    ctx.stroke()
  }

  onChange = ({ target: { name, value } }) => {
    if (this.invalid(name, value)) return
    this.setState({ [name]: value }, this.draw)
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
      <div className="Bezier">
        <canvas ref="canvas" width={1000} height={600} />
        <code>
          color = #
          <input
            type="text"
            defaultValue={"000"}
            value={hexColor}
            name="hexColor"
            title="hexColor"
            onChange={this.onChange} />
          <br/>
          lineWidth = <input type="text" defaultValue={2} value={lineWidth} name="lineWidth" title="lineWidth" onChange={this.onChange} />
          <br/>
          for (let i = <input type="text" defaultValue={0} value={startingValue} name="startingValue" title="startingValue" onChange={this.onChange} />;
              i &lt; <input type="text" defaultValue={1300} value={maxValue} name="maxValue" title="maxValue" onChange={this.onChange} />;
              i += <input type="text" defaultValue={100} value={step} name="step" title="step" onChange={this.onChange} />)
          <br/>&nbsp;&nbsp;&nbsp;&nbsp;
            bezierCurve(
              <input
                type="text"
                defaultValue={800}
                value={startX}
                name="startX"
                title="startX" 
                onChange={this.onChange} />,&nbsp;
              <input
                type="text"
                defaultValue={500}
                value={startY}
                name="startY"
                title="startY" 
                onChange={this.onChange} />,&nbsp;
              <input
                type="text"
                defaultValue={200}
                value={ip1}
                name="ip1"
                title="inflectionPoint1" 
                onChange={this.onChange} />,&nbsp;
              <input
                type="text"
                defaultValue={100}
                value={ip2}
                name="ip2"
                title="inflectionPoint2" 
                onChange={this.onChange} />,&nbsp;
              <input
                type="text"
                defaultValue={1000}
                value={ip3}
                name="ip3"
                title="inflectionPoint3" 
                onChange={this.onChange} />,&nbsp;
              <input
                type="text"
                defaultValue={"i"}
                value={ip4}
                name="ip4"
                title="inflectionPoint4" 
                onChange={this.onChange} />,&nbsp;
              <input
                type="text"
                defaultValue={150}
                value={endX}
                name="endX"
                title="endX" 
                onChange={this.onChange} />,&nbsp;
              <input
                type="text"
                defaultValue={50}
                value={endY}
                name="endY"ip1
                title="endY" 
                onChange={this.onChange} />
            )
        </code>
      </div>
    )
  }
}