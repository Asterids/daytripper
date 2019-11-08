import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      markers: []
    };

    this.updateMap = this.updateMap.bind(this);
  }

  updateMap(longitude, latitude) {
    this.setState({
      markers: [[longitude, latitude]]
    })
  }

  componentDidMount() {
    MapboxGl.accessToken = "pk.eyJ1IjoicnV0aHRvd24iLCJhIjoiY2sybDBzd2VvMDI2cjNvcG43YzdxZHptcyJ9.39XFWCL8XvT7UqVK7M8BLg";

    const click = document.getElementById('click');
    const mousemove = document.getElementById('mousemove');

    let mapInstance = new MapboxGl.Map({
      container: "map",
      center: [4.626541, 28.582692],
      zoom: 1.5, // starting zoom
      style: "mapbox://styles/ruthtown/cjy1zfey01ai51cp31xzhmwnw"
    });

    mapInstance.on('click', function(e) {
      console.log(e.lngLat.lat + ", " + e.lngLat.lng)

      new MapboxGl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(mapInstance);

      // ***   #1   ***
      // how to save markers to list held in state?
      // console.log("STATE MARKERS: " + this.state.markers)
    });
  }

  // *** need to add markers to markers list held in state before comparison to empty can be made

  // componentWillReceiveProps(props) {
  //   if (this.state.markers.length > 0) {
  //     this.setState({markers: []})
  //   }
  // }

  render() {
    return (
      <div id='map' ref={(x) => { this.container = x }}>
      </div>
    )
  }
}
