import React, { Component } from 'react'

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

export default class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset class="text-center bg-light">
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
                onChange={this.handleChange} />
      </fieldset>
    );
  }
}
