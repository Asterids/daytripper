import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js';
// import SVG from 'react-inlinesvg';

// const Icon = () => <SVG src='../../public/images/marker-15.svg' />;


export default class Map extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { addMarker, markers } = this.props;

    MapboxGl.accessToken = "pk.eyJ1IjoicnV0aHRvd24iLCJhIjoiY2sybDBzd2VvMDI2cjNvcG43YzdxZHptcyJ9.39XFWCL8XvT7UqVK7M8BLg";

    // const click = document.getElementById('click');
    // const mousemove = document.getElementById('mousemove');

    let mapInstance = new MapboxGl.Map({
      container: "map",
      center: [4.626541, 28.582692],
      zoom: 1.5, // starting zoom
      style: "mapbox://styles/ruthtown/cjy1zfey01ai51cp31xzhmwnw"
    });

    mapInstance.on('click', function(e) {
      console.log(e.lngLat.lat + ", " + e.lngLat.lng)

      addMarker({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [e.lngLat.lng, e.lngLat.lat]
        },
        properties: {
          title: 'Marker',
          description: '' + (markers.length + 1),
          // 'marker-symbol': '' + (markers.length + 1),
        }
      })

      // markers.forEach(marker => {
      //   // create a HTML element for each feature
        // let icon = document.createElement('SVG');
        // icon.src = '../../public/images/marker-15.svg';
        // icon.className = 'marker';
      //
      //   console.log("MARKER INSTANCE: " + marker)
      //   // make a marker for each feature and add to the map
      //   new MapboxGl.Marker()
      //     .setLngLat(marker.geometry.coordinates)
      //     .addTo(mapInstance);
      // });


      let newMarker = new MapboxGl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(mapInstance)
    });
  }

  // function ActionLink() {
  //   function handleClick(e) {
  //     e.preventDefault();
  //     console.log('The link was clicked.');
  // }

  // componentWillReceiveProps(props) {
  //   if (props.markers.length > 0) {
  //     props.clearMap()
  //   }
  // }

  render() {
    return (
      <div id='map' ref={(x) => { this.container = x }}>
      </div>
    )
  }
}
