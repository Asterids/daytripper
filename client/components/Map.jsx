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

    let marker = new MapboxGl.Marker()
      .setLngLat([4.626541, 28.582692]) // [lng, lat] coordinates to place the marker at
      .addTo(mapInstance); // add the marker to the map

    mapInstance.on('click', function(e) {
      console.log("Marker position: ", marker)
      console.log(e);
      console.log(e.lngLat.lat, " ", e.lngLat.lng)
        // window[e.type].innerHTML = e.containerPoint.toString() + ', ' + e.latlng.toString();
        // console.log("Mouse Position: ", e.containerPoint.toString() + ', ' + e.latlng.toString());
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
