import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

class Map extends Component {

  componentDidMount() {
    MapboxGl.accessToken = "pk.eyJ1IjoicnV0aHRvd24iLCJhIjoiY2phOXVlZzcyMGIwMjMycXBlNnRmZHo1dyJ9.ilgJUCqm6sJIh6NCPCLdow";

    new MapboxGl.Map({
      container: "map",
      center: [-74.009, 40.705],
      zoom: 12, // starting zoom
      style: "mapbox://styles/mapbox/streets-v10"
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
