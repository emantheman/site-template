import React, { Component } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

export default class ColorPicker extends Component {
  static defaultProps = {
    default: {
      r: '133',
      g: '133',
      b: '100',
      a: '.5',
    }
  }

  state = {
    displayColorPicker: false,
    color: {
      r: '0',
      g: '0',
      b: '0',
      a: '1',
    }
  }

  componentWillMount() {
    this.setState({ color: this.props.default })
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escape, false)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escape, false)
  }

  escape = e => {
    if (e.keyCode === 27) {
      this.handleClose()
    }
  }

  handleClick = () => this.setState(prev => {
    return { displayColorPicker: !prev.displayColorPicker }
  })

  handleClose = () => this.setState({ displayColorPicker: false })

  handleChange = color => {
    this.setState({ color: color.rgb }, () => {
      const { r, g, b, a } = this.state.color
      this.props.setColor(`rgba(${r},${g},${b},${a})`)
    })
  }

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          left: '14%',
          top: '170px'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    })

    return (
      <>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color}/>
        </div>
        {this.state.displayColorPicker ? <div style={styles.popover}>
          <div style={styles.cover} onClick={this.handleClose}/>
          <SketchPicker color={this.state.color} onChange={this.handleChange} />
        </div> : null}
      </>
    )
  }
}