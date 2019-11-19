import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js';
// import SVG from 'react-inlinesvg';

// const Icon = () => <SVG src='../../public/images/marker-15.svg' />;


export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: {},
      markers: this.props.markers
    }
  }

  componentDidMount() {
    const { addMarker } = this.props;
    // console.log("PROPS ON LOAD: " + this.props);

    MapboxGl.accessToken = "pk.eyJ1IjoicnV0aHRvd24iLCJhIjoiY2sybDBzd2VvMDI2cjNvcG43YzdxZHptcyJ9.39XFWCL8XvT7UqVK7M8BLg";

    let mapInstance = new MapboxGl.Map({
      container: "map",
      center: [4.626541, 28.582692],
      zoom: 1.5, // starting zoom
      style: "mapbox://styles/ruthtown/cjy1zfey01ai51cp31xzhmwnw"
    });

    // *** IMPLEMENT & TEST WHEN MARKERS ARE PERSISTENT/SAVEABLE TO DB

    // mapInstance.on('load', function (markers) {
    //   markers.forEach(marker => {
    //     let existingMarker = new MapboxGl.Marker()
    //       .setLngLat(marker._lngLat.lng, marker._lngLat.lat)
    //       .addTo(mapInstance)
    //   })
    // }

    mapInstance.on('click', function(e) {
      console.log(e.lngLat.lat + ", " + e.lngLat.lng)

      let newMarker = new MapboxGl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(mapInstance)

      addMarker(newMarker);
    });

    // mapInstance.on('mouseout', function(e2) {
    //   console.log(e2.target)
      // this.state.markers.forEach(marker => marker.remove())
    // });

    this.setState({map: mapInstance});
  }

  componentWillReceiveProps(props) {
    // console.log("GET YER STATE HERE: ")
    // console.log(this.state)
    // console.log("GETCHA PROPS HERE: ")
    // console.log(props);
    // console.log(props.markers.length) // are there no markers in parent state
    // console.log(this.state.markers.length) // do any markers exist in local state

    if (props.markers.length > this.state.markers.length) {
      this.setState({markers: [...props.markers]})
    } else if ((props.markers.length === 0) && !(this.state.markers.length === 0)) {
      this.state.markers.forEach(marker => {
        marker.remove();
      })
      this.setState({markers: []})
    }
  }

  render() {
    return (
      <div id='map' ref={(el) => { this.container = el }}>
      </div>
    )
  }
}



// ***** NOTES *****

// *** GEOJSON: ***
// addMarker({
//   type: 'Feature',
//   geometry: {
//     type: 'Point',
//     coordinates: [e.lngLat.lng, e.lngLat.lat]
//   },
//   properties: {
//     title: 'Marker',
//     description: '' + (markers.length + 1),
//     // 'marker-symbol': '' + (markers.length + 1),
//   }
// })

// *** DOM ELEMENT: ***
// let icon = document.createElement('SVG');
// icon.src = '../../public/images/marker-15.svg';
// icon.className = 'marker';
