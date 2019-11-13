import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'


export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { addMarker } = this.props;

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

      addMarker({long: e.lngLat.lng, lat: e.lngLat.lat});
    });
  }

  componentWillReceiveProps(props) {
    if (props.markers.length > 0) {
      props.clearMap()
    }
  }

  render() {
    return (
      <div id='map' ref={(x) => { this.container = x }}>
      </div>
    )
  }
}
