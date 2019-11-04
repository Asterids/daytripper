import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

class Map extends Component {

  componentDidMount() {
    MapboxGl.accessToken = "pk.eyJ1IjoicnV0aHRvd24iLCJhIjoiY2sybDBzd2VvMDI2cjNvcG43YzdxZHptcyJ9.39XFWCL8XvT7UqVK7M8BLg";

    new MapboxGl.Map({
      container: "map",
      center: [4.626541, 28.582692],
      zoom: 1, // starting zoom
      style: "mapbox://styles/ruthtown/cjy1zfey01ai51cp31xzhmwnw"
    });
  }

  render() {
    return (
      <div id='map' ref={(x) => { this.container = x }}>
      </div>
    )
  }
}

export default Map;
