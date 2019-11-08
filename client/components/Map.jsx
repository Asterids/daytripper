import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

class Map extends Component {

  componentDidMount() {
    MapboxGl.accessToken = "pk.eyJ1IjoicnV0aHRvd24iLCJhIjoiY2sybDBzd2VvMDI2cjNvcG43YzdxZHptcyJ9.39XFWCL8XvT7UqVK7M8BLg";

    let click = document.getElementById('click');
    let mousemove = document.getElementById('mousemove');

    // const map = L.mapbox.map('map')
    //     .setView([0, 0], 3)
    //     .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
    //
    // map.on('mousemove click', function(e) {
    //     window[e.type].innerHTML = e.containerPoint.toString() + ', ' + e.latlng.toString();
    //     console.log("Mouse Position: ", e.containerPoint.toString() + ', ' + e.latlng.toString())
    // });

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
