import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js';
import axios from 'axios';
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

    MapboxGl.accessToken = "pk.eyJ1IjoicnV0aHRvd24iLCJhIjoiY2sybDBzd2VvMDI2cjNvcG43YzdxZHptcyJ9.39XFWCL8XvT7UqVK7M8BLg";

    let mapInstance = new MapboxGl.Map({
      container: "map",
      center: [4.626541, 28.582692],
      zoom: 1.5, // starting zoom
      style: "mapbox://styles/ruthtown/cjy1zfey01ai51cp31xzhmwnw"
    });

    // *** Implement & test when markers are persistent/saveable to DB

    // mapInstance.on('load', function (markers) {
    //   markers.forEach(marker => {
    //     let existingMarker = new MapboxGl.Marker()
    //       .setLngLat(marker._lngLat.lng, marker._lngLat.lat)
    //       .addTo(mapInstance)
    //   })
    // }

    let counter = 0;

    mapInstance.on('click', function(e) {
      axios.get(`/api/marker/${e.lngLat.lat}/${e.lngLat.lng}/${MapboxGl.accessToken}`)
          .then(res => {
              return res.data.place_name
           })
           .then(result => {
             let newMarker = new MapboxGl.Marker()
               .setLngLat([e.lngLat.lng, e.lngLat.lat])
               .addTo(mapInstance)
             newMarker.id = counter;
             newMarker.placeName = result
             counter++;
             return newMarker
           })
           .then(mrkr => {
             addMarker(mrkr)
           })
          .catch(function(error) {
            console.error(error);
          });
    });

    this.setState({map: mapInstance});
  }

  // need to change to getDerivedStateFromProps or else prepend with UNSAFE_
  componentWillReceiveProps(props) {
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
